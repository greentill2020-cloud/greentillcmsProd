import { neon } from '@neondatabase/serverless';

const connectionString =
  process.env.DATABASE_URL ||
  process.env.NETLIFY_DATABASE_URL ||
  process.env.NETLIFY_DATABASE_URL_UNPOOLED;

if (!connectionString) {
  throw new Error('DATABASE_URL env var is required for Netlify Functions');
}

export const sql = neon(connectionString);

export const ensureStateTable = async () => {
  await sql`
    create table if not exists app_state (
      key text primary key,
      data jsonb not null,
      updated_at timestamptz not null default now()
    )
  `;
};

export const readState = async (key: string) => {
  const rows = await sql<{ data: unknown }>`
    select data from app_state where key = ${key}
  `;
  return rows[0]?.data ?? null;
};

export const upsertState = async (key: string, data: unknown) => {
  await sql`
    insert into app_state (key, data)
    values (${key}, ${sql.json(data)})
    on conflict (key) do update set
      data = excluded.data,
      updated_at = now()
  `;
};
