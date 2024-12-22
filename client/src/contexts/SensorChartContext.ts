import { createContext } from "react";

type ChartSensorData = {
  datetime: number;
  value: number;
};

export type TSensorChartContext = {
  humidity: ChartSensorData[];
  temperature: ChartSensorData[];
  waterHeight: ChartSensorData[];
  waterQuality: ChartSensorData[];
};

const SensorChartContext = createContext<TSensorChartContext>({
  humidity: [],
  waterHeight: [],
  temperature: [],
  waterQuality: [],
});
export default SensorChartContext;
