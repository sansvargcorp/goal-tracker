import React, { useState } from 'react';
import { Target, CheckSquare, Mail, DollarSign, Plus, Trash2, Calendar, Youtube, Sparkles, TrendingUp, Moon, Brain, Zap } from 'lucide-react';

export default function SansVargAIPowered() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [aiThinking, setAiThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [checkedTasks, setCheckedTasks] = useState({});

  // Simulate AI processing
  const processGoalWithAI = async (goalText) => {
    setAiThinking(true);
    
    // Call Claude API to analyze the goal
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Analyze this goal and provide: 
1. A brief motivational insight (2 sentences max)
2. 3-5 specific, actionable daily tasks to achieve this goal
3. 3 YouTube search keywords that would help with this goal

Goal: "${goalText}"

Format your response as JSON:
{
  "insight": "...",
  "tasks": ["task1", "task2", "task3"],
  "youtubeKeywords": ["keyword1", "keyword2", "keyword3"]
}`
            }
          ],
        })
      });

      const data = await response.json();
      const aiText = data.content.find(item => item.type === "text")?.text || "";
      
      // Extract JSON from response
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setAiThinking(false);
        return parsed;
      }
    } catch (error) {
      console.error("AI processing error:", error);
    }
    
    setAiThinking(false);
    // Fallback if API fails
    return {
      insight: "This is an excellent goal! Breaking it down into daily actions will help you build momentum.",
      tasks: [
        "Take one focused action toward this goal",
        "Research best practices and strategies",
        "Track your progress and adjust approach"
      ],
      youtubeKeywords: extractKeywords(goalText)
    };
  };

  const extractKeywords = (text) => {
    const words = text.toLowerCase().split(' ').filter(w => w.length > 3);
    return words.slice(0, 3).map(w => w + " tutorial");
  };

  const addGoal = async () => {
    if (newGoal.trim()) {
      const aiAnalysis = await processGoalWithAI(newGoal);
      
      setGoals([...goals, {
        id: Date.now(),
        text: newGoal,
        insight: aiAnalysis.insight,
        tasks: aiAnalysis.tasks,
        youtubeKeywords: aiAnalysis.youtubeKeywords,
        createdAt: new Date()
      }]);
      setNewGoal('');
    }
  };

  const toggleTask = (goalId, taskIndex) => {
    const key = `${goalId}-${taskIndex}`;
    setCheckedTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const screens = {
    home: (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        {/* Header */}
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-wide text-white uppercase">SansVarg</h1>
                  <p className="text-xs text-indigo-400 tracking-widest uppercase">AI Goal System</p>
                </div>
              </div>
              <nav className="flex gap-8 text-sm font-semibold tracking-wide uppercase">
                <button onClick={() => setCurrentScreen('goals')} className="text-slate-400 hover:text-indigo-400 transition-colors">Goals</button>
                <button onClick={() => setCurrentScreen('checklist')} className="text-slate-400 hover:text-indigo-400 transition-colors">Dashboard</button>
                <button onClick={() => setCurrentScreen('contact')} className="text-slate-400 hover:text-indigo-400 transition-colors">Contact</button>
                <button onClick={() => setCurrentScreen('donate')} className="text-slate-400 hover:text-indigo-400 transition-colors">Support</button>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 px-6 py-2 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400 tracking-widest uppercase">100% Free • AI-Powered</span>
            </div>
            
            <h2 className="text-7xl font-black text-white mb-6 tracking-tight leading-tight">
              HIGH-PERFORMANCE<br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">GOAL EXECUTION</span>
            </h2>
            
            <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform ambitions into action. AI-driven task breakdown, personalized insights, and curated learning resources. Built for peak performers.
            </p>
            
            <button 
              onClick={() => setCurrentScreen('goals')}
              className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-5 rounded-2xl text-lg font-black tracking-wide uppercase hover:from-indigo-500 hover:to-purple-500 transition-all shadow-2xl shadow-indigo-500/30"
            >
              <span className="relative z-10">Initialize System</span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-24">
            <div className="group relative bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 p-8 rounded-3xl hover:border-indigo-500/50 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-6">
                  <Brain className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight uppercase">AI Analysis</h3>
                <p className="text-slate-400 leading-relaxed">Claude AI breaks down your goals into precise, actionable daily tasks tailored to your objective.</p>
              </div>
            </div>

            <div className="group relative bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 p-8 rounded-3xl hover:border-indigo-500/50 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6">
                  <Youtube className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight uppercase">Smart Resources</h3>
                <p className="text-slate-400 leading-relaxed">AI-curated YouTube recommendations based on your goal keywords for accelerated learning.</p>
              </div>
            </div>

            <div className="group relative bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 p-8 rounded-3xl hover:border-indigo-500/50 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-teal-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight uppercase">Data-Driven</h3>
                <p className="text-slate-400 leading-relaxed">Track completion metrics and optimize your execution strategy with real-time insights.</p>
              </div>
            </div>
          </div>

          {/* Stats Display */}
          <div className="mt-24 grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text mb-2">100%</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">Free Forever</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-10 h-10 text-teal-400" />AI
              </div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">Powered Insights</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">24/7</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">Always Available</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-xl py-12 mt-24">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <p className="text-slate-600 text-sm tracking-wide">BUILT WITH PRECISION BY <span className="text-indigo-400 font-bold">SANSVARG CORPORATION</span></p>
          </div>
        </footer>
      </div>
    ),

    goals: (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-black tracking-wide text-white uppercase">Goal Configuration</h1>
              </div>
              <nav className="flex gap-8 text-sm font-semibold tracking-wide uppercase">
                <button onClick={() => setCurrentScreen('home')} className="text-slate-400 hover:text-indigo-400 transition-colors">Home</button>
                <button onClick={() => setCurrentScreen('checklist')} className="text-slate-400 hover:text-indigo-400 transition-colors">Dashboard</button>
                <button onClick={() => setCurrentScreen('contact')} className="text-slate-400 hover:text-indigo-400 transition-colors">Contact</button>
                <button onClick={() => setCurrentScreen('donate')} className="text-slate-400 hover:text-indigo-400 transition-colors">Support</button>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-10 mb-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-indigo-400" />
                <h2 className="text-3xl font-black text-white tracking-tight uppercase">Create New Goal</h2>
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="Define your objective... (e.g., Master machine learning, Run a marathon)"
                  className="flex-1 px-6 py-4 bg-slate-950/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium"
                  onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                  disabled={aiThinking}
                />
                <button 
                  onClick={addGoal}
                  disabled={aiThinking}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-black tracking-wide uppercase hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center gap-3 disabled:opacity-50"
                >
                  {aiThinking ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" /> Add Goal
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {goals.length === 0 ? (
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-20 text-center">
                <Target className="w-20 h-20 text-slate-700 mx-auto mb-6" />
                <h3 className="text-3xl font-black text-slate-400 mb-3 uppercase tracking-tight">No Goals Configured</h3>
                <p className="text-slate-600 tracking-wide">Initialize your first goal above to activate the AI system</p>
              </div>
            ) : (
              goals.map(goal => (
                <div key={goal.id} className="relative group bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 hover:border-indigo-500/50 transition-all overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                          <h3 className="text-2xl font-black text-white tracking-tight uppercase">{goal.text}</h3>
                        </div>
                        <div className="flex items-start gap-3 bg-slate-950/50 border border-indigo-500/20 rounded-2xl p-4 mb-4">
                          <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-1" />
                          <p className="text-indigo-300 text-sm leading-relaxed italic">{goal.insight}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setGoals(goals.filter(g => g.id !== goal.id))}
                        className="text-red-500 hover:text-red-400 transition-colors ml-4"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3">AI-Generated Tasks</h4>
                      <div className="space-y-2">
                        {goal.tasks.map((task, idx) => (
                          <div key={idx} className="bg-slate-950/30 border border-slate-800/50 rounded-xl p-3 text-slate-300 text-sm">
                            • {task}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Youtube className="w-4 h-4" /> Learning Resources
                      </h4>
                      <div className="flex gap-3 flex-wrap">
                        {goal.youtubeKeywords.map((keyword, idx) => (
                          <a
                            key={idx}
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-xl text-red-400 text-xs font-bold uppercase tracking-wide hover:bg-red-600/30 transition-all flex items-center gap-2"
                          >
                            <Youtube className="w-3 h-3" />
                            {keyword}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {goals.length > 0 && (
            <button 
              onClick={() => setCurrentScreen('checklist')}
              className="mt-12 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-5 rounded-2xl font-black tracking-wide uppercase hover:from-indigo-500 hover:to-purple-500 transition-all shadow-2xl shadow-indigo-500/20"
            >
              Access Daily Dashboard →
            </button>
          )}
        </div>
      </div>
    ),

    checklist: (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <CheckSquare className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-wide text-white uppercase">Performance Dashboard</h1>
                  <p className="text-xs text-indigo-400 tracking-widest uppercase">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
              <nav className="flex gap-8 text-sm font-semibold tracking-wide uppercase">
                <button onClick={() => setCurrentScreen('home')} className="text-slate-400 hover:text-indigo-400 transition-colors">Home</button>
                <button onClick={() => setCurrentScreen('goals')} className="text-slate-400 hover:text-indigo-400 transition-colors">Goals</button>
                <button onClick={() => setCurrentScreen('contact')} className="text-slate-400 hover:text-indigo-400 transition-colors">Contact</button>
                <button onClick={() => setCurrentScreen('donate')} className="text-slate-400 hover:text-indigo-400 transition-colors">Support</button>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-8 py-16">
          {/* Performance Metrics */}
          {goals.length > 0 && (
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-6 text-center">
                <div className="text-4xl font-black text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text mb-2">
                  {goals.length}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Active Goals</div>
              </div>
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-6 text-center">
                <div className="text-4xl font-black text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text mb-2">
                  {goals.reduce((sum, g) => sum + g.tasks.length, 0)}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Daily Tasks</div>
              </div>
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-6 text-center">
                <div className="text-4xl font-black text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text mb-2">
                  {Math.round((Object.keys(checkedTasks).filter(k => checkedTasks[k]).length / Math.max(goals.reduce((sum, g) => sum + g.tasks.length, 0), 1)) * 100)}%
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Completion Rate</div>
              </div>
            </div>
          )}

          {goals.length === 0 ? (
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-20 text-center">
              <Moon className="w-20 h-20 text-slate-700 mx-auto mb-6" />
              <h3 className="text-3xl font-black text-slate-400 mb-3 uppercase tracking-tight">System Idle</h3>
              <p className="text-slate-600 mb-8 tracking-wide">Configure goals to populate your performance dashboard</p>
              <button 
                onClick={() => setCurrentScreen('goals')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-black tracking-wide uppercase hover:from-indigo-500 hover:to-purple-500 transition-all"
              >
                Initialize Goals
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {goals.map(goal => (
                <div key={goal.id} className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 overflow-hidden group hover:border-indigo-500/50 transition-all">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <Zap className="w-5 h-5 text-indigo-400" />
                      <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest">Goal: {goal.text}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {goal.tasks.map((task, idx) => {
                        const taskKey = `${goal.id}-${idx}`;
                        const isChecked = checkedTasks[taskKey] || false;
                        
                        return (
                          <label 
                            key={idx}
                            className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
                              isChecked 
                                ? 'bg-emerald-500/10 border border-emerald-500/30' 
                                : 'bg-slate-950/30 border border-slate-800/50 hover:bg-slate-950/50'
                            }`}
                          >
                            <input 
                              type="checkbox" 
                              checked={isChecked}
                              onChange={() => toggleTask(goal.id, idx)}
                              className="w-6 h-6 rounded-lg bg-slate-900 border-2 border-slate-700 checked:bg-gradient-to-br checked:from-emerald-500 checked:to-teal-500 checked:border-transparent focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer" 
                            />
                            <span className={`flex-1 font-medium transition-all ${
                              isChecked ? 'text-emerald-400 line-through' : 'text-slate-300'
                            }`}>
                              {task}
                            </span>
                            {isChecked && <CheckSquare className="w-5 h-5 text-emerald-400" />}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    ),

    contact: (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-black tracking-wide text-white uppercase">Contact System</h1>
              </div>
              <nav className="flex gap-8 text-sm font-semibold tracking-wide uppercase">
                <button onClick={() => setCurrentScreen('home')} className="text-slate-400 hover:text-indigo-400 transition-colors">Home</button>
                <button onClick={() => setCurrentScreen('goals')} className="text-slate-400 hover:text-indigo-400 transition-colors">Goals</button>
                <button onClick={() => setCurrentScreen('checklist')} className="text-slate-400 hover:text-indigo-400 transition-colors">Dashboard</button>
                <button onClick={() => setCurrentScreen('donate')} className="text-slate-400 hover:text-indigo-400 transition-colors">Support</button>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-8 py-20">
          <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-8">
                <Mail className="w-10 h-10 text-indigo-400" />
              </div>
              
              <h2 className="text-4xl font-black text-white mb-4 tracking-tight uppercase">Initiate Contact</h2>
              <p className="text-slate-400 mb-12 text-lg leading-relaxed">
                Questions, feedback, or technical support? Our team is ready to assist.
              </p>
              
              <div className="bg-slate-950/50 border border-indigo-500/30 rounded-2xl p-8 mb-8">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-3">Primary Contact Channel</p>
                <a 
                  href="mailto:corporationsansvarg@gmail.com" 
                  className="text-3xl font-black text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text hover:from-indigo-300 hover:to-purple-300 transition-all"
                >
                  corporationsansvarg@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3 justify-center text-slate-600">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-sm tracking-wide uppercase font-bold">Response Time: 24-48 Hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    donate: (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-black tracking-wide text-white uppercase">Support System</h1>
              </div>
              <nav className="flex gap-8 text-sm font-semibold tracking-wide uppercase">
                <button onClick={() => setCurrentScreen('home')} className="text-slate-400 hover:text-indigo-400 transition-colors">Home</button>
                <button onClick={() => setCurrentScreen('goals')} className="text-slate-400 hover:text-indigo-400 transition-colors">Goals</button>
                <button onClick={() => setCurrentScreen('checklist')} className="text-slate-400 hover:text-indigo-400 transition-colors">Dashboard</button>
                <button onClick={() => setCurrentScreen('contact')} className="text-slate-400 hover:text-indigo-400 transition-colors">Contact</button>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-8 py-20">
          <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-8">
                <DollarSign className="w-10 h-10 text-emerald-400" />
              </div>
              
              <h2 className="text-4xl font-black text-white mb-4 tracking-tight uppercase">Sustain The Mission</h2>
              <p className="text-slate-400 mb-12 text-lg leading-relaxed max-w-2xl mx-auto">
                This AI-powered goal execution system remains <span className="text-emerald-400 font-bold">100% free</span> for all users. 
                Your voluntary contribution helps us maintain infrastructure and accelerate development.
              </p>
              
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-2xl p-10 mb-8">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-6">Secure Payment Gateway</p>
                <a 
                  href="https://paypal.me/sansvargscorp" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-12 py-5 rounded-2xl text-lg font-black tracking-wide uppercase hover:from-emerald-500 hover:to-teal-500 transition-all shadow-2xl shadow-emerald-500/20"
                >
                  Contribute Now
                </a>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-slate-600 tracking-wide uppercase font-bold">100% Voluntary • 100% Appreciated</p>
                <p className="text-xs text-slate-700">SansVarg Corporation is committed to accessible high-performance tools for everyone</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-slate-950 to-indigo-950 text-white px-6 py-3 text-center text-sm border-b border-indigo-500/30">
        <span className="font-black tracking-widest uppercase">Interactive AI Wireframe</span>
        <span className="mx-3 text-indigo-500">•</span>
        <span className="text-slate-400">Click navigation to explore • AI-powered goal breakdown • YouTube learning resources</span>
      </div>
      {screens[currentScreen]}
    </div>
  );
}