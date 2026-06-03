# Football Match Outcome & Goal Prediction App - Implementation Plan

This application allows users to predict the outcome of football matches and the number of goals scored using a statistical approach based on historical performance and team stats.

## Scope Summary
- **Goal**: Build a React-based web application that takes team inputs and predicts match outcomes (Win/Draw/Loss probabilities) and total goals.
- **Data Persistence**: No database. All state will be managed locally in the browser (client-side only).
- **Core Logic**: Use a simplified Poisson distribution or weighted performance algorithm to estimate scores.

## Affected Areas
- **Frontend**: All UI components (Input forms, Result displays, Dashboard).
- **Logic**: Mathematical functions for match prediction.
- **State**: React state and potentially `localStorage` for saving "My Predictions".

## Assumptions & Open Questions
- **Assumption**: We will use "Manual Entry" for team stats (e.g., Attack Power, Defense Power) or provide a pre-defined list of dummy teams to demonstrate functionality.
- **Assumption**: Since there's no server, real-time API integration (like FootyStats or API-Football) is out of scope unless the user provides an API key, but we'll stick to a robust manual tool for now.

## Phases & Deliverables

### Phase 1: Foundation & Layout (frontend_engineer)
- Set up the main application structure.
- Create a dashboard layout with a sidebar for history and a main area for prediction.
- Deliverables: `src/App.tsx` layout, `src/components/layout/Navbar.tsx`, `src/components/layout/Sidebar.tsx`.

### Phase 2: Prediction Logic & Types (frontend_engineer)
- Define TypeScript interfaces for `TeamStats` and `PredictionResult`.
- Implement the `predictMatch` utility function using a weighted scoring model.
- Deliverables: `src/lib/prediction-engine.ts`.

### Phase 3: Core UI Components (frontend_engineer)
- Build the `MatchForm` component: Inputs for Home/Away team names and stats (Offense/Defense rating).
- Build the `PredictionResult` component: Display outcome probabilities and predicted goal counts (e.g., "Over 2.5 goals").
- Deliverables: `src/components/predictions/MatchForm.tsx`, `src/components/predictions/ResultDisplay.tsx`.

### Phase 4: State Management & History (frontend_engineer)
- Implement state to store recent predictions.
- Add `localStorage` persistence so predictions remain after refresh.
- Deliverables: Hook for local storage in `src/hooks/use-predictions.ts`.

### Phase 5: Polishing & UI/UX (quick_fix_engineer)
- Add animations (framer-motion) for result transitions.
- Refine CSS/Tailwind styles for a "Sports/Betting" app aesthetic (dark mode, green/gold accents).
- Fix any layout inconsistencies.

## Execution Constraints
- No Supabase/Database.
- Use shadcn/ui components (already present in `src/components/ui`).
- Strictly client-side.
