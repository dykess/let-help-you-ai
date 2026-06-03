import { useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { MatchForm } from "./components/predictions/MatchForm";
import { ResultDisplay } from "./components/predictions/ResultDisplay";
import { HistorySidebar } from "./components/predictions/HistorySidebar";
import { TeamStats, PredictionResult } from "./types/prediction";
import { predictMatch } from "./lib/prediction-engine";
import { usePredictions } from "./hooks/use-predictions";
import { Toaster, toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, BarChart3, Info, Trophy } from "lucide-react";

function App() {
  const [currentResult, setCurrentResult] = useState<PredictionResult | null>(null);
  const { predictions, addPrediction, clearPredictions } = usePredictions();

  const handlePredict = (home: TeamStats, away: TeamStats) => {
    const result = predictMatch(home, away);
    setCurrentResult(result);
    addPrediction(result);
    toast.success("Match prediction generated!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-emerald-500/30">
      <Toaster position="top-center" expand={false} richColors />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-emerald-950 p-8 md:p-12 border border-emerald-500/20 group">
              <div className="absolute inset-0 z-0 opacity-20 transition-transform duration-700 group-hover:scale-110">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/031e5a01-341d-4e8c-8c7d-4476dceed484/hero-bg-aa261d04-1780464812049.webp" 
                  alt="Stadium Background" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                  <Sparkles className="h-3 w-3" /> Powered by Statistical Analysis
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                  Master the Match <br /> 
                  <span className="text-emerald-500">Predict the Score.</span>
                </h1>
                <p className="text-emerald-100/70 text-lg mb-8 leading-relaxed">
                  Our advanced Poisson-based engine calculates precise probabilities for match outcomes and total goals based on team performance metrics.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                    <BarChart3 className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-medium text-white">Win Probabilities</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                    <Info className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-medium text-white">Goal Counts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prediction Interface */}
            <div className="grid grid-cols-1 gap-8">
              <MatchForm onPredict={handlePredict} />
              
              <AnimatePresence mode="wait">
                {currentResult && (
                  <ResultDisplay key={currentResult.id} result={currentResult} />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <HistorySidebar predictions={predictions} onClear={clearPredictions} />
              
              <div className="rounded-2xl overflow-hidden bg-card border border-border group relative">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/031e5a01-341d-4e8c-8c7d-4476dceed484/football-detail-54ebbdcc-1780464812926.webp" 
                  alt="Football Detail" 
                  className="w-full h-40 object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="relative p-6 -mt-12">
                  <h4 className="font-bold mb-2">How it works?</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We analyze Attack Power vs Defense Strength of opposing teams, adjusting for recent form and home-field advantage to simulate thousands of match outcomes.
                  </p>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </main>

      <footer className="border-t border-border mt-20 py-12 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            Built for Football Analysts & Betting Strategy <Trophy className="h-4 w-4" />
          </p>
          <p className="text-[10px] text-muted-foreground/50 mt-4 max-w-lg mx-auto leading-loose">
            Disclaimer: Predictions are based on statistical models and do not guarantee actual results. 
            Sports betting involves risk. Always gamble responsibly.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;