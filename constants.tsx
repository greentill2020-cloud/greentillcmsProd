
import React from 'react';
import { Product, NGO, Merchant, Customer, CESFeature, Ticket, Device } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Bamboo Toothbrush', price: 4.50, category: 'Home', stock: 150, ecoScore: 95, packaging: 'Paper', carbonFootprint: 0.05, image: 'https://picsum.photos/seed/bamboo/200/200' },
  { id: '2', name: 'Organic Cotton Bag', price: 12.00, category: 'Fashion', stock: 85, ecoScore: 88, packaging: 'Reusable', carbonFootprint: 0.15, image: 'https://picsum.photos/seed/bag/200/200' },
  { id: '3', name: 'Recycled Paper Notebook', price: 8.99, category: 'Office', stock: 120, ecoScore: 92, packaging: 'Paper', carbonFootprint: 0.08, image: 'https://picsum.photos/seed/notebook/200/200' },
  { id: 'f1', name: 'Oak Dining Table', price: 899.00, category: 'Furniture', stock: 5, ecoScore: 82, packaging: 'Biodegradable', carbonFootprint: 45.0, image: 'https://picsum.photos/seed/table/200/200' },
  { id: 'g1', name: 'Celtic Vase', price: 45.00, category: 'Gifts', stock: 12, ecoScore: 75, packaging: 'Paper', carbonFootprint: 2.5, image: 'https://picsum.photos/seed/vase/200/200' }
];

export const MOCK_NGOS: NGO[] = [
  { id: 'ngo1', name: 'The Ocean Cleanup', description: 'Removing plastic from world oceans.', category: 'Ocean', location: 'Global' },
  { id: 'ngo2', name: 'Eden Reforestation', description: 'Planting trees in vulnerable ecosystems.', category: 'Forest', location: 'Madagascar' },
  { id: 'ngo3', name: 'Climate Vault', description: 'Purchasing carbon permits to reduce supply.', category: 'Climate', location: 'USA' }
];

const BANNERS = {
  LEGAL: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
  LOGISTICS: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
  TRACKING: 'https://images.unsplash.com/photo-1526733169359-8117173ff730?auto=format&fit=crop&q=80&w=800',
  WARRANTY: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
  MARKETING: 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=800'
};

const defaultTemplate = (name: string, banner: string) => ({
  subject: `${name} - Order {{transaction_id}} Confirmed!`,
  body: `Hi {{customer_name}},\n\nThank you for choosing us for your purchase today.\n\nAttached is your official ${name}. We are proud to operate a zero-paper policy to protect our environment.\n\nReference: {{transaction_id}}\nVisit us again soon!`,
  lastUpdated: new Date(),
  bannerImage: banner,
  attachments: [
    { id: `att_${Math.random().toString(36).substr(2, 4)}`, name: `${name.replace(/\s/g, '_')}_GT.pdf`, size: '1.4MB', type: 'PDF' as const }
  ]
});

const generateCES = (active = true): CESFeature[] => [
  { 
    id: 'tc_email', name: 'Terms & Conditions', description: 'Legally mandatory documentation sent immediately after payment.', isLicensed: true, isActive: active, 
    template: defaultTemplate('Terms & Conditions', BANNERS.LEGAL) 
  },
  { 
    id: 'inv_delivery', name: 'Invoice & Delivery', description: 'Official digital invoice and estimated shipping timeline.', parentId: 'tc_email', isLicensed: true, isActive: active, 
    template: {
      ...defaultTemplate('Digital Invoice', BANNERS.LOGISTICS),
      body: `Hi {{customer_name}},\n\nYour order {{transaction_id}} has been processed. Your digital invoice is attached.\n\nWe're preparing your items for dispatch. You'll receive a tracking link as soon as the driver is assigned.`,
    } 
  },
  { 
    id: 'delivery_mgmt', name: 'Delivery Tracking', description: 'Real-time logistics updates and rescheduling options.', parentId: 'inv_delivery', isLicensed: true, isActive: active, 
    template: {
       ...defaultTemplate('Live Tracking', BANNERS.TRACKING),
       body: `Hi {{customer_name}},\n\nGreat news! Order {{transaction_id}} is out for delivery.\n\nYou can track your driver in real-time or reschedule if you're not home.\n\nEnjoy your new items!`
    }
  },
  { 
    id: 'receipt_goods', name: 'Confirmation of Receipt', description: 'Explicit delivery confirmation sent 6 hours post-arrival.', parentId: 'delivery_mgmt', isLicensed: true, isActive: active, 
    template: {
      ...defaultTemplate('Delivery Confirmed', BANNERS.LOGISTICS),
      body: `Hi {{customer_name}},\n\nOur records show your order was delivered. We hope you love it!\n\nIf anything is missing or damaged, please reply to this email immediately.`
    }
  },
  { 
    id: 'warranty', name: 'Warranty & Aftercare', description: 'Structural certificates and product protection documentation.', parentId: 'receipt_goods', isLicensed: true, isActive: active, 
    template: {
       ...defaultTemplate('Protection Certificate', BANNERS.WARRANTY),
       body: `Hi {{customer_name}},\n\nTo ensure your peace of mind, we've attached the structural warranty for your recent purchase {{transaction_id}}.\n\nDes Kelly Interiors and our partners stand by the quality of every item we sell.`
    }
  },
  { 
    id: 'marketing', name: 'Brand Engagement', description: 'Seasonal promotional offers and loyalty milestones.', isLicensed: true, isActive: active, 
    template: defaultTemplate('Seasonal Offers', BANNERS.MARKETING) 
  },
];

export const MOCK_MERCHANTS: Merchant[] = [
  {
    id: 'm1', name: 'Avoca Handweavers', email: 'hello@avoca.ie',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=AH&backgroundColor=065f46',
    category: 'Grocery', branches: [{ id: 'b1', name: 'Kilmacanogue HQ', location: 'Co. Wicklow', devices: [{ id: 'd1', serial: 'GT-AV-101', model: 'T1 Pro', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), batteryLevel: 98, sim: { iccid: '8935301012345678901', carrier: 'Vodafone IE', signalStrength: 85, dataUsed: '1.2GB' } }], inventory: [] }],
    selectedNGOs: ['ngo1'], offsetEnabled: true, offsetMatching: true, 
    loyaltyConfig: { type: 'SPEND', threshold: 100, reward: '€10 Voucher', isActive: true, couponDesign: { backgroundColor: '#065f46', textColor: '#ffffff', discountValue: '€10', prefix: 'AVO' } },
    cesConfig: { features: generateCES(), marketingPeriod: 'WEEKLY', reviewLink: 'https://trustpilot.com/avoca' }
  },
  {
    id: 'm11', name: 'Des Kelly Interiors', email: 'sales@deskelly.ie',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=DK&backgroundColor=1e293b',
    category: 'Grocery',
    branches: [
      { id: 'b11a', name: 'Glasnevin', location: 'Dublin 11', devices: [{ id: 'd11a', serial: 'GT-DK-110', model: 'T1 Max', version: '2.5.0', status: 'ONLINE', lastPing: new Date(), batteryLevel: 100, sim: { iccid: '8935301111111111111', carrier: 'Three IE', signalStrength: 92, dataUsed: '2.4GB' } }], inventory: [] },
      { id: 'b11b', name: 'Donaghmede', location: 'Dublin 13', devices: [{ id: 'd11b', serial: 'GT-DK-111', model: 'T1 Lite', version: '2.5.0', status: 'MAINTENANCE', lastPing: new Date(), batteryLevel: 42, sim: { iccid: '8935301111111111112', carrier: 'Three IE', signalStrength: 30, dataUsed: '0.8GB' } }], inventory: [] }
    ],
    selectedNGOs: ['ngo3'], offsetEnabled: true, offsetMatching: true, 
    loyaltyConfig: { type: 'SPEND', threshold: 500, reward: 'Free Fitting', isActive: true, couponDesign: { backgroundColor: '#1e293b', textColor: '#ffffff', discountValue: 'FITTING', prefix: 'DKI' } },
    cesConfig: { features: generateCES(), marketingPeriod: 'MONTHLY', reviewLink: '' }
  },
  {
    id: 'm12', name: 'Right Style Furniture', email: 'info@rightstyle.ie',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=RS&backgroundColor=b91c1c',
    category: 'Grocery',
    branches: [{ id: 'b12', name: 'Belgard Rd', location: 'Tallaght', devices: [{ id: 'd12', serial: 'GT-RS-201', model: 'T1 Pro', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), batteryLevel: 75, sim: { iccid: '8935301222222222222', carrier: 'Eir', signalStrength: 65, dataUsed: '4.1GB' } }], inventory: [] }],
    selectedNGOs: ['ngo2'], offsetEnabled: true, offsetMatching: false, 
    loyaltyConfig: { type: 'SPEND', threshold: 1000, reward: 'Free Underlay', isActive: true, couponDesign: { backgroundColor: '#b91c1c', textColor: '#ffffff', discountValue: 'FREE', prefix: 'RSF' } },
    cesConfig: { features: generateCES(), marketingPeriod: 'QUARTERLY', reviewLink: '' }
  },
  {
    id: 'm13', name: 'Irish Gifts', email: 'gifts@irishgifts.ie',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=IG&backgroundColor=15803d',
    category: 'Cafe',
    branches: [{ id: 'b13', name: 'Grafton St', location: 'Dublin 2', devices: [{ id: 'd13', serial: 'GT-IG-301', model: 'T1 Pro', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), batteryLevel: 99, sim: { iccid: '8935301333333333333', carrier: 'Vodafone IE', signalStrength: 98, dataUsed: '1.5GB' } }], inventory: [] }],
    selectedNGOs: ['ngo1'], offsetEnabled: true, offsetMatching: true, 
    loyaltyConfig: { type: 'VISIT', threshold: 10, reward: 'Celtic Mug', isActive: true, stampDesign: { slots: 10, color: '#15803d', icon: 'Leaf' } },
    cesConfig: { features: generateCES(), marketingPeriod: 'WEEKLY', reviewLink: '' }
  },
  {
    id: 'm2', name: "Butler's Chocolate Cafe", email: 'cafe@butlers.ie',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=BC&backgroundColor=78350f',
    category: 'Cafe', branches: [{ id: 'b2', name: 'Wicklow St', location: 'Dublin 2', devices: [{ id: 'd2', serial: 'GT-BC-201', model: 'T1 Pro', status: 'ONLINE', lastPing: new Date(), version: '2.4', batteryLevel: 88, sim: { iccid: '8935301000000000002', carrier: 'Three IE', signalStrength: 75, dataUsed: '2.2GB' } }], inventory: [] }], selectedNGOs: ['ngo2'], offsetEnabled: true, offsetMatching: false, 
    loyaltyConfig: { type: 'VISIT', threshold: 10, reward: 'Hot Chocolate', isActive: true, stampDesign: { slots: 10, color: '#78350f', icon: 'Sparkles' } },
    cesConfig: { features: generateCES(false), marketingPeriod: 'MONTHLY', reviewLink: '' }
  },
  {
    id: 'm3', name: 'Fallon & Byrne', email: 'info@fallonandbyrne.com',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=FB&backgroundColor=111827',
    category: 'Grocery', branches: [{ id: 'b3', name: 'Exchequer St', location: 'Dublin 2', devices: [{ id: 'd3', serial: 'GT-FB-01', model: 'T1 Pro', status: 'ONLINE', lastPing: new Date(), version: '2.4', batteryLevel: 92, sim: { iccid: '8935301000000000003', carrier: 'Eir', signalStrength: 60, dataUsed: '3.1GB' } }], inventory: [] }],
    selectedNGOs: ['ngo1'], offsetEnabled: true, offsetMatching: true, 
    loyaltyConfig: { type: 'SPEND', threshold: 200, reward: 'Wine', isActive: false },
    cesConfig: { features: generateCES(), marketingPeriod: 'MONTHLY', reviewLink: '' }
  },
  {
    id: 'm4', name: "Murphy's Ice Cream", email: 'hello@murphys.ie',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=MI&backgroundColor=0ea5e9',
    category: 'Cafe', branches: [{ id: 'b4', name: 'Dingle HQ', location: 'Dingle, Kerry', devices: [{ id: 'd4', serial: 'GT-MI-001', model: 'T1 Lite', status: 'OFFLINE', lastPing: new Date(Date.now() - 3600000), batteryLevel: 12, version: '2.1', sim: { iccid: '8935301444444444444', carrier: 'Vodafone IE', signalStrength: 0, dataUsed: '0.1GB' } }], inventory: [] }],
    selectedNGOs: ['ngo1'], offsetEnabled: true, offsetMatching: true, 
    loyaltyConfig: { type: 'VISIT', threshold: 5, reward: 'Free Scoop', isActive: true, stampDesign: { slots: 5, color: '#0ea5e9', icon: 'Star' } },
    cesConfig: { features: generateCES(), marketingPeriod: 'WEEKLY', reviewLink: '' }
  },
  {
    id: 'm5', name: 'Keogh\'s Farm', email: 'crisps@keoghs.ie',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=KF&backgroundColor=15803d',
    category: 'Grocery', branches: [{ id: 'b5', name: 'North Road', location: 'Oldtown, Dublin', devices: [{ id: 'd5', serial: 'GT-KF-501', model: 'T1 Max', status: 'ONLINE', lastPing: new Date(), batteryLevel: 95, version: '2.5', sim: { iccid: '8935301555555555555', carrier: 'Three IE', signalStrength: 88, dataUsed: '5.5GB' } }], inventory: [] }],
    selectedNGOs: ['ngo2'], offsetEnabled: true, offsetMatching: true, 
    loyaltyConfig: { type: 'VISIT', threshold: 1, reward: 'Crisp Pack', isActive: true },
    cesConfig: { features: generateCES(), marketingPeriod: 'WEEKLY', reviewLink: '' }
  },
  {
    id: 'm10', name: 'SuperValu Ireland', email: 'ops@supervalu.ie',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=SV&backgroundColor=b91c1c',
    category: 'Grocery', branches: [{ id: 'b10', name: 'Blackrock', location: 'Dublin', devices: [{ id: 'd10', serial: 'GT-SV-99', model: 'T1 Max', status: 'ONLINE', lastPing: new Date(), version: '3.0', batteryLevel: 100, sim: { iccid: '8935301999999999999', carrier: 'Vodafone IE', signalStrength: 100, dataUsed: '12.2GB' } }], inventory: [] }], selectedNGOs: ['ngo2'], offsetEnabled: true, offsetMatching: true, 
    loyaltyConfig: { type: 'VISIT', threshold: 1, reward: 'Points', isActive: true },
    cesConfig: { features: generateCES(), marketingPeriod: 'DAILY', reviewLink: '' }
  }
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Siobhan O\'Neill', email: 'siobhan@example.ie', visitCount: 18, totalSpend: 450.50, lastVisit: new Date(), consentFlags: { transactional: true, marketing: false } },
  { id: 'c2', name: 'Liam Murphy', email: 'liam@domain.com', visitCount: 5, totalSpend: 120.00, lastVisit: new Date(), consentFlags: { transactional: true, marketing: true } }
];

export const MOCK_TICKETS: Ticket[] = [
  { id: 'TKT-101', merchantId: 'm4', deviceId: 'd4', subject: 'Device heartbeat lost', priority: 'HIGH', status: 'OPEN', createdAt: new Date() }
];

export const ICONS = {
  Leaf: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" /></svg>,
  Chart: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Store: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  Device: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  Ticket: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>,
  Signal: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.828a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" /></svg>,
  Megaphone: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>,
  Receipt: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
  Users: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Lock: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  Sparkles: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>,
  Star: (props: any) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
  Logo: () => (
    <div className="grid grid-cols-2 gap-[4px] w-8 h-8">
      <div className="bg-[#1e293b] rounded-[4px]"></div>
      <div className="bg-[#10b981] rounded-tl-[14px] rounded-tr-[4px] rounded-br-[4px] rounded-bl-[4px] shadow-sm shadow-emerald-500/10"></div>
      <div className="bg-[#1e293b] rounded-[4px]"></div>
      <div className="bg-[#1e293b] rounded-[4px]"></div>
    </div>
  )
};
