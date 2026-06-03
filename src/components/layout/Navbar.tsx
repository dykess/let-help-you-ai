import { Trophy, History, LayoutDashboard } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Trophy className="h-8 w-8 text-emerald-500" />
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              GoalPulse
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-foreground hover:text-emerald-500 transition-colors flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-emerald-500 transition-colors flex items-center gap-2">
              <History className="h-4 w-4" />
              History
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold">
              Live Odds Alpha
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}