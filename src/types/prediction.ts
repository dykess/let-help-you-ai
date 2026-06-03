export interface TeamStats {
  name: string;
  attackPower: number; // 1-100
  defensePower: number; // 1-100
  form: number; // 1-10 (recent performance)
}

export interface PredictionResult {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeProb: number;
  drawProb: number;
  awayProb: number;
  predictedHomeScore: number;
  predictedAwayScore: number;
  totalGoals: number;
  timestamp: number;
}