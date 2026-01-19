
import React, { useState, useMemo } from 'react';
import { Product, Transaction } from '../types';

interface POSProps {
  products: Product[];
  onCompleteSale: (items: {productId: string, quantity: number, price: number}[]) => void;
}

const POS: React.FC<POSProps> = ({ products, onCompleteSale }) => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [products, searchTerm]);

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = products.find(p => p.id === id)!;
    return { ...product, quantity: qty };
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const ecoSavings = cartItems.reduce((acc, item) => acc + (item.ecoScore * item.quantity * 0.01), 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    onCompleteSale(cartItems.map(i => ({ productId: i.id, quantity: i.quantity, price: i.price })));
    setCart({});
  };

  return (
    <div className="flex h-full gap-6">
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-3">
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search products by name or category..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-emerald-900 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pb-4">
          {filteredProducts.map(p => (
            <button 
              key={p.id}
              onClick={() => addToCart(p.id)}
              className="bg-white p-4 rounded-2xl border border-emerald-100 hover:border-emerald-500 hover:shadow-lg transition-all text-left flex flex-col group"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-3 relative">
                 <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    {p.ecoScore}% Eco
                 </div>
              </div>
              <h4 className="font-bold text-emerald-900 truncate">{p.name}</h4>
              <p className="text-emerald-600 font-bold mt-1">${p.price.toFixed(2)}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="w-96 bg-white rounded-2xl shadow-xl border border-emerald-100 flex flex-col">
        <div className="p-6 border-b border-emerald-50">
          <h3 className="text-xl font-bold text-emerald-900 font-heading">Current Cart</h3>
          <p className="text-sm text-emerald-500">{cartItems.length} items</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <svg className="w-16 h-16 text-emerald-200 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-emerald-900 font-medium">Cart is empty</p>
              <p className="text-xs">Tap a product to add it</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <img src={item.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                <div className="flex-1">
                  <h5 className="font-bold text-sm text-emerald-900 leading-tight">{item.name}</h5>
                  <p className="text-xs text-emerald-600">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 p-1 rounded-lg">
                  <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 flex items-center justify-center hover:bg-emerald-200 rounded text-emerald-700"> - </button>
                  <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => addToCart(item.id)} className="w-6 h-6 flex items-center justify-center hover:bg-emerald-200 rounded text-emerald-700"> + </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-emerald-50/50 space-y-3 rounded-b-2xl">
          <div className="flex justify-between text-emerald-700">
            <span className="text-sm">Subtotal</span>
            <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-emerald-600">
            <span className="text-sm">Eco Bonus (Offset)</span>
            <span className="font-bold">+{ecoSavings.toFixed(2)}kg CO2</span>
          </div>
          <div className="pt-3 border-t border-emerald-100 flex justify-between text-emerald-900">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-2xl font-heading">${subtotal.toFixed(2)}</span>
          </div>
          <button 
            disabled={cartItems.length === 0}
            onClick={handleCheckout}
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 disabled:opacity-50 transition-all mt-4"
          >
            Complete Sale
          </button>
        </div>
      </div>
    </div>
  );
};

export default POS;
