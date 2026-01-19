
import React from 'react';
import { Product, NGO, Merchant, Customer, Ad, Ticket } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Bamboo Toothbrush', price: 4.50, category: 'Home', stock: 50, ecoScore: 95, packaging: 'Paper', carbonFootprint: 0.05, image: 'https://picsum.photos/seed/bamboo/200/200' },
  { id: '2', name: 'Organic Cotton Bag', price: 12.00, category: 'Fashion', stock: 25, ecoScore: 88, packaging: 'Reusable', carbonFootprint: 0.15, image: 'https://picsum.photos/seed/bag/200/200' },
  { id: '3', name: 'Recycled Paper Notebook', price: 8.99, category: 'Office', stock: 40, ecoScore: 92, packaging: 'Paper', carbonFootprint: 0.08, image: 'https://picsum.photos/seed/notebook/200/200' }
];

export const MOCK_NGOS: NGO[] = [
  { id: 'ngo1', name: 'The Ocean Cleanup', description: 'Removing plastic from world oceans.', category: 'Ocean', location: 'Global' },
  { id: 'ngo2', name: 'Eden Reforestation', description: 'Planting trees in vulnerable ecosystems.', category: 'Forest', location: 'Madagascar' },
  { id: 'ngo3', name: 'Climate Vault', description: 'Purchasing carbon permits to reduce supply.', category: 'Climate', location: 'USA' }
];

export const MOCK_MERCHANTS: Merchant[] = [
  {
    id: 'm1',
    name: 'Avoca Handweavers',
    email: 'hello@avoca.ie',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=AH&backgroundColor=065f46',
    category: 'Grocery',
    branches: [
      { 
        id: 'b1', name: 'Kilmacanogue HQ', location: 'Kilmacanogue, Co. Wicklow, A98 NY67', 
        devices: [
          { id: 'd1', serial: 'GT-AV-101', model: 'T1 Pro', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), sim: { iccid: '8935301...', carrier: 'Three IE', signalStrength: 92, dataUsed: '450MB' }, batteryLevel: 98 },
          { id: 'd2', serial: 'GT-AV-102', model: 'T1 Pro', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), sim: { iccid: '8935302...', carrier: 'Three IE', signalStrength: 88, dataUsed: '410MB' }, batteryLevel: 85 }
        ] 
      }
    ],
    selectedNGOs: ['ngo1'], offsetEnabled: true, offsetMatching: true, loyaltyConfig: { type: 'SPEND', threshold: 100, reward: '€10 Voucher' }
  },
  {
    id: 'm2',
    name: "Butler's Chocolate Cafe",
    email: 'cafe@butlers.ie',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=BC&backgroundColor=78350f',
    category: 'Cafe',
    branches: [
      { 
        id: 'b2', name: 'Grafton Street', location: '24 Grafton St, Dublin 2, D02 H654', 
        devices: [
          { id: 'd3', serial: 'GT-BU-201', model: 'T1 Pro', version: '2.4.0', status: 'ONLINE', lastPing: new Date(), sim: { iccid: '8935303...', carrier: 'Vodafone IE', signalStrength: 95, dataUsed: '1.2GB' }, batteryLevel: 100 },
          { id: 'd4', serial: 'GT-BU-202', model: 'T1 Pro', version: '2.4.0', status: 'ONLINE', lastPing: new Date(), sim: { iccid: '8935304...', carrier: 'Vodafone IE', signalStrength: 82, dataUsed: '1.1GB' }, batteryLevel: 45 }
        ] 
      }
    ],
    selectedNGOs: ['ngo2'], offsetEnabled: true, offsetMatching: false, loyaltyConfig: { type: 'VISIT', threshold: 10, reward: 'Free Hot Chocolate' }
  },
  {
    id: 'm3',
    name: 'Fallon & Byrne',
    email: 'info@fallonandbyrne.com',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=FB&backgroundColor=111827',
    category: 'Grocery',
    branches: [
      { 
        id: 'b3', name: 'Exchequer St', location: '11-17 Exchequer St, Dublin 2, D02 CY67', 
        devices: [
          { id: 'd5', serial: 'GT-FB-301', model: 'T1 Pro', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), sim: { iccid: '8935305...', carrier: 'Eir', signalStrength: 78, dataUsed: '2.5GB' }, batteryLevel: 92 },
          { id: 'd6', serial: 'GT-FB-302', model: 'T1 Pro', version: '2.4.1', status: 'OFFLINE', lastPing: new Date(Date.now() - 7200000), sim: { iccid: '8935306...', carrier: 'Eir', signalStrength: 0, dataUsed: '2.1GB' }, batteryLevel: 5 }
        ] 
      }
    ],
    selectedNGOs: ['ngo1', 'ngo3'], offsetEnabled: true, offsetMatching: true, loyaltyConfig: { type: 'SPEND', threshold: 200, reward: 'Wine Tasting for 2' }
  },
  {
    id: 'm4',
    name: "Murphy's Ice Cream",
    email: 'info@murphys.ie',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=MC&backgroundColor=0ea5e9',
    category: 'Cafe',
    branches: [
      { 
        id: 'b4', name: 'Wicklow St', location: '27 Wicklow St, Dublin 2, D02 H293', 
        devices: [
          { id: 'd7', serial: 'GT-MU-401', model: 'T1 Lite', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), sim: { iccid: '8935307...', carrier: 'Three IE', signalStrength: 85, dataUsed: '800MB' }, batteryLevel: 75 },
          { id: 'd8', serial: 'GT-MU-402', model: 'T1 Lite', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), sim: { iccid: '8935308...', carrier: 'Three IE', signalStrength: 82, dataUsed: '750MB' }, batteryLevel: 68 }
        ] 
      }
    ],
    selectedNGOs: ['ngo1'], offsetEnabled: true, offsetMatching: false, loyaltyConfig: { type: 'VISIT', threshold: 5, reward: 'Free Double Scoop' }
  },
  {
    id: 'm5',
    name: 'The Happy Pear',
    email: 'shop@thehappypear.ie',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=HP&backgroundColor=f59e0b',
    category: 'Grocery',
    branches: [
      { 
        id: 'b5', name: 'Greystones Main St', location: 'Church Rd, Greystones, Co. Wicklow, A63 FK21', 
        devices: [
          { id: 'd9', serial: 'GT-HP-501', model: 'T1 Pro', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), sim: { iccid: '8935309...', carrier: 'Vodafone IE', signalStrength: 90, dataUsed: '1.4GB' }, batteryLevel: 88 },
          { id: 'd10', serial: 'GT-HP-502', model: 'T1 Pro', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), sim: { iccid: '8935310...', carrier: 'Vodafone IE', signalStrength: 89, dataUsed: '1.3GB' }, batteryLevel: 91 }
        ] 
      }
    ],
    selectedNGOs: ['ngo2'], offsetEnabled: true, offsetMatching: true, loyaltyConfig: { type: 'SPEND', threshold: 50, reward: 'Cookbook' }
  },
  {
    id: 'm6',
    name: 'Sheridans Cheesemongers',
    email: 'info@sheridans.ie',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=SC&backgroundColor=166534',
    category: 'Grocery',
    branches: [
      { 
        id: 'b6', name: 'South Anne St', location: '11 South Anne St, Dublin 2, D02 RF43', 
        devices: [
          { id: 'd11', serial: 'GT-SH-601', model: 'T1 Pro', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), sim: { iccid: '8935311...', carrier: 'Eir', signalStrength: 75, dataUsed: '300MB' }, batteryLevel: 100 },
          { id: 'd12', serial: 'GT-SH-602', model: 'T1 Pro', version: '2.4.1', status: 'MAINTENANCE', lastPing: new Date(), sim: { iccid: '8935312...', carrier: 'Eir', signalStrength: 65, dataUsed: '250MB' }, batteryLevel: 100 }
        ] 
      }
    ],
    selectedNGOs: ['ngo1'], offsetEnabled: true, offsetMatching: false, loyaltyConfig: { type: 'VISIT', threshold: 12, reward: 'Cheese Board' }
  },
  {
    id: 'm7',
    name: "McCambridge's of Galway",
    email: 'orders@mccambridges.com',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=MG&backgroundColor=dc2626',
    category: 'Grocery',
    branches: [
      { 
        id: 'b7', name: 'Shop Street', location: '38-39 Shop St, Galway, H91 P923', 
        devices: [
          { id: 'd13', serial: 'GT-MC-701', model: 'T1 Pro', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), sim: { iccid: '8935313...', carrier: 'Three IE', signalStrength: 91, dataUsed: '1.1GB' }, batteryLevel: 94 },
          { id: 'd14', serial: 'GT-MC-702', model: 'T1 Pro', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), sim: { iccid: '8935314...', carrier: 'Three IE', signalStrength: 88, dataUsed: '900MB' }, batteryLevel: 92 }
        ] 
      }
    ],
    selectedNGOs: ['ngo3'], offsetEnabled: true, offsetMatching: true, loyaltyConfig: { type: 'SPEND', threshold: 150, reward: 'Luxury Hamper' }
  },
  {
    id: 'm8',
    name: 'O\'Conaill Chocolate',
    email: 'shop@oconaillchocolate.ie',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=OC&backgroundColor=451a03',
    category: 'Cafe',
    branches: [
      { 
        id: 'b8', name: 'French Church St', location: '16 French Church St, Cork, T12 WR54', 
        devices: [
          { id: 'd15', serial: 'GT-OC-801', model: 'T1 Pro', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), sim: { iccid: '8935315...', carrier: 'Vodafone IE', signalStrength: 94, dataUsed: '600MB' }, batteryLevel: 81 },
          { id: 'd16', serial: 'GT-OC-802', model: 'T1 Pro', version: '2.4.1', status: 'POWERED_OFF', lastPing: new Date(Date.now() - 86400000), sim: { iccid: '8935316...', carrier: 'Vodafone IE', signalStrength: 0, dataUsed: '550MB' }, batteryLevel: 0 }
        ] 
      }
    ],
    selectedNGOs: ['ngo2'], offsetEnabled: true, offsetMatching: false, loyaltyConfig: { type: 'VISIT', threshold: 8, reward: 'Box of Pralines' }
  },
  {
    id: 'm9',
    name: 'Keogh\'s Farm',
    email: 'crisps@keoghs.ie',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=KF&backgroundColor=3f6212',
    category: 'Grocery',
    branches: [
      { 
        id: 'b9', name: 'Farm Shop', location: 'Oldtown, Co. Dublin, A45 R543', 
        devices: [
          { id: 'd17', serial: 'GT-KE-901', model: 'T1 Lite', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), sim: { iccid: '8935317...', carrier: 'Eir', signalStrength: 72, dataUsed: '200MB' }, batteryLevel: 99 },
          { id: 'd18', serial: 'GT-KE-902', model: 'T1 Lite', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), sim: { iccid: '8935318...', carrier: 'Eir', signalStrength: 70, dataUsed: '180MB' }, batteryLevel: 95 }
        ] 
      }
    ],
    selectedNGOs: ['ngo1'], offsetEnabled: true, offsetMatching: true, loyaltyConfig: { type: 'SPEND', threshold: 30, reward: 'Multipack of Crisps' }
  },
  {
    id: 'm10',
    name: 'SuperValu Ireland',
    email: 'ops@supervalu.ie',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=SV&backgroundColor=b91c1c',
    category: 'Grocery',
    branches: [
      { 
        id: 'b10-1', name: 'Blackrock Shopping Centre', location: 'Blackrock, Co. Dublin, A94 E7V1', 
        devices: [
          { id: 'd19', serial: 'GT-SV-1001', model: 'T1 Max', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), sim: { iccid: '8935319...', carrier: 'Three IE', signalStrength: 96, dataUsed: '5.2GB' }, batteryLevel: 100 }
        ] 
      },
      { 
        id: 'b10-2', name: 'Kinsale Branch', location: 'Glen-na-vanna, Kinsale, Co. Cork, P17 K231', 
        devices: [
          { id: 'd20', serial: 'GT-SV-1002', model: 'T1 Max', version: '2.4.1', status: 'ONLINE', lastPing: new Date(), sim: { iccid: '8935320...', carrier: 'Three IE', signalStrength: 89, dataUsed: '4.8GB' }, batteryLevel: 98 }
        ] 
      }
    ],
    selectedNGOs: ['ngo2'], offsetEnabled: true, offsetMatching: true, loyaltyConfig: { type: 'VISIT', threshold: 1, reward: '10 Real Rewards Points' }
  }
];

export const MOCK_TICKETS: Ticket[] = [
  { id: 'TK-101', merchantId: 'm1', branchId: 'b1', deviceId: 'd1', subject: 'Printer jam on terminal', status: 'OPEN', priority: 'HIGH', createdAt: new Date() },
  { id: 'TK-102', merchantId: 'm3', branchId: 'b3', deviceId: 'd6', subject: 'Network connectivity dropped', status: 'IN_PROGRESS', priority: 'MEDIUM', createdAt: new Date(Date.now() - 86400000) },
  { id: 'TK-103', merchantId: 'm8', branchId: 'b8', deviceId: 'd16', subject: 'Terminal won\'t power on', status: 'OPEN', priority: 'HIGH', createdAt: new Date(Date.now() - 3600000) }
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Siobhan O\'Neill', email: 'siobhan@example.ie', visitCount: 18, totalSpend: 450.50, lastVisit: new Date() },
  { id: 'c2', name: 'Liam Murphy', email: 'liam@example.ie', visitCount: 5, totalSpend: 120.00, lastVisit: new Date(Date.now() - 86400000 * 2) },
  { id: 'c3', name: 'Cian Kelly', email: 'cian@example.ie', visitCount: 12, totalSpend: 280.75, lastVisit: new Date(Date.now() - 86400000 * 5) }
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
  Logo: () => (
    <div className="grid grid-cols-2 gap-1.5 w-8 h-8">
      <div className="bg-[#1e293b] rounded-lg"></div>
      <div className="bg-[#10b981] rounded-tl-2xl rounded-tr-md rounded-br-md rounded-bl-md"></div>
      <div className="bg-[#1e293b] rounded-lg"></div>
      <div className="bg-[#1e293b] rounded-lg"></div>
    </div>
  )
};
