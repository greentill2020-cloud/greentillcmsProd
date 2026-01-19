
export type UserRole = 'ADMIN' | 'MERCHANT';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  ecoScore: number;
  packaging: 'Plastic' | 'Paper' | 'Reusable' | 'Biodegradable';
  carbonFootprint: number;
  image?: string;
}

export interface Ad {
  id: string;
  imageUrl: string;
  name: string;
  isActive: boolean;
  rotationSpeed: number; // seconds
}

export interface NGO {
  id: string;
  name: string;
  description: string;
  category: 'Ocean' | 'Forest' | 'Climate';
  location: string;
}

export interface Ticket {
  id: string;
  merchantId: string;
  branchId: string;
  deviceId: string;
  subject: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: Date;
}

export interface SIM {
  iccid: string;
  carrier: string;
  signalStrength: number; // 0-100
  dataUsed: string;
}

export interface Device {
  id: string;
  serial: string;
  model: string;
  version: string;
  status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE' | 'POWERED_OFF';
  lastPing: Date;
  sim?: SIM;
  batteryLevel?: number;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  devices: Device[];
}

export interface Merchant {
  id: string;
  name: string;
  email: string;
  logo?: string;
  category: 'Grocery' | 'Fashion' | 'Tech' | 'Cafe';
  branches: Branch[];
  selectedNGOs: string[];
  offsetEnabled: boolean;
  offsetMatching: boolean;
  loyaltyConfig: {
    type: 'VISIT' | 'SPEND';
    threshold: number;
    reward: string;
  };
}

export interface Transaction {
  id: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
    carbon: number;
  }[];
  total: number;
  ecoImpactSaved: number;
  carbonOffsetContribution: number;
  isMatched: boolean;
  timestamp: Date;
  customerId?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  visitCount: number;
  totalSpend: number;
  lastVisit: Date;
}

export type View = 
  | 'dashboard' 
  | 'pos' 
  | 'inventory' 
  | 'merchant_mgmt' 
  | 'device_mgmt' 
  | 'ads_mgmt' 
  | 'receipt_mgmt' 
  | 'carbon_mgmt'
  | 'loyalty_mgmt'
  | 'customers'
  | 'support';
