import { useState } from "react";
import {
  BookOpen,
  Sparkles,
  Send,
  Clock,
  CheckCircle,
  Target,
  Award,
  Brain,
  FileText,
  Download,
  Copy,
  Share2,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SyllabusAI() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const sampleSyllabus = `Chapter 1: Introduction to Biology (20 pages)
Chapter 2: Cell Structure (15 pages)
Chapter 3: Cell Division (12 pages)
Chapter 4: Genetics (18 pages)
Chapter 5: Evolution (22 pages)
Chapter 6: Ecology (16 pages)
Chapter 7: Human Anatomy (25 pages)
Chapter 8: Physiology (20 pages)
Chapter 9: Biotechnology (14 pages)
Chapter 10: Environmental Science (18 pages)`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError("Please paste the syllabus text");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      // Mock AI processing - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResult({
        summary: "📚 Here's your simplified syllabus for Biology (Chapters 1-10)",
        topics: [
          { name: "Cell Biology", chapters: "1-3", priority: "High", duration: "3 days" },
          { name: "Genetics & Evolution", chapters: "4-5", priority: "High", duration: "4 days" },
          { name: "Ecology & Environment", chapters: "6, 10", priority: "Medium", duration: "3 days" },
          { name: "Human Anatomy", chapters: "7-8", priority: "High", duration: "4 days" },
          { name: "Biotech & Physiology", chapters: "9", priority: "Medium", duration: "2 days" },
        ],
        studyPlan: [
          { day: "Day 1-3", focus: "Cell Biology (Ch 1-3)", tasks: "Read, make notes, practice diagrams" },
          { day: "Day 4-7", focus: "Genetics & Evolution (Ch 4-5)", tasks: "Solve problems, watch videos" },
          { day: "Day 8-10", focus: "Ecology (Ch 6,10)", tasks: "Environmental case studies" },
          { day: "Day 11-14", focus: "Human Anatomy (Ch 7-8)", tasks: "Memorize systems, draw diagrams" },
          { day: "Day 15-16", focus: "Biotech (Ch 9)", tasks: "Quick revision, practice MCQs" },
        ],
        totalChapters: 10,
        estimatedHours: 25,
        difficulty: "Medium-High",
        examReady: true,
      });
    } catch (err) {
      setError("Failed to process syllabus. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f8] dark:bg-[#090820] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-20 px-4 md:px-6 max-w-5xl mx-auto w-full pb-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
              Syllabus AI Summarizer
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AI-powered tool to simplify Kuddus's ridiculous syllabus demands
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                    Paste Kuddus's Syllabus Text
                  </label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste the long syllabus text here..."
                    rows="6"
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                  />
                </div>

                <div className="flex gap-3 mt-4 flex-wrap">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 flex items-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #7030ef 0%, #db1fff 100%)',
                      boxShadow: '0 4px 20px rgba(112,48,239,0.3)',
                    }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Generate Summary
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setInput(sampleSyllabus)}
                    className="px-4 py-3 rounded-xl font-bold text-sm text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    Try Sample
                  </button>
                  <button
                    type="button"
                    onClick={() => setInput("")}
                    className="px-4 py-3 rounded-xl font-bold text-sm text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </form>

              {error && (
                <div className="mt-4 p-3 rounded-xl text-sm font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                  {error}
                </div>
              )}
            </div>

            {/* Results */}
            {result && (
              <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10 animate-fade-up">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    AI Generated Summary
                  </h3>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" title="Copy">
                      <Copy className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" title="Download">
                      <Download className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" title="Share">
                      <Share2 className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{result.summary}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Chapters", value: result.totalChapters, icon: BookOpen },
                    { label: "Study Hours", value: result.estimatedHours, icon: Clock },
                    { label: "Difficulty", value: result.difficulty, icon: Target },
                  ].map((stat) => (
                    <div key={stat.label} className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 text-center">
                      <stat.icon className="h-4 w-4 mx-auto text-purple-500 mb-1" />
                      <p className="text-lg font-black text-purple-500">{stat.value}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {result.examReady && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 mb-4">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      ✅ Exam Ready! Simplified syllabus is prepared.
                    </p>
                  </div>
                )}

                {/* Topics */}
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">📚 Topics to Cover</h4>
                <div className="space-y-2 mb-4">
                  {result.topics.map((topic, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-purple-50 dark:hover:bg-purple-500/5 transition-colors">
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{topic.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Chapters {topic.chapters}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          topic.priority === 'High' ? 'bg-red-500/10 text-red-500' :
                          topic.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-green-500/10 text-green-500'
                        }`}>
                          {topic.priority}
                        </span>
                        <span className="text-xs text-gray-400">{topic.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Study Plan */}
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">📅 Study Plan</h4>
                <div className="space-y-2">
                  {result.studyPlan.map((plan, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-colors">
                      <div className="p-1.5 rounded-lg bg-blue-500/10 mt-0.5">
                        <Clock className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{plan.day}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{plan.focus}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{plan.tasks}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10 flex justify-between items-center">
                  <span className="text-xs text-gray-400">Powered by AI</span>
                  <button className="text-xs font-medium text-purple-500 hover:underline flex items-center gap-1">
                    Download Plan <Download className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">📋 Features</h3>
              <div className="space-y-3">
                {[
                  { icon: Brain, label: "AI Summarization", desc: "Simplify complex syllabus" },
                  { icon: Target, label: "Priority Topics", desc: "Focus on important chapters" },
                  { icon: Clock, label: "Study Planner", desc: "Personalized schedule" },
                  { icon: Award, label: "Exam Ready", desc: "Confidence booster" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <div className="p-1.5 rounded-lg bg-purple-500/10 mt-0.5">
                      <item.icon className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">💡 Pro Tip</h3>
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 border border-blue-500/20">
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">📖 Smart Study</p>
                <p className="text-xs text-blue-600 dark:text-blue-400/80 mt-1">
                  Focus on High priority topics first. Use the study plan to stay on track.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0d0a2a] rounded-2xl p-6 border border-gray-200 dark:border-white/10">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">📊 Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Total Chapters</span>
                  <span className="font-bold text-purple-500">10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">High Priority</span>
                  <span className="font-bold text-red-500">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Study Hours</span>
                  <span className="font-bold text-blue-500">25</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-white/10 mt-2">
                  <div className="h-1.5 rounded-full" style={{ width: '70%', background: 'linear-gradient(135deg, #7030ef, #db1fff)' }} />
                </div>
                <p className="text-xs text-center text-gray-400">70% Ready</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}