# The Sunk Ride

**English** | [中文](README.zh-CN.md)

A behavioral-economics simulator of **shared-bike** choices. The on-screen title is「共享单车实验模拟器」: twenty days of weather, distance, luggage, and time pressure, used to study **overconfidence**, **payment-plan rationality**, and the **sunk-cost effect**.

*The Sunk Ride* names the trap the experiment is built around: a prepaid package that is already spent, yet still pulls you onto the bike.

Repository: <https://github.com/Lynnyyang/The-Sunk-Ride>

---

## What this is

A client-only web app. You set a participant and group, then generate **20 days** of ride / no-ride decisions from a logistic-style probability. Results include a summary (predicted rides \(E\) vs actual rides, overconfidence \(E-A\), tokens, cash payoff) and a day-by-day table that can be exported as CSV.

This is **simulated** data for teaching and design, not field observations.

---

## Design in brief

| Item | Value |
| --- | --- |
| Package (plan A) | 15 tokens |
| Pay-per-ride (plan B) | 1 token per ride |
| Starting endowment | 30 tokens |
| Token-to-cash | 0.5 |
| Break-even | 15 rides |
| Days | 20 scenarios (shuffled) |

**Groups**

1. Standard package — sunk cost is *not* shown each ride (“this ride is free”).
2. Cost-visible package — each ride shows the amortized sunk cost \(15/E\).
3. Control — pay-per-ride only (plan B).

**Hypotheses on the home page:** H1 overconfidence; H2 purchase rationality; H3/H4 sunk cost.

Ride probability starts from \(E/20\), then weather, long distance, time pressure, heavy luggage, and a sunk-cost factor (plan A, groups 1–2) shift it.

---

## Stack

Vite 5, TypeScript, React 18, Tailwind CSS, shadcn/ui. Dev server port **8080**.

---

## Run locally

```bash
git clone https://github.com/Lynnyyang/The-Sunk-Ride.git
cd The-Sunk-Ride
npm install
npm run dev
```

```bash
npm run build
npm run preview
npm run lint
```

No backend, no API keys.

---

## Layout

```
src/
  pages/Index.tsx
  components/SimulationForm.tsx
  components/ResultsDisplay.tsx
  lib/experimentData.ts      # 20 scenarios, prices
  lib/simulationEngine.ts    # ride probability and payoffs
  types/experiment.ts
```

---

## License

[MIT](LICENSE)
