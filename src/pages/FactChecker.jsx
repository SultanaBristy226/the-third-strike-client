import { useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
  Sparkles,
  Brain,
  Target,
  Award,
  Clock,
  TrendingUp,
  BarChart3,
  ChevronRight,
  BookOpen,
  Users,
  Star,
  Zap,
  Flame,
  Crown,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FactChecker() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([
    {
      id: 1,
      claim: "1st Captains don't have to do homework",
      verdict: "false",
      confidence: 95,
      rule: "All students must complete homework regardless of position",
      source: "School Rulebook, Section 3.2",
      date: "2024-01-15",
    },
    {
      id: 2,
      claim: "Students must pay 2 Taka for washroom during free period",
      verdict: "false",
      confidence: 98,
      rule: "Washroom access is free for all students at all times",
      source: "School Rulebook, Section 7.1",
      date: "2024-01-14",
    },
    {
      id: 3,
      claim: "Class captain can assign extra homework to students",
      verdict: "false",
      confidence: 92,
      rule: "Only teachers can assign homework. Captains have no authority.",
      source: "School Rulebook, Section 4.3",
      date: "2024-01-13",
    },
    {
      id: 4,
      claim: "School starts at 9:00 AM every day",
      verdict: "true",
      confidence: 100,
      rule: "School starts at 9:00 AM. Students must be present by 8:45 AM.",
      source: "School Rulebook, Section 1.1",
      date: "2024-01-12",
    },
  ]);

  const fakeRules = [
    "1st Captains don't have to do homework",
    "Students must pay 2 Taka for washroom during free period",
    "Class captain can assign extra homework to students",
    "Tall students must sit in the front row",
    "Captains can skip PT classes",
    "Students can be fined for asking questions",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a claim to check");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      // Mock AI processing - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simple mock logic - in real app this would use semantic search
      const fakeRule = fakeRules.some(rule => 
        query.toLowerCase().includes(rule.toLowerCase().slice(0, 10))
      );

      const verdict = fakeRule ? "false" : "true";
      const confidence = fakeRule ? Math.floor(Math.random() * (95 - 85 + 1)) + 85 : Math.floor(Math.random() * (100 - 90 + 1)) + 90;

      // Find matching rule from history
      const matchedRule = history.find(h => 
        h.claim.toLowerCase().includes(query.toLowerCase().slice(0, 15))
      );

      setResult({
        claim: query,
        verdict: verdict,
        confidence: confidence,
        rule: matchedRule?.rule || "No specific rule found in database. This appears to be a false claim.",
        source: matchedRule?.source || "School Rulebook - General Guidelines",
        explanation: verdict === "false" 
          ? "This claim contradicts official school rules. Kuddus is making up rules to maintain power."
          : "This claim matches official school rules. Kuddus is telling the truth this time.",
        recommendedAction: verdict === "false"
          ? "🚨 Report this to your teacher immediately!"
          : "✅ No action needed. This rule is correct.",
      });
    } catch (err) {
      setError("Failed to process your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getVerdictIcon = (verdict) => {
    return verdict === "true" ? CheckCircle : XCircle;
  };

  const getVerdictColor = (verdict) => {
    return verdict === "true" ? "text-green-500" : "text-red-500";
  };

  const getVerdictBg = (verdict) => {
    return verdict === "true" ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20";
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return "text-green-500";
    if (confidence >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f8] dark:bg-[#090820] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-20 px-4 md:px-6 max-w-6xl mx-auto w-full pb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                  Kuddus Fact Checker
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  🔍 Debunk Kuddus's fake rules instantly
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#0d0a2a] border border-gray-200 dark:border-white/10">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400">FACTS CHECKED</span>
              <span className="text-lg font-black text-purple-500">{history.length}</span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='e.g. "1st Captains don\'t have to do homework"'
                  className="w-full rounded-xl pl-12 pr-4 py-4 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                  boxShadow: '0 4px 20px rgba(112,48,239,0.3)',
                }}
              >
                {isLoading ? (
                  <>
                    <Sparkles className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Check Fact
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3 rounded-xl text-sm font-medium bg-red-500/10 text-red-500 border border-red-500/20">
              {error}
            </div>
          )}

          {/* Quick Suggestions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Try:</span>
            {fakeRules.slice(0, 3).map((rule, i) => (
              <button
                key={i}
                onClick={() => setQuery(rule)}
                className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-colors"
              >
                "{rule.slice(0, 20)}..."
              </button>
            ))}
          </div>
        </div>

        {/* Result Section */}
        {result && (
          <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden mb-8 animate-fade-up">
            {/* Result Header */}
            <div className={`p-6 border-b ${getVerdictBg(result.verdict)}`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${getVerdictBg(result.verdict)}`}>
                  {result.verdict === "true" ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-black ${getVerdictColor(result.verdict)}`}>
                      {result.verdict === "true" ? "✅ TRUE" : "❌ FALSE"}
                    </span>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${getVerdictBg(result.verdict)} ${getVerdictColor(result.verdict)}`}>
                      {result.confidence}% Confidence
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    "{result.claim}"
                  </p>
                </div>
              </div>
            </div>

            {/* Result Body */}
            <div className="p-6 space-y-4">
              {/* Official Rule */}
              <div>
                <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  📖 Official Rule
                </h4>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <p className="text-sm text-gray-800 dark:text-gray-200">{result.rule}</p>
                  <p className="text-xs text-gray-400 mt-1">Source: {result.source}</p>
                </div>
              </div>

              {/* Explanation */}
              <div>
                <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  💡 Explanation
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{result.explanation}</p>
              </div>

              {/* Recommended Action */}
              <div className={`p-4 rounded-xl ${
                result.verdict === "false" 
                  ? "bg-red-500/10 border border-red-500/20" 
                  : "bg-green-500/10 border border-green-500/20"
              }`}>
                <div className="flex items-start gap-3">
                  <AlertCircle className={`h-5 w-5 ${
                    result.verdict === "false" ? "text-red-500" : "text-green-500"
                  } mt-0.5`} />
                  <div>
                    <p className={`text-sm font-bold ${
                      result.verdict === "false" ? "text-red-500" : "text-green-500"
                    }`}>
                      {result.recommendedAction}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Section */}
        <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">📋 Fact Check History</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Previously checked claims</p>
              </div>
              <button className="text-sm font-medium text-purple-500 hover:underline flex items-center gap-1">
                View all <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-white/10">
            {history.map((item) => {
              const Icon = getVerdictIcon(item.verdict);
              return (
                <div key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Icon className={`h-4 w-4 ${getVerdictColor(item.verdict)}`} />
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          "{item.claim}"
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>
                        <span className={`text-xs font-bold ${getConfidenceColor(item.confidence)}`}>
                          {item.confidence}% confidence
                        </span>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-xl text-xs font-bold text-purple-500 border border-purple-500 hover:bg-purple-500 hover:text-white transition-colors">
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: "Facts Checked", value: history.length, icon: Search, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Fake Rules Found", value: history.filter(h => h.verdict === "false").length, icon: XCircle, color: "text-red-500", bg: "bg-red-500/10" },
            { label: "True Rules", value: history.filter(h => h.verdict === "true").length, icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
            { label: "Avg Confidence", value: `${Math.round(history.reduce((sum, h) => sum + h.confidence, 0) / history.length)}%`, icon: Award, color: "text-purple-500", bg: "bg-purple-500/10" },
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
      </main>

      <Footer />
    </div>
  );
}