-- GreenTill CMS persistent storage
-- Run once against your Postgres instance (Neon, Supabase, RDS, etc.)

create table if not exists app_state (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Seed placeholders so the Netlify function can upsert safely
insert into app_state (key, data)
values
  ('gt_db_merchants', '[]'::jsonb),
  ('gt_db_products', '[]'::jsonb),
  ('gt_db_transactions', '[]'::jsonb),
  ('gt_db_customers', '[]'::jsonb),
  ('gt_db_tickets', '[]'::jsonb)
on conflict (key) do nothing;
