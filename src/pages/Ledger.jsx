import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '../api/axios';
import Toast from '../components/Toast';

export default function Ledger() {
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState(null);
  const [type, setType] = useState('Tiffin Theft');
  const [itemName, setItemName] = useState('');
  const [amountTaka, setAmountTaka] = useState('');
  const [estimatedCalories, setEstimatedCalories] = useState('');
  const [toast, setToast] = useState(null);

  const fetchAll = async () => {
    const [e, s] = await Promise.all([api.get('/ledger'), api.get('/ledger/stats')]);
    setEntries(e.data);
    setStats(s.data);
  };

  useEffect(() => { fetchAll(); }, []);

  const addEntry = async (e) => {
    e.preventDefault();
    try {
      await api.post('/ledger', { type, itemName, amountTaka: Number(amountTaka) || 0, estimatedCalories: Number(estimatedCalories) || 0 });
      setItemName(''); setAmountTaka(''); setEstimatedCalories('');
      fetchAll();
    } catch (err) {
      setToast({ message: 'Failed to add entry', type: 'error' });
    }
  };

  const chartData = entries.slice(0, 10).reverse().map((e, i) => ({
    name: e.itemName || e.type, taka: e.amountTaka
  }));

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 flex flex-col gap-6">
      <div className="card">
        <h2 className="text-xl font-bold text-white mb-4">Corrupt Economy & Tiffin Ledger</h2>
        <form onSubmit={addEntry} className="grid grid-cols-2 gap-3 mb-4">
          <select className="input col-span-2" value={type} onChange={e => setType(e.target.value)}>
            <option>Washroom Toll</option>
            <option>Tiffin Theft</option>
          </select>
          <input className="input" placeholder="Item (e.g. Fried Rice)" value={itemName} onChange={e => setItemName(e.target.value)} />
          <input className="input" type="number" placeholder="Amount (Taka)" value={amountTaka} onChange={e => setAmountTaka(e.target.value)} />
          <input className="input col-span-2" type="number" placeholder="Estimated Calories" value={estimatedCalories} onChange={e => setEstimatedCalories(e.target.value)} />
          <button className="btn-primary col-span-2" type="submit">Log Entry</button>
        </form>

        {stats && (
          <div className="grid grid-cols-2 gap-3 text-white text-sm mb-4">
            <div className="bg-black/30 rounded-lg p-3">💸 Total Extorted: <strong>{stats.totalTaka}৳</strong></div>
            <div className="bg-black/30 rounded-lg p-3">🔥 Caloric Surplus: <strong>{stats.netCaloricSurplus} kcal</strong></div>
            <div className="bg-black/30 rounded-lg p-3">🏏 Cricket Bats Fundable: <strong>{stats.cricketBatsAffordable}</strong></div>
            <div className="bg-black/30 rounded-lg p-3">🥟 Jhalmuri Packets: <strong>{stats.jhalmuriPacketsAffordable}</strong></div>
          </div>
        )}

        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="name" stroke="#ffffff80" fontSize={11} />
            <YAxis stroke="#ffffff80" fontSize={11} />
            <Tooltip />
            <Bar dataKey="taka" fill="#ff4d6d" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
