
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

export interface InventoryItem {
  productId: string;
  quantity: number;
  minThreshold: number;
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: 'PDF' | 'IMAGE' | 'DOC';
}

export interface EmailTemplate {
  subject: string;
  body: string;
  lastUpdated: Date;
  bannerImage?: string;
  attachments?: Attachment[];
}

export interface CESFeature {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  isLicensed: boolean; // Admin level
  isActive: boolean;   // Merchant level
  template: EmailTemplate;
}

export interface LoyaltyConfig {
  type: 'VISIT' | 'SPEND';
  threshold: number;
  reward: string;
  isActive: boolean;
  couponDesign?: {
    backgroundColor: string;
    textColor: string;
    discountValue: string;
    prefix: string;
  };
  stampDesign?: {
    slots: number;
    color: string;
    icon: string;
  };
}

export interface CESConfig {
  features: CESFeature[];
  calendarSyncId?: string;
  marketingPeriod: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY';
  reviewLink: string; // TrustPilot, Google, etc.
}

export interface EngagementLog {
  id: string;
  timestamp: Date;
  customerId: string;
  transactionId: string;
  featureId: string;
  status: 'SENT' | 'BLOCKED_CONSENT' | 'FAILED';
  reason?: string;
}

export interface Merchant {
  id: string;
  name: string;
  email: string;
  logo?: string;
  category: 'Grocery' | 'Cafe' | 'Grocery';
  branches: Branch[];
  selectedNGOs: string[];
  offsetEnabled: boolean;
  offsetMatching: boolean;
  loyaltyConfig: LoyaltyConfig;
  cesConfig: CESConfig;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  visitCount: number;
  totalSpend: number;
  lastVisit: Date;
  consentFlags: {
    transactional: boolean;
    marketing: boolean;
  };
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  isOnline?: boolean;
  devices: Device[];
  inventory: InventoryItem[];
}

export interface Device {
  id: string;
  serial: string;
  model: string;
  version: string;
  status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE' | 'POWERED_OFF';
  lastPing: Date;
  sim?: {
    iccid: string;
    carrier: string;
    signalStrength: number;
    dataUsed: string;
  };
  batteryLevel?: number;
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
  branchId?: string;
}

export interface NGO {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
}

export interface Ticket {
  id: string;
  merchantId: string;
  deviceId: string;
  subject: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  createdAt: Date;
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
  | 'engagement_mgmt'
  | 'support';
