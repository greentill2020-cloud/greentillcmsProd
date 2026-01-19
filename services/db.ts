
import { Merchant, Product, Transaction, Customer, Ticket } from '../types';
import { MOCK_MERCHANTS, INITIAL_PRODUCTS, MOCK_CUSTOMERS, MOCK_TICKETS } from '../constants';

const KEYS = {
  MERCHANTS: 'gt_db_merchants',
  PRODUCTS: 'gt_db_products',
  TRANSACTIONS: 'gt_db_transactions',
  CUSTOMERS: 'gt_db_customers',
  TICKETS: 'gt_db_tickets',
};

export const StorageService = {
  init: () => {
    // Check if we need a refresh of data or if it's the first time
    const existingMerchants = localStorage.getItem(KEYS.MERCHANTS);
    // Hard check: If Des Kelly is missing from merchants or serials are wrong, we reset
    const merchantsArr = existingMerchants ? JSON.parse(existingMerchants) : [];
    const isDesKellyPresent = merchantsArr.some((m: any) => m.name === 'Des Kelly Interiors');

    if (!isDesKellyPresent || merchantsArr.length < MOCK_MERCHANTS.length) {
      localStorage.setItem(KEYS.MERCHANTS, JSON.stringify(MOCK_MERCHANTS));
    }
    
    if (!localStorage.getItem(KEYS.PRODUCTS)) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    }
    if (!localStorage.getItem(KEYS.CUSTOMERS)) {
      localStorage.setItem(KEYS.CUSTOMERS, JSON.stringify(MOCK_CUSTOMERS));
    }
    if (!localStorage.getItem(KEYS.TICKETS)) {
      localStorage.setItem(KEYS.TICKETS, JSON.stringify(MOCK_TICKETS));
    }
    if (!localStorage.getItem(KEYS.TRANSACTIONS)) {
      localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify([]));
    }
  },

  getMerchants: (): Merchant[] => JSON.parse(localStorage.getItem(KEYS.MERCHANTS) || '[]'),
  saveMerchants: (data: Merchant[]) => localStorage.setItem(KEYS.MERCHANTS, JSON.stringify(data)),

  getProducts: (): Product[] => JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]'),
  saveProducts: (data: Product[]) => localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(data)),

  getTransactions: (): Transaction[] => JSON.parse(localStorage.getItem(KEYS.TRANSACTIONS) || '[]'),
  saveTransaction: (t: Transaction) => {
    const prev = JSON.parse(localStorage.getItem(KEYS.TRANSACTIONS) || '[]');
    localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify([...prev, t]));
  },

  getCustomers: (): Customer[] => JSON.parse(localStorage.getItem(KEYS.CUSTOMERS) || '[]'),
  getTickets: (): Ticket[] => JSON.parse(localStorage.getItem(KEYS.TICKETS) || '[]'),
};
