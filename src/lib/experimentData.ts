import { Scenario } from "@/types/experiment";

export const SCENARIOS: Scenario[] = [
  { scenario_id: 1, weather: "晴", distance_km: 1.2, luggage: "无", time_pressure: "低", luggage_level: 0, pressure_level: 0 },
  { scenario_id: 2, weather: "晴", distance_km: 3.8, luggage: "中等背包", time_pressure: "中", luggage_level: 1, pressure_level: 1 },
  { scenario_id: 3, weather: "多云", distance_km: 5.4, luggage: "无", time_pressure: "高", luggage_level: 0, pressure_level: 2 },
  { scenario_id: 4, weather: "小雨", distance_km: 2.8, luggage: "背包（中）", time_pressure: "中", luggage_level: 1, pressure_level: 1 },
  { scenario_id: 5, weather: "大雨", distance_km: 1.0, luggage: "伞+手提包（重）", time_pressure: "低", luggage_level: 2, pressure_level: 0 },
  { scenario_id: 6, weather: "雾霾/能见度低", distance_km: 4.6, luggage: "无", time_pressure: "中", luggage_level: 0, pressure_level: 1 },
  { scenario_id: 7, weather: "风大（有风）", distance_km: 2.0, luggage: "无", time_pressure: "低", luggage_level: 0, pressure_level: 0 },
  { scenario_id: 8, weather: "晴", distance_km: 6.2, luggage: "手提（轻）", time_pressure: "高", luggage_level: 1, pressure_level: 2 },
  { scenario_id: 9, weather: "小雨", distance_km: 3.0, luggage: "购物袋（重）", time_pressure: "中", luggage_level: 2, pressure_level: 1 },
  { scenario_id: 10, weather: "晴", distance_km: 0.8, luggage: "无", time_pressure: "低", luggage_level: 0, pressure_level: 0 },
  { scenario_id: 11, weather: "多云", distance_km: 4.0, luggage: "背包（轻）", time_pressure: "高", luggage_level: 1, pressure_level: 2 },
  { scenario_id: 12, weather: "小雪或低温", distance_km: 2.5, luggage: "无", time_pressure: "中", luggage_level: 0, pressure_level: 1 },
  { scenario_id: 13, weather: "晴", distance_km: 5.0, luggage: "无", time_pressure: "低", luggage_level: 0, pressure_level: 0 },
  { scenario_id: 14, weather: "阵雨", distance_km: 1.8, luggage: "背包（中）", time_pressure: "高", luggage_level: 1, pressure_level: 2 },
  { scenario_id: 15, weather: "多云", distance_km: 3.5, luggage: "购物袋（轻）", time_pressure: "低", luggage_level: 1, pressure_level: 0 },
  { scenario_id: 16, weather: "风大", distance_km: 0.9, luggage: "无", time_pressure: "中", luggage_level: 0, pressure_level: 1 },
  { scenario_id: 17, weather: "下雨", distance_km: 4.8, luggage: "重", time_pressure: "高", luggage_level: 2, pressure_level: 2 },
  { scenario_id: 18, weather: "晴", distance_km: 2.2, luggage: "手提（轻）", time_pressure: "低", luggage_level: 1, pressure_level: 0 },
  { scenario_id: 19, weather: "多云", distance_km: 3.9, luggage: "无", time_pressure: "中", luggage_level: 0, pressure_level: 1 },
  { scenario_id: 20, weather: "小雨", distance_km: 1.6, luggage: "中等", time_pressure: "高", luggage_level: 1, pressure_level: 2 },
];

export const PACKAGE_COST = 15;
export const PER_RIDE_COST = 1;
export const INITIAL_ENDOWMENT = 30;
export const TOKEN_RATE = 0.5;
export const BREAK_EVEN_POINT = 15;
