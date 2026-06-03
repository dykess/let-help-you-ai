import { PredictionResult } from "../../types/prediction";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Trash2, Calendar, Shield } from "lucide-react";

interface HistorySidebarProps {
  predictions: PredictionResult[];
  onClear: () => void;
}

export function HistorySidebar({ predictions, onClear }: HistorySidebarProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
          Recent Analysis
        </h3>
        {predictions.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} className="h-8 text-xs text-muted-foreground hover:text-destructive">
            <Trash2 className="h-3 w-3 mr-1" /> Clear
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {predictions.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-border rounded-lg bg-card/30">
            <p className="text-xs text-muted-foreground">No recent predictions</p>
          </div>
        ) : (
          predictions.map((p) => (
            <Card key={p.id} className="bg-card/30 border-border/50 hover:bg-card/50 transition-colors group">
              <CardContent className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                    <Calendar className="h-3 w-3" />
                    {new Date(p.timestamp).toLocaleDateString()}
                  </div>
                  <Shield className="h-3 w-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold truncate max-w-[80px]">{p.homeTeam}</span>
                  <div className="bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-500">
                    {p.predictedHomeScore} - {p.predictedAwayScore}
                  </div>
                  <span className="text-sm font-bold truncate max-w-[80px] text-right">{p.awayTeam}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 mt-8">
        <p className="text-xs font-bold text-emerald-500 mb-1">PRO TIP</p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          The Poisson distribution algorithm works best when using teams from the same league to ensure stat parity.
        </p>
      </div>
    </div>
  );
}