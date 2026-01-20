import { neon } from '@neondatabase/serverless';
import { INITIAL_PRODUCTS, MOCK_CUSTOMERS, MOCK_MERCHANTS, MOCK_TICKETS } from '../constants';
import type { Transaction } from '../types';

const connectionString =
  process.env.DATABASE_URL ||
  process.env.NETLIFY_DATABASE_URL ||
  process.env.NETLIFY_DATABASE_URL_UNPOOLED;

if (!connectionString) {
  console.error('DATABASE_URL (or Netlify DB env) is not set. Aborting seed.');
  process.exit(1);
}

const sql = neon(connectionString);

const KEYS = {
  MERCHANTS: 'gt_db_merchants',
  PRODUCTS: 'gt_db_products',
  TRANSACTIONS: 'gt_db_transactions',
  CUSTOMERS: 'gt_db_customers',
  TICKETS: 'gt_db_tickets',
} as const;

const seed = async () => {
  await sql`
    create table if not exists app_state (
      key text primary key,
      data jsonb not null,
      updated_at timestamptz not null default now()
    )
  `;

  const entries: { key: string; data: unknown }[] = [
    { key: KEYS.MERCHANTS, data: MOCK_MERCHANTS },
    { key: KEYS.PRODUCTS, data: INITIAL_PRODUCTS },
    { key: KEYS.TRANSACTIONS, data: [] as Transaction[] },
    { key: KEYS.CUSTOMERS, data: MOCK_CUSTOMERS },
    { key: KEYS.TICKETS, data: MOCK_TICKETS },
  ];

  for (const entry of entries) {
    const payload = JSON.stringify(entry.data);
    await sql`
      insert into app_state (key, data)
      values (${entry.key}, ${payload}::jsonb)
      on conflict (key) do update set
        data = excluded.data,
        updated_at = now()
    `;
    console.log(`Seeded ${entry.key}`);
  }

  console.log('Seeding complete.');
};

seed().catch((err) => {
  console.error('Failed to seed database', err);
  process.exit(1);
});
