import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#05070a] text-slate-200 selection:bg-indigo-500/30">
      
      {/* AI Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Nav Placeholder */}
      <nav className="relative z-20 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Spend.AI
        </div>
        <div className="hidden md:flex gap-8 text-sm text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Security</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <button className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-all">
          Log In
        </button>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 pt-20 pb-32 px-6 text-center max-w-5xl mx-auto">
        
        {/* AI Pulse Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Powered by GPT-4o
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8">
          Master your money <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
            with Artificial Intelligence.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          Stop manual logging. Upload a receipt, and our AI instantly categorizes, 
          tracks, and predicts your future spending patterns.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
          <button className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:-translate-y-1">
            Start Tracking Free
          </button>
          <button className="w-full sm:w-auto px-10 py-4 bg-slate-900 border border-slate-800 text-slate-300 font-bold rounded-2xl hover:bg-slate-800 transition-all">
            Watch Demo
          </button>
        </div>

        {/* Feature Preview Card (The "Hook") */}
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-[#0d1117] border border-white/10 rounded-[2.2rem] p-6 shadow-2xl overflow-hidden">
            
            {/* Mock AI Categorization Interface */}
            <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-6">
              <div className="text-left">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Latest Scan</p>
                <p className="text-lg font-semibold">Starbucks Coffee — $12.50</p>
              </div>
              <div className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
                AI CATEGORIZED: FOOD & DRINK
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-xl bg-white/5">
                <p className="text-[10px] text-slate-500 mb-1">MONTHLY SAVINGS</p>
                <p className="text-xl font-bold text-emerald-400">+$420.00</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <p className="text-[10px] text-slate-500 mb-1">AI PREDICTION</p>
                <p className="text-xl font-bold text-indigo-400">Low Risk</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-indigo-500/30">
                <p className="text-[10px] text-indigo-400 font-bold mb-1">AI INSIGHT</p>
                <p className="text-xs italic text-slate-300">"You spend 15% more on Fridays. Want to set a limit?"</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Elements Background Decoration */}
      <div className="absolute top-1/2 left-10 opacity-20 hidden lg:block animate-bounce">
        <div className="p-4 rounded-xl bg-indigo-500 text-white shadow-xl shadow-indigo-500/50 text-2xl">📊</div>
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 hidden lg:block animate-pulse">
        <div className="p-4 rounded-xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/50 text-2xl">🤖</div>
      </div>
    </div>
  );
}