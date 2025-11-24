import { Scenario, DailyRecord, SimulationResult, SimulationParams } from "@/types/experiment";
import { SCENARIOS, PACKAGE_COST, PER_RIDE_COST, INITIAL_ENDOWMENT, TOKEN_RATE } from "./experimentData";

const BAD_WEATHER = ["小雨", "大雨", "雾霾/能见度低", "风大（有风）", "下雨", "阵雨", "小雪或低温", "风大"];

export function generateSimulatedDecisions(
  E_predicted: number,
  chosen_payment_plan: string,
  group: number,
  sensitivity_to_weather: number,
  sensitivity_to_distance: number,
  sensitivity_to_pressure: number,
  sunk_cost_influence: number
): { ride_decisions: number[]; daily_scenarios: Scenario[] } {
  
  const P_base = E_predicted > 0 ? E_predicted / 20 : 0.05;
  
  let sc_factor = 0.0;
  if (chosen_payment_plan === 'A') {
    if (group === 1) {
      sc_factor = sunk_cost_influence;
    } else if (group === 2) {
      sc_factor = sunk_cost_influence * 0.5;
    }
  }
  
  const daily_scenarios = [...SCENARIOS].sort(() => Math.random() - 0.5);
  const ride_decisions: number[] = [];
  
  for (const scenario of daily_scenarios) {
    let P_ride = P_base;
    
    if (BAD_WEATHER.includes(scenario.weather)) {
      P_ride -= sensitivity_to_weather;
    }
    
    if (scenario.distance_km >= 4.0) {
      P_ride -= sensitivity_to_distance;
    }
    
    if (scenario.pressure_level === 2) {
      P_ride += sensitivity_to_pressure;
    }
    
    if (scenario.luggage_level === 2) {
      P_ride -= 0.1;
    }
    
    P_ride += sc_factor;
    P_ride = Math.max(0.0, Math.min(1.0, P_ride));
    
    const choose_ride = Math.random() < P_ride ? 1 : 0;
    ride_decisions.push(choose_ride);
  }
  
  return { ride_decisions, daily_scenarios };
}

export function runFullExperimentSimulation(params: SimulationParams): SimulationResult {
  const { 
    participant_id, 
    group, 
    E_predicted, 
    chosen_payment_plan,
    age,
    gender,
    freq_bike_use,
    sensitivity_to_weather,
    sensitivity_to_distance,
    sensitivity_to_pressure,
    sunk_cost_influence
  } = params;
  
  const { ride_decisions, daily_scenarios } = generateSimulatedDecisions(
    E_predicted,
    chosen_payment_plan,
    group,
    sensitivity_to_weather,
    sensitivity_to_distance,
    sensitivity_to_pressure,
    sunk_cost_influence
  );
  
  const daily_records: DailyRecord[] = [];
  let total_rides_count = 0;
  let total_cost_incurred = 0;
  let sunk_cost_value = 0.0;
  
  const final_payment_plan = group === 3 ? 'B' : chosen_payment_plan;
  
  if (final_payment_plan === 'A') {
    total_cost_incurred = PACKAGE_COST;
    
    if (group === 2) {
      const effective_E = Math.max(E_predicted, 1);
      sunk_cost_value = PACKAGE_COST / effective_E;
    }
  }
  
  for (let day_index = 0; day_index < 20; day_index++) {
    const day = day_index + 1;
    const scenario = daily_scenarios[day_index];
    const choose_ride = ride_decisions[day_index];
    
    let if_ride_cost_displayed = "无";
    let sunk_cost_prompt_shown = 0;
    let displayed_sunk_cost_value = 0.0;
    
    if (choose_ride === 1) {
      total_rides_count++;
      
      if (final_payment_plan === 'B') {
        if_ride_cost_displayed = `${PER_RIDE_COST} 代币 (实际扣除)`;
      } else if (final_payment_plan === 'A') {
        if (group === 1) {
          if_ride_cost_displayed = "本次骑行免费";
        } else if (group === 2) {
          if_ride_cost_displayed = `${sunk_cost_value.toFixed(2)} 代币 (沉没成本分摊)`;
          sunk_cost_prompt_shown = 1;
          displayed_sunk_cost_value = sunk_cost_value;
        }
      }
    }
    
    daily_records.push({
      day,
      scenario_id: scenario.scenario_id,
      weather: scenario.weather,
      distance_km: scenario.distance_km,
      luggage_level: scenario.luggage_level,
      time_pressure: scenario.pressure_level,
      choose_ride,
      if_ride_cost_displayed,
      sunk_cost_prompt_shown,
      displayed_sunk_cost_value
    });
  }
  
  if (final_payment_plan === 'B') {
    total_cost_incurred = total_rides_count * PER_RIDE_COST;
  }
  
  const final_tokens = INITIAL_ENDOWMENT - total_cost_incurred;
  const final_cash_payoff = 5 + (final_tokens * TOKEN_RATE);
  
  const participant_summary = {
    participant_id,
    group,
    age,
    gender,
    freq_bike_use_baseline: freq_bike_use,
    E_predicted,
    chosen_payment_plan: final_payment_plan,
    total_rides_count,
    total_cost_incurred,
    final_tokens,
    final_cash_payoff,
    E_minus_A_overconfidence: E_predicted - total_rides_count,
    manipulation_check_scores: 4.5,
    attention_check_pass: 1,
    timestamp_start: new Date().toISOString(),
    timestamp_end: new Date().toISOString()
  };
  
  return {
    participant_summary,
    daily_records
  };
}
