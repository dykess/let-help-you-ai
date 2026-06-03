import { useState } from "react";
import { TeamStats } from "../../types/prediction";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Swords } from "lucide-react";

interface MatchFormProps {
  onPredict: (home: TeamStats, away: TeamStats) => void;
}

export function MatchForm({ onPredict }: MatchFormProps) {
  const [homeTeam, setHomeTeam] = useState<TeamStats>({
    name: "Home Team",
    attackPower: 75,
    defensePower: 70,
    form: 7,
  });

  const [awayTeam, setAwayTeam] = useState<TeamStats>({
    name: "Away Team",
    attackPower: 70,
    defensePower: 75,
    form: 6,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(homeTeam, awayTeam);
  };

  return (
    <Card className="border-border/50 bg-card/50 overflow-hidden">
      <CardHeader className="bg-emerald-500/5 border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Swords className="h-5 w-5 text-emerald-500" />
          Match Configurator
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Home Team */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-emerald-500 font-semibold">Home Team Name</Label>
                <Input 
                  value={homeTeam.name} 
                  onChange={(e) => setHomeTeam({...homeTeam, name: e.target.value})}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Attack Power</Label>
                  <span className="text-xs font-mono bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-400">{homeTeam.attackPower}%</span>
                </div>
                <Slider 
                  value={[homeTeam.attackPower]} 
                  onValueChange={([v]) => setHomeTeam({...homeTeam, attackPower: v})} 
                  max={100} step={1}
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Defense Strength</Label>
                  <span className="text-xs font-mono bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-400">{homeTeam.defensePower}%</span>
                </div>
                <Slider 
                  value={[homeTeam.defensePower]} 
                  onValueChange={([v]) => setHomeTeam({...homeTeam, defensePower: v})} 
                  max={100} step={1}
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Current Form</Label>
                  <span className="text-xs font-mono bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-400">{homeTeam.form}/10</span>
                </div>
                <Slider 
                  value={[homeTeam.form]} 
                  onValueChange={([v]) => setHomeTeam({...homeTeam, form: v})} 
                  max={10} step={1}
                />
              </div>
            </div>

            {/* Away Team */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-amber-500 font-semibold">Away Team Name</Label>
                <Input 
                  value={awayTeam.name} 
                  onChange={(e) => setAwayTeam({...awayTeam, name: e.target.value})}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Attack Power</Label>
                  <span className="text-xs font-mono bg-amber-500/20 px-2 py-0.5 rounded text-amber-400">{awayTeam.attackPower}%</span>
                </div>
                <Slider 
                  value={[awayTeam.attackPower]} 
                  onValueChange={([v]) => setAwayTeam({...awayTeam, attackPower: v})} 
                  max={100} step={1}
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Defense Strength</Label>
                  <span className="text-xs font-mono bg-amber-500/20 px-2 py-0.5 rounded text-amber-400">{awayTeam.defensePower}%</span>
                </div>
                <Slider 
                  value={[awayTeam.defensePower]} 
                  onValueChange={([v]) => setAwayTeam({...awayTeam, defensePower: v})} 
                  max={100} step={1}
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Current Form</Label>
                  <span className="text-xs font-mono bg-amber-500/20 px-2 py-0.5 rounded text-amber-400">{awayTeam.form}/10</span>
                </div>
                <Slider 
                  value={[awayTeam.form]} 
                  onValueChange={([v]) => setAwayTeam({...awayTeam, form: v})} 
                  max={10} step={1}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white h-12 text-lg font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.98]">
            Generate Prediction
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}