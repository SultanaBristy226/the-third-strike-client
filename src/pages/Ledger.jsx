import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Download,
  Share2,
  BarChart3,
  PieChart,
  LineChart,
  Users,
  Wallet,
  ShoppingBag,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Filter,
  Search,
  ChevronRight,
  Sparkles,
  Award,
  Target,
  Flame,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Ledger() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "tiffin",
      category: "Stolen Food",
      description: "Kuddus stole fried rice",
      amount: 0,
      tiffinItem: "Fried Rice",
      date: "2024-01-15",
      time: "12:30 PM",
      status: "verified",
    },
    {
      id: 2,
      type: "money",
      category: "Washroom Toll",
      description: "2 Taka washroom bribe",
      amount: 2,
      date: "2024-01-15",
      time: "10:15 AM",
      status: "pending",
    },
    {
      id: 3,
      type: "tiffin",
      category: "Stolen Food",
      description: "Kuddus stole sandwich",
      amount: 0,
      tiffinItem: "Chicken Sandwich",
      date: "2024-01-14",
      time: "1:00 PM",
      status: "verified",
    },
    {
      id: 4,
      type: "money",
      category: "Washroom Toll",
      description: "2 Taka washroom bribe",
      amount: 2,
      date: "2024-01-14",
      time: "9:30 AM",
      status: "verified",
    },
    {
      id: 5,
      type: "tiffin",
      category: "Stolen Food",
      description: "Kuddus stole biryani",
      amount: 0,
      tiffinItem: "Chicken Biryani",
      date: "2024-01-13",
      time: "12:45 PM",
      status: "pending",
    },
    {
      id: 6,
      type: "money",
      category: "Quality Tax",
      description: "20% tiffin tax",
      amount: 10,
      date: "2024-01-13",
      time: "11:00 AM",
      status: "verified",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list"); // list, stats
  const [newEntry, setNewEntry] = useState({
    type: "money",
    category: "Washroom Toll",
    description: "",
    amount: "",
    tiffinItem: "",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: "pending",
  });

  // Calculate totals
  const totalMoney = transactions
    .filter(t => t.type === "money" && t.status === "verified")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalTiffins = transactions
    .filter(t => t.type === "tiffin" && t.status === "verified")
    .length;

  const pendingMoney = transactions
    .filter(t => t.type === "money" && t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingTiffins = transactions
    .filter(t => t.type === "tiffin" && t.status === "pending")
    .length;

  const uniqueTiffinItems = [...new Set(transactions
    .filter(t => t.type === "tiffin" && t.status === "verified")
    .map(t => t.tiffinItem)
  )];

  // Filter transactions
  const filteredTransactions = transactions.filter(t => {
    const matchesType = filterType === "all" || t.type === filterType;
    const matchesStatus = filterStatus === "all" || t.status === filterStatus;
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const addTransaction = () => {
    if (!newEntry.description || (!newEntry.amount && newEntry.type === "money")) {
      alert("Please fill all required fields");
      return;
    }

    setTransactions([
      ...transactions,
      {
        id: Date.now(),
        type: newEntry.type,
        category: newEntry.category,
        description: newEntry.description,
        amount: newEntry.type === "money" ? parseFloat(newEntry.amount) : 0,
        tiffinItem: newEntry.type === "tiffin" ? newEntry.tiffinItem : "",
        date: newEntry.date,
        time: newEntry.time,
        status: newEntry.status,
      },
    ]);

    setNewEntry({
      type: "money",
      category: "Washroom Toll",
      description: "",
      amount: "",
      tiffinItem: "",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "pending",
    });
    setShowAddModal(false);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const toggleStatus = (id) => {
    setTransactions(transactions.map(t =>
      t.id === id ? { ...t, status: t.status === "verified" ? "pending" : "verified" } : t
    ));
  };

  // Tiffin Items with count
  const tiffinStats = transactions
    .filter(t => t.type === "tiffin" && t.status === "verified")
    .reduce((acc, t) => {
      acc[t.tiffinItem] = (acc[t.tiffinItem] || 0) + 1;
      return acc;
    }, {});

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f8] dark:bg-[#090820] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-20 px-4 md:px-6 max-w-7xl mx-auto w-full pb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                  Corrupt Economy Ledger
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  💰 Track Kuddus's financial and food crimes
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={() => setViewMode(viewMode === "list" ? "stats" : "list")}
              className="px-4 py-2 rounded-xl text-sm font-bold bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10 hover:border-purple-500 transition-colors flex items-center gap-2"
            >
              {viewMode === "list" ? (
                <>
                  <BarChart3 className="h-4 w-4" />
                  View Stats
                </>
              ) : (
                <>
                  <DollarSign className="h-4 w-4" />
                  View List
                </>
              )}
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl text-sm font-bold text-white flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                boxShadow: '0 4px 20px rgba(112,48,239,0.3)',
              }}
            >
              <Plus className="h-4 w-4" />
              Add Entry
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Money", value: `৳${totalMoney}`, icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
            { label: "Tiffins Stolen", value: totalTiffins, icon: ShoppingBag, color: "text-orange-500", bg: "bg-orange-500/10" },
            { label: "Pending Money", value: `৳${pendingMoney}`, icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
            { label: "Pending Tiffins", value: pendingTiffins, icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-4 border border-gray-200 dark:border-white/10 hover:border-purple-500 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats View */}
        {viewMode === "stats" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tiffin Stats */}
            <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">🍱 Most Stolen Tiffins</h3>
              <div className="space-y-3">
                {Object.entries(tiffinStats).map(([item, count]) => (
                  <div key={item} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{item}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(count / Math.max(...Object.values(tiffinStats))) * 100}%`,
                            background: 'linear-gradient(135deg, #7030ef, #db1fff)',
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-purple-500">{count}x</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">💰 Financial Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Total Extorted</span>
                  <span className="text-lg font-black text-red-500">৳{totalMoney}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Pending Verification</span>
                  <span className="text-lg font-black text-yellow-500">৳{pendingMoney}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Total Tiffins Stolen</span>
                  <span className="text-lg font-black text-orange-500">{totalTiffins}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-500/10 dark:to-pink-500/10">
                  <span className="text-sm font-bold text-purple-600 dark:text-purple-400">🛡️ Justice Score</span>
                  <span className="text-lg font-black text-purple-500">
                    {totalMoney > 0 || totalTiffins > 0 ? "⚖️ 72%" : "✨ 100%"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* List View */
          <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
            {/* Filters */}
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex flex-wrap gap-3">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
                  />
                </div>
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="rounded-xl px-4 py-2 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
              >
                <option value="all">All Types</option>
                <option value="money">Money</option>
                <option value="tiffin">Tiffin</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-xl px-4 py-2 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
              </select>
              <button
                onClick={() => {
                  setFilterType("all");
                  setFilterStatus("all");
                  setSearchTerm("");
                }}
                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                    <th className="text-left py-3 px-4 font-bold text-gray-500 dark:text-gray-400">Type</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-500 dark:text-gray-400">Category</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-500 dark:text-gray-400">Description</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-500 dark:text-gray-400">Amount</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-500 dark:text-gray-400">Date</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-500 dark:text-gray-400">Status</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-500 dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <div className="text-4xl mb-2">📭</div>
                        <p>No entries found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((t) => (
                      <tr key={t.id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4">
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            t.type === "money" ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"
                          }`}>
                            {t.type === "money" ? "💰 Money" : "🍱 Tiffin"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{t.category}</td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{t.description}</p>
                            {t.tiffinItem && (
                              <p className="text-xs text-gray-400">🍱 {t.tiffinItem}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {t.type === "money" ? (
                            <span className="font-bold text-red-500">৳{t.amount}</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-gray-500 dark:text-gray-400 text-xs">
                          {t.date} <br />
                          <span className="text-gray-400">{t.time}</span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleStatus(t.id)}
                            className={`text-xs font-bold px-2 py-1 rounded-full transition-colors ${
                              t.status === "verified"
                                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                : "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                            }`}
                          >
                            {t.status === "verified" ? "✅ Verified" : "⏳ Pending"}
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => deleteTransaction(t.id)}
                            className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-white/10 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <span>Total: {filteredTransactions.length} entries</span>
              <div className="flex gap-4">
                <span>💰 ৳{totalMoney}</span>
                <span>🍱 {totalTiffins}</span>
              </div>
            </div>
          </div>
        )}

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 max-w-md w-full border border-gray-200 dark:border-white/10 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-gray-900 dark:text-white">Add Entry</h3>
                <button onClick={() => setShowAddModal(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10">
                  <XCircle className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setNewEntry({ ...newEntry, type: "money" })}
                      className={`p-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                        newEntry.type === "money"
                          ? "text-white shadow-lg"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                      }`}
                      style={{
                        background: newEntry.type === "money"
                          ? 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)'
                          : 'rgba(112,48,239,0.05)',
                        border: newEntry.type === "money"
                          ? 'none'
                          : '1px solid rgba(112,48,239,0.1)',
                      }}
                    >
                      💰 Money
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewEntry({ ...newEntry, type: "tiffin" })}
                      className={`p-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                        newEntry.type === "tiffin"
                          ? "text-white shadow-lg"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                      }`}
                      style={{
                        background: newEntry.type === "tiffin"
                          ? 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)'
                          : 'rgba(112,48,239,0.05)',
                        border: newEntry.type === "tiffin"
                          ? 'none'
                          : '1px solid rgba(112,48,239,0.1)',
                      }}
                    >
                      🍱 Tiffin
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={newEntry.category}
                    onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
                  >
                    {newEntry.type === "money" ? (
                      <>
                        <option value="Washroom Toll">🚻 Washroom Toll</option>
                        <option value="Quality Tax">📦 Quality Tax</option>
                        <option value="Other Bribe">💵 Other Bribe</option>
                      </>
                    ) : (
                      <>
                        <option value="Stolen Food">🍱 Stolen Food</option>
                        <option value="Quality Tax">📦 Quality Tax (Tiffin)</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newEntry.description}
                    onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                    placeholder="What happened?"
                    className="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
                    required
                  />
                </div>

                {newEntry.type === "money" && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      Amount (Taka)
                    </label>
                    <input
                      type="number"
                      value={newEntry.amount}
                      onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
                      placeholder="Enter amount"
                      className="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
                      required
                    />
                  </div>
                )}

                {newEntry.type === "tiffin" && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      Tiffin Item
                    </label>
                    <input
                      type="text"
                      value={newEntry.tiffinItem}
                      onChange={(e) => setNewEntry({ ...newEntry, tiffinItem: e.target.value })}
                      placeholder="What was stolen?"
                      className="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
                      required
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newEntry.date}
                      onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      Time
                    </label>
                    <input
                      type="time"
                      value={newEntry.time}
                      onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Status
                  </label>
                  <select
                    value={newEntry.status}
                    onChange={(e) => setNewEntry({ ...newEntry, status: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-purple-500"
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="verified">✅ Verified</option>
                  </select>
                </div>

                <button
                  onClick={addTransaction}
                  className="w-full rounded-xl py-3 font-bold text-white text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                    boxShadow: '0 4px 20px rgba(112,48,239,0.3)',
                  }}
                >
                  Add Entry
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}