-- CRM Shark Digital no Supabase.
-- Rode uma vez no SQL Editor do projeto (pode rodar de novo: nada é apagado).
-- O site fala com essas tabelas só pelo servidor (chave service_role na Vercel).
-- O RLS fica ligado e sem políticas: a chave pública (anon) não lê nem grava nada.

create table if not exists public.crm_leads (
  id text primary key,
  num integer not null default 0,
  empresa text not null default '',
  contato text not null default '',
  whats text not null default '',
  e164 text not null default '',
  fone_aviso text not null default '',
  email text not null default '',
  insta text not null default '',
  cidade text not null default '',
  nicho text not null default '',
  canal text not null default '',
  origem text not null default '',
  servicos text[] not null default '{}',
  demanda text not null default '',
  stage text not null default 'novo',
  ordem double precision not null default 0,
  fee numeric not null default 0,
  setup numeric not null default 0,
  verba numeric not null default 0,
  temp text not null default 'morno',
  resp text not null default '',
  prox date,
  obs text not null default '',
  perda text not null default '',
  criado date,
  created_ms bigint not null default 0,
  updated_ms bigint not null default 0,
  stage_ms bigint not null default 0,
  won_ms bigint not null default 0,
  exemplo boolean not null default false,
  hist jsonb not null default '[]',
  perfis jsonb not null default '[]',
  site text not null default '',
  site_nota text not null default '',
  ads_meta text not null default '',
  ads_google text not null default '',
  achados jsonb not null default '[]',
  forcas jsonb not null default '[]',
  abordagem text not null default '',
  diag_ms bigint not null default 0,
  inserido_em timestamptz not null default now(),
  alterado_em timestamptz not null default now()
);
create index if not exists crm_leads_stage_idx on public.crm_leads (stage);

create table if not exists public.crm_listas (
  chave text primary key,
  itens text[] not null default '{}',
  alterado_em timestamptz not null default now()
);

create table if not exists public.crm_eventos (
  id bigint generated always as identity primary key,
  em timestamptz not null default now(),
  tipo text not null,
  lead_id text,
  usuario text,
  dados jsonb not null default '{}'
);
create index if not exists crm_eventos_lead_idx on public.crm_eventos (lead_id);
create index if not exists crm_eventos_em_idx on public.crm_eventos (em desc);

create table if not exists public.contatos_site (
  id bigint generated always as identity primary key,
  recebido_em timestamptz not null default now(),
  nome text not null,
  empresa text not null,
  canal text not null,
  email text not null default '',
  whatsapp text not null default '',
  desafio text not null default '',
  email_enviado boolean,
  lead_id text references public.crm_leads (id) on delete set null
);

-- alterado_em sempre atualizado
create or replace function public.crm_touch() returns trigger language plpgsql set search_path = '' as $$
begin new.alterado_em = now(); return new; end $$;
drop trigger if exists crm_leads_touch on public.crm_leads;
create trigger crm_leads_touch before update on public.crm_leads for each row execute function public.crm_touch();
drop trigger if exists crm_listas_touch on public.crm_listas;
create trigger crm_listas_touch before update on public.crm_listas for each row execute function public.crm_touch();

alter table public.crm_leads enable row level security;
alter table public.crm_listas enable row level security;
alter table public.crm_eventos enable row level security;
alter table public.contatos_site enable row level security;
