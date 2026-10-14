/**
 * CRM Shark Digital — ponte entre o site (/api/crm) e esta planilha.
 *
 * Como instalar (uma vez):
 * 1. Na planilha: Extensões → Apps Script. Apague o que estiver no editor e cole este arquivo.
 * 2. Selecione a função "gerarChave" e clique em Executar. Autorize com a conta dona da planilha.
 *    A chave aparece no "Registro de execução": copie e cole no Vercel em CRM_APPS_SCRIPT_SECRET.
 * 3. Implantar → Nova implantação → tipo "App da Web":
 *      Executar como: Eu · Quem pode acessar: Qualquer pessoa
 *    Copie a URL que termina em /exec e cole no Vercel em CRM_APPS_SCRIPT_URL.
 *
 * Só o servidor do site conhece a chave. Sem ela, o app recusa qualquer pedido.
 * Textos são gravados como texto puro (nunca viram fórmula).
 */

var LEADS = 'Leads';
var LISTS = 'Listas do CRM';
var DATE_HEADERS = ['Data de Cadastro', 'Próximo Retorno'];
var MONEY_HEADERS = ['Fee Mensal', 'Setup', 'Verba de Mídia'];

function gerarChave() {
  var bytes = Utilities.getUuid() + Utilities.getUuid();
  var key = Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, bytes + Date.now())).replace(/=+$/, '');
  PropertiesService.getScriptProperties().setProperty('CRM_SECRET', key);
  Logger.log('Chave do CRM (cole no Vercel em CRM_APPS_SCRIPT_SECRET): ' + key);
}

function doGet() {
  return json_({ ok: true, app: 'crm-shark-digital' });
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return json_({ ok: false, code: 'invalid', error: 'JSON inválido' });
  }
  var secret = PropertiesService.getScriptProperties().getProperty('CRM_SECRET');
  if (!secret) return json_({ ok: false, code: 'not_configured', error: 'Rode a função gerarChave no Apps Script.' });
  if (typeof body.secret !== 'string' || !safeEqual_(body.secret, secret)) return json_({ ok: false, code: 'forbidden', error: 'Chave inválida' });

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var leads = ss.getSheetByName(LEADS);
  var lists = ss.getSheetByName(LISTS);
  if (!leads || !lists) return json_({ ok: false, code: 'missing_tab', error: 'A planilha precisa das abas "' + LEADS + '" e "' + LISTS + '".' });

  if (body.op === 'read') {
    var tz = ss.getSpreadsheetTimeZone();
    return json_({ ok: true, leads: values_(leads, tz), lists: values_(lists, tz) });
  }

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    switch (body.op) {
      case 'writeCells':
        (body.cells || []).forEach(function (c) {
          grow_(leads, c.row + 1, c.col + 1);
          leads.getRange(c.row + 1, c.col + 1).setValue(cell_(c.value));
        });
        break;
      case 'appendRows':
        appendRows_(leads, body.rows || []);
        break;
      case 'deleteRows':
        (body.rows || [])
          .filter(function (r) { return r > 0; })
          .sort(function (a, b) { return b - a; })
          .forEach(function (r) { leads.deleteRow(r + 1); });
        break;
      case 'writeLists':
        (body.cols || []).forEach(function (c) {
          var vals = [[cell_(c.header)]];
          (c.items || []).forEach(function (i) { vals.push([cell_(i)]); });
          while (vals.length < c.rows + 1) vals.push(['']);
          grow_(lists, vals.length, c.col + 1);
          lists.getRange(1, c.col + 1, vals.length, 1).setValues(vals);
        });
        break;
      default:
        return json_({ ok: false, code: 'invalid', error: 'Operação desconhecida' });
    }
    SpreadsheetApp.flush();
  } catch (err) {
    return json_({ ok: false, code: 'error', error: String(err && err.message || err) });
  } finally {
    lock.releaseLock();
  }
  return json_({ ok: true });
}

/** New list columns (e.g. the price table) may fall outside the tab's grid: add rows/columns first. */
function grow_(sh, rows, cols) {
  if (cols > sh.getMaxColumns()) sh.insertColumnsAfter(sh.getMaxColumns(), cols - sh.getMaxColumns());
  if (rows > sh.getMaxRows()) sh.insertRowsAfter(sh.getMaxRows(), rows - sh.getMaxRows());
}

function appendRows_(sh, rows) {
  if (!rows.length) return;
  var width = rows.reduce(function (w, r) { return Math.max(w, r.length); }, 0);
  var start = sh.getLastRow() + 1;
  var need = start + rows.length - 1;
  if (need > sh.getMaxRows()) sh.insertRowsAfter(sh.getMaxRows(), need - sh.getMaxRows());
  var vals = rows.map(function (r) {
    var out = [];
    for (var i = 0; i < width; i++) out.push(cell_(r[i]));
    return out;
  });
  sh.getRange(start, 1, rows.length, width).setValues(vals);
  // Rows past the template's formatted area still show dates and money properly.
  var head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  head.forEach(function (h, i) {
    var fmt = DATE_HEADERS.indexOf(h) >= 0 ? 'dd/mm/yyyy' : MONEY_HEADERS.indexOf(h) >= 0 ? '"R$" #,##0' : null;
    if (fmt) sh.getRange(start, i + 1, rows.length, 1).setNumberFormat(fmt);
  });
}

/** Same shape as the Sheets API with UNFORMATTED_VALUE + SERIAL_NUMBER dates. */
function values_(sh, tz) {
  if (sh.getLastRow() === 0) return [[]];
  return sh.getDataRange().getValues().map(function (row) {
    return row.map(function (v) {
      if (Object.prototype.toString.call(v) === '[object Date]') return serial_(v, tz);
      return v;
    });
  });
}

function serial_(d, tz) {
  var p = Utilities.formatDate(d, tz, 'yyyy-MM-dd-HH-mm-ss').split('-').map(Number);
  var ms = Date.UTC(p[0], p[1] - 1, p[2], p[3], p[4], p[5]);
  return (ms - Date.UTC(1899, 11, 30)) / 864e5;
}

/** Strings get a leading apostrophe so the sheet keeps them as plain text. */
function cell_(v) {
  if (v === null || v === undefined || v === '') return '';
  if (typeof v === 'string') return "'" + v;
  return v;
}

function safeEqual_(a, b) {
  if (a.length !== b.length) return false;
  var diff = 0;
  for (var i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
