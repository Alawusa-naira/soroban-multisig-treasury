'use client';

import { useState, useEffect } from 'react';
import { useStellarWallet } from '@/hooks/useStellarWallet';
import { 
  Wallet, 
  Plus, 
  Shield, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  Menu,
  LayoutDashboard,
  Settings,
  History
} from 'lucide-react';

export default function Dashboard() {
  const { address, isConnecting, connect, disconnect } = useStellarWallet();
  const [pendingTxs, setPendingTxs] = useState<any[]>([]);

  // Mock data for the Treasury
  const vaultBalance = "5,240.50";
  const vaultThreshold = "2 of 3";

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/5 bg-[#0d0d0f] hidden lg:flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            SoroVault
          </span>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<History size={20} />} label="Transactions" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <button 
            onClick={address ? disconnect : connect}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 active:scale-[0.98]"
          >
            <Wallet size={18} className={address ? "text-emerald-400" : "text-slate-400"} />
            <span className="text-sm font-medium truncate">
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-8 lg:p-12 max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2 tracking-tight">Organization Treasury</h1>
            <p className="text-slate-400">Securely manage your Stellar assets with multi-sig protection.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/20 transition-all active:scale-95 group">
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            Propose Transaction
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors" />
            <p className="text-slate-400 text-sm font-medium mb-1">Total Vault Balance</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl font-bold tabular-nums tracking-tight tracking-tighter">{vaultBalance}</h3>
              <span className="text-xl font-medium text-slate-500">XLM</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-colors">
            <p className="text-slate-400 text-sm font-medium mb-1">Security Threshold</p>
            <h3 className="text-4xl font-bold tracking-tight">{vaultThreshold}</h3>
            <div className="mt-4 flex gap-1.5">
              <span className="w-8 h-1.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30" />
              <span className="w-8 h-1.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30" />
              <span className="w-8 h-1.5 rounded-full bg-white/10" />
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-colors">
            <p className="text-slate-400 text-sm font-medium mb-1">Pending Signatures</p>
            <h3 className="text-4xl font-bold tracking-tight">12</h3>
            <p className="mt-2 text-sm text-amber-400/80 font-medium">Needs Attention</p>
          </div>
        </div>

        {/* Transactions Table Section */}
        <section className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-bold">Pending Proposals</h2>
            <button className="text-sm text-indigo-400 font-medium hover:text-indigo-300">View History</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-slate-500 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Title</th>
                  <th className="px-6 py-4 font-semibold">Destination</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Approvals</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <ProposalRow 
                  title="Drips Phase 2 Payout" 
                  dest="GD3S...K4P2" 
                  amount="2,500 XLM" 
                  approvals="1/2" 
                  status="needs-approval"
                />
                <ProposalRow 
                  title="Cloud Infra Renewal" 
                  dest="GA7N...J2L1" 
                  amount="150 XLM" 
                  approvals="2/2" 
                  status="ready"
                />
                <ProposalRow 
                  title="Community Rewards" 
                  dest="GBX2...9QW0" 
                  amount="1,000 XLM" 
                  approvals="0/2" 
                  status="pending"
                />
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <a className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
      active ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
    }`}>
      {icon}
      <span className="font-medium">{label}</span>
    </a>
  );
}

function ProposalRow({ title, dest, amount, approvals, status }: { title: string, dest: string, amount: string, approvals: string, status: string }) {
  return (
    <tr className="group hover:bg-white/[0.02] transition-colors">
      <td className="px-6 py-6 ring-offset-black">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${status === 'ready' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`} />
          <span className="font-semibold">{title}</span>
        </div>
      </td>
      <td className="px-6 py-6 font-mono text-xs text-slate-500">{dest}</td>
      <td className="px-6 py-6 font-bold text-slate-200">{amount}</td>
      <td className="px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{approvals}</span>
          <div className="w-16 h-1 rounded-full bg-white/5 overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-1000" 
              style={{ width: approvals === '1/2' ? '50%' : approvals === '2/2' ? '100%' : '0%' }} 
            />
          </div>
        </div>
      </td>
      <td className="px-6 py-6 text-right">
        {status === 'ready' ? (
          <button className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-sm font-bold hover:bg-emerald-500 hover:text-white transition-all">
            Execute
          </button>
        ) : (
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-400 transition-all">
            Sign TX
          </button>
        )}
      </td>
    </tr>
  );
}
