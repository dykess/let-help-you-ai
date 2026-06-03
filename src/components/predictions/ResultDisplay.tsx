import { PredictionResult } from "../../types/prediction";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { TrendingUp, Target, Percent } from "lucide-react";

interface ResultDisplayProps {
  result: PredictionResult;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Score Prediction */}
      <Card className="border-emerald-500/30 bg-emerald-500/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4">
           <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">AI PREDICTION</Badge>
        </div>
        <CardContent className="pt-10 pb-8 text-center">
          <div className="flex items-center justify-around">
            <div className="flex-1 text-center">
              <h3 className="text-xl font-bold mb-2">{result.homeTeam}</h3>
              <p className="text-sm text-muted-foreground">HOME</p>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="text-6xl font-black tracking-tighter flex items-center gap-4">
                <span className="text-emerald-500">{result.predictedHomeScore}</span>
                <span className="text-muted-foreground/30">-</span>
                <span className="text-amber-500">{result.predictedAwayScore}</span>
              </div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                <Target className="h-3 w-3" /> Expected Score
              </p>
            </div>

            <div className="flex-1 text-center">
              <h3 className="text-xl font-bold mb-2">{result.awayTeam}</h3>
              <p className="text-sm text-muted-foreground">AWAY</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Probabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProbabilityCard 
          label="Home Win" 
          value={result.homeProb} 
          color="emerald" 
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <ProbabilityCard 
          label="Draw" 
          value={result.drawProb} 
          color="slate" 
          icon={<Percent className="h-4 w-4" />}
        />
        <ProbabilityCard 
          label="Away Win" 
          value={result.awayProb} 
          color="amber" 
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      {/* Over/Under Section */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">Predicted Total Goals</p>
              <p className="text-2xl font-bold">{result.totalGoals}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Target className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">Over 2.5 Prediction</p>
              <p className="text-2xl font-bold">{result.totalGoals >= 3 ? "HIGH" : "LOW"}</p>
            </div>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${result.totalGoals >= 3 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
              <TrendingUp className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

function ProbabilityCard({ label, value, color, icon }: { label: string, value: number, color: string, icon: React.ReactNode }) {
  const colorMap: Record<string, string> = {
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    slate: "text-slate-400 bg-slate-400/10 border-slate-400/20",
  };

  return (
    <Card className="bg-card/50 border-border/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
            {icon} {label}
          </span>
          <Badge className={colorMap[color]}>{value}%</Badge>
        </div>
        <div className="h-2 w-full bg-border/30 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${color === 'emerald' ? 'bg-emerald-500' : color === 'amber' ? 'bg-amber-500' : 'bg-slate-400'}`}
          />
        </div>
      </CardContent>
    </Card>
  );
}