
import React from 'react';
import { UserRole, Device } from '../types';

interface DeviceManagerProps {
  role: UserRole;
  devices: Device[];
}

const DeviceManager: React.FC<DeviceManagerProps> = ({ role, devices }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-emerald-900">Terminal & Device Fleet</h2>
          <p className="text-emerald-600">Manage hardware status and remote configurations</p>
        </div>
        {role === 'ADMIN' && (
          <button className="bg-emerald-900 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-200">
            Provision New Device
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map(device => (
          <div key={device.id} className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${device.status === 'ONLINE' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {device.status}
                </div>
                <div className="text-xs text-emerald-400 font-medium">S/N: {device.serial}</div>
              </div>
              <h3 className="text-lg font-bold text-emerald-900 mb-1">{device.model}</h3>
              <p className="text-sm text-emerald-600 mb-4">Firmware: v{device.version}</p>
              
              <div className="bg-emerald-50 rounded-xl p-4 space-y-2 mb-6">
                <div className="flex justify-between text-xs">
                   <span className="text-emerald-500">Last Ping</span>
                   <span className="font-bold text-emerald-900">{new Date(device.lastPing).toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                   <span className="text-emerald-500">Branch</span>
                   <span className="font-bold text-emerald-900">Downtown Central</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-white border border-emerald-200 text-emerald-700 py-2 rounded-xl text-xs font-bold hover:bg-emerald-50">
                Configuration
              </button>
              <button className="flex-1 bg-emerald-900 text-white py-2 rounded-xl text-xs font-bold hover:bg-emerald-800">
                Remote Login
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceManager;
