import { useState, useEffect } from "react";
import { PredictionResult } from "../types/prediction";

export function usePredictions() {
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("football-predictions");
    if (saved) {
      try {
        setPredictions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse predictions from localStorage", e);
      }
    }
  }, []);

  const addPrediction = (prediction: PredictionResult) => {
    const newPredictions = [prediction, ...predictions].slice(0, 20); // Keep last 20
    setPredictions(newPredictions);
    localStorage.setItem("football-predictions", JSON.stringify(newPredictions));
  };

  const clearPredictions = () => {
    setPredictions([]);
    localStorage.removeItem("football-predictions");
  };

  return { predictions, addPrediction, clearPredictions };
}