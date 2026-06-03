import { TeamStats, PredictionResult } from "../types/prediction";

/**
 * A simplified Poisson-inspired distribution model for football predictions.
 * It calculates expected goals based on relative attack/defense strengths.
 */
export function predictMatch(home: TeamStats, away: TeamStats): PredictionResult {
  // Base goals for average match
  const BASE_GOALS = 1.35;

  // Calculate expected goals for home team
  // Home advantage usually adds about 10-15%
  const homeAdvantage = 1.15;
  const homeExpGoals = (home.attackPower / away.defensePower) * (home.form / 5) * BASE_GOALS * homeAdvantage;

  // Calculate expected goals for away team
  const awayExpGoals = (away.attackPower / home.defensePower) * (away.form / 5) * BASE_GOALS;

  // Rounding for predicted score
  const homeScore = Math.round(homeExpGoals);
  const awayScore = Math.round(awayExpGoals);

  // Probability calculations (simplified)
  const totalWeight = homeExpGoals + awayExpGoals;
  const drawBase = 0.25; // Base 25% chance of a draw in football
  
  // Adjust probabilities based on expected goals difference
  const diff = homeExpGoals - awayExpGoals;
  let homeProb, awayProb, drawProb;

  if (Math.abs(diff) < 0.2) {
    // Very close match
    drawProb = 0.35;
    homeProb = 0.33;
    awayProb = 0.32;
  } else {
    // One team is favored
    drawProb = drawBase;
    const remainingProb = 1 - drawProb;
    const ratio = Math.exp(diff) / (Math.exp(diff) + 1);
    homeProb = remainingProb * ratio;
    awayProb = remainingProb * (1 - ratio);
  }

  return {
    id: crypto.randomUUID(),
    homeTeam: home.name,
    awayTeam: away.name,
    homeProb: Math.round(homeProb * 100),
    drawProb: Math.round(drawProb * 100),
    awayProb: Math.round(awayProb * 100),
    predictedHomeScore: homeScore,
    predictedAwayScore: awayScore,
    totalGoals: homeScore + awayScore,
    timestamp: Date.now(),
  };
}