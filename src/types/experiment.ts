export interface Scenario {
  scenario_id: number;
  weather: string;
  distance_km: number;
  luggage: string;
  time_pressure: string;
  luggage_level: number;
  pressure_level: number;
}

export interface DailyRecord {
  day: number;
  scenario_id: number;
  weather: string;
  distance_km: number;
  luggage_level: number;
  time_pressure: number;
  choose_ride: number;
  if_ride_cost_displayed: string;
  sunk_cost_prompt_shown: number;
  displayed_sunk_cost_value: number;
}

export interface ParticipantSummary {
  participant_id: string;
  group: number;
  age: number;
  gender: string;
  freq_bike_use_baseline: number;
  E_predicted: number;
  chosen_payment_plan: string;
  total_rides_count: number;
  total_cost_incurred: number;
  final_tokens: number;
  final_cash_payoff: number;
  E_minus_A_overconfidence: number;
  manipulation_check_scores: number;
  attention_check_pass: number;
  timestamp_start: string;
  timestamp_end: string;
}

export interface SimulationResult {
  participant_summary: ParticipantSummary;
  daily_records: DailyRecord[];
}

export interface SimulationParams {
  participant_id: string;
  group: number;
  E_predicted: number;
  chosen_payment_plan: string;
  age: number;
  gender: string;
  freq_bike_use: number;
  sensitivity_to_weather: number;
  sensitivity_to_distance: number;
  sensitivity_to_pressure: number;
  sunk_cost_influence: number;
}
