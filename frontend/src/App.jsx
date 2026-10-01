import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, TrendingUp, Package, Star, Search, ShieldAlert, BarChart3, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

// Ensure competitor_data.json is inside your src folder!
import rawData from './competitor_data.json';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = rawData.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const metrics = useMemo(() => {
    if (filteredData.length === 0) return { avgPrice: 0, inStock: 0, maxPrice: 0, stockPercentage: 0 };
    
    const avgPrice = filteredData.reduce((acc, item) => acc + item.price_gbp, 0) / filteredData.length;
    const inStock = filteredData.filter(item => item.stock_status.includes('In stock')).length;
    const maxPrice = Math.max(...filteredData.map(item => item.price_gbp));
    
    return {
      avgPrice: avgPrice.toFixed(2),
      inStock: inStock,
      maxPrice: maxPrice.toFixed(2),
      stockPercentage: ((inStock / filteredData.length) * 100).toFixed(0)
    };
  }, [filteredData]);

  const chartData = useMemo(() => {
    return [...filteredData]
      .sort((a, b) => b.price_gbp - a.price_gbp)
      .slice(0, 10)
      .map(item => ({
        name: item.title.substring(0, 15) + '...',
        Price: item.price_gbp
      }));
  }, [filteredData]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 p-4 sm:p-8 font-sans selection:bg-indigo-500/30">
      
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3 tracking-tight">
            <Terminal className="text-indigo-500" size={28} />
            Market Intelligence
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs px-2.5 py-1 rounded-full uppercase tracking-widest font-bold">
              Live Data
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Automated competitor pricing & stock analysis</p>
        </div>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Filter target items..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-800/50 border border-slate-700 text-white pl-10 pr-4 py-2.5 rounded-xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
          />
        </div>
      </header>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div variants={itemVariants} className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl backdrop-blur-sm shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Items Tracked</p>
                <h3 className="text-3xl font-black text-white">{filteredData.length}</h3>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                <Activity size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl backdrop-blur-sm shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Avg Market Price</p>
                <h3 className="text-3xl font-black text-white">£{metrics.avgPrice}</h3>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                <TrendingUp size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl backdrop-blur-sm shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Inventory Health</p>
                <h3 className="text-3xl font-black text-white">{metrics.stockPercentage}%</h3>
                <p className="text-xs text-emerald-400 font-semibold mt-1">{metrics.inStock} items in stock</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                <Package size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl backdrop-blur-sm shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Peak Price</p>
                <h3 className="text-3xl font-black text-white">£{metrics.maxPrice}</h3>
              </div>
              <div className="p-3 bg-rose-500/10 rounded-xl text-rose-400">
                <ShieldAlert size={24} />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="text-indigo-400" size={20} />
              <h2 className="text-lg font-bold text-white">Top 10 Highest Priced Items</h2>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `£${value}`} />
                  <Tooltip 
                    cursor={{ fill: '#334155', opacity: 0.4 }}
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '12px', color: '#f8fafc' }}
                    itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="Price" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#f43f5e' : '#6366f1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-slate-800/40 border border-slate-700/50 p-0 rounded-2xl backdrop-blur-sm shadow-xl overflow-hidden flex flex-col h-[400px]">
            <div className="p-6 border-b border-slate-700/50 bg-slate-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity size={20} className="text-emerald-400" />
                Raw Data Feed
              </h2>
            </div>
            <div className="overflow-y-auto flex-1 p-2 custom-scrollbar">
              {filteredData.map((item, idx) => (
                <div key={idx} className="p-4 hover:bg-slate-700/30 rounded-xl transition-colors border-b border-slate-700/30 last:border-0 flex justify-between items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-slate-200 truncate">{item.title}</h4>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.stock_status.includes('In stock') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                        {item.stock_status}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Star size={12} className="text-amber-400 fill-amber-400/20" /> {item.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-indigo-400 font-black text-sm">£{item.price_gbp.toFixed(2)}</span>
                  </div>
                </div>
              ))}
              {filteredData.length === 0 && (
                <div className="h-full flex items-center justify-center text-slate-500 text-sm font-medium">
                  No items match your search.
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}