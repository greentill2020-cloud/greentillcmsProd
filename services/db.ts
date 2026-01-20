
import { Merchant, Product, Transaction, Customer, Ticket } from '../types';
import { MOCK_MERCHANTS, INITIAL_PRODUCTS, MOCK_CUSTOMERS, MOCK_TICKETS } from '../constants';

const KEYS = {
  MERCHANTS: 'gt_db_merchants',
  PRODUCTS: 'gt_db_products',
  TRANSACTIONS: 'gt_db_transactions',
  CUSTOMERS: 'gt_db_customers',
  TICKETS: 'gt_db_tickets',
} as const;

const API_BASE = import.meta.env.VITE_API_BASE || '/.netlify/functions';
const REMOTE_ENABLED = import.meta.env.VITE_REMOTE_DB === 'true';

const remoteFetch = async <T>(key: string): Promise<T | null> => {
  const res = await fetch(`${API_BASE}/state?key=${key}`);
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch ${key} from remote store`);
  }
  const payload = await res.json();
  return payload.data as T;
};

const remoteSave = async (key: string, data: unknown) => {
  const res = await fetch(`${API_BASE}/state?key=${key}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    throw new Error(`Failed to persist ${key} to remote store`);
  }
};

const ensureRemote = async <T>(key: string, fallback: T) => {
  const existing = await remoteFetch<T>(key);
  if (existing === null) {
    await remoteSave(key, fallback);
  }
};

const getLocal = <T>(key: string, fallback: T): T => {
  const result = localStorage.getItem(key);
  if (!result) return fallback;
  return JSON.parse(result);
};

const saveLocal = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const StorageService = {
  init: async () => {
    if (REMOTE_ENABLED) {
      await Promise.all([
        ensureRemote(KEYS.MERCHANTS, MOCK_MERCHANTS),
        ensureRemote(KEYS.PRODUCTS, INITIAL_PRODUCTS),
        ensureRemote(KEYS.CUSTOMERS, MOCK_CUSTOMERS),
        ensureRemote(KEYS.TICKETS, MOCK_TICKETS),
        ensureRemote(KEYS.TRANSACTIONS, [] as Transaction[]),
      ]);
      return;
    }

    const merchantsArr = getLocal<Merchant[]>(KEYS.MERCHANTS, []);
    const isDesKellyPresent = merchantsArr.some(m => m.name === 'Des Kelly Interiors');
    if (!isDesKellyPresent || merchantsArr.length < MOCK_MERCHANTS.length) {
      saveLocal(KEYS.MERCHANTS, MOCK_MERCHANTS);
    }

    if (!localStorage.getItem(KEYS.PRODUCTS)) {
      saveLocal(KEYS.PRODUCTS, INITIAL_PRODUCTS);
    }
    if (!localStorage.getItem(KEYS.CUSTOMERS)) {
      saveLocal(KEYS.CUSTOMERS, MOCK_CUSTOMERS);
    }
    if (!localStorage.getItem(KEYS.TICKETS)) {
      saveLocal(KEYS.TICKETS, MOCK_TICKETS);
    }
    if (!localStorage.getItem(KEYS.TRANSACTIONS)) {
      saveLocal(KEYS.TRANSACTIONS, []);
    }
  },

  getMerchants: async (): Promise<Merchant[]> => {
    if (REMOTE_ENABLED) {
      return (await remoteFetch<Merchant[]>(KEYS.MERCHANTS)) || [];
    }
    return getLocal<Merchant[]>(KEYS.MERCHANTS, []);
  },

  saveMerchants: async (data: Merchant[]) => {
    if (REMOTE_ENABLED) return remoteSave(KEYS.MERCHANTS, data);
    saveLocal(KEYS.MERCHANTS, data);
  },

  getProducts: async (): Promise<Product[]> => {
    if (REMOTE_ENABLED) {
      return (await remoteFetch<Product[]>(KEYS.PRODUCTS)) || [];
    }
    return getLocal<Product[]>(KEYS.PRODUCTS, []);
  },

  saveProducts: async (data: Product[]) => {
    if (REMOTE_ENABLED) return remoteSave(KEYS.PRODUCTS, data);
    saveLocal(KEYS.PRODUCTS, data);
  },

  getTransactions: async (): Promise<Transaction[]> => {
    if (REMOTE_ENABLED) {
      return (await remoteFetch<Transaction[]>(KEYS.TRANSACTIONS)) || [];
    }
    return getLocal<Transaction[]>(KEYS.TRANSACTIONS, []);
  },

  saveTransactions: async (data: Transaction[]) => {
    if (REMOTE_ENABLED) return remoteSave(KEYS.TRANSACTIONS, data);
    saveLocal(KEYS.TRANSACTIONS, data);
  },

  getCustomers: async (): Promise<Customer[]> => {
    if (REMOTE_ENABLED) {
      return (await remoteFetch<Customer[]>(KEYS.CUSTOMERS)) || [];
    }
    return getLocal<Customer[]>(KEYS.CUSTOMERS, []);
  },

  getTickets: async (): Promise<Ticket[]> => {
    if (REMOTE_ENABLED) {
      return (await remoteFetch<Ticket[]>(KEYS.TICKETS)) || [];
    }
    return getLocal<Ticket[]>(KEYS.TICKETS, []);
  },
};
