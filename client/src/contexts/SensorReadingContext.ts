import { createContext } from "react";
export type SensorHistoryPeriod = "daily" | "weekly" | "monthly";

export type TSensorData = {
  datetime: Date;
  value: number;
};

export interface IBundledSensorData {
  humidity: TSensorData;
  temperature: TSensorData;
  waterQuality: TSensorData;
  waterHeight: TSensorData;
}

export interface FetchedSensorData {
  humidity: number;
  temperature: number;
  waterQuality: number;
  waterHeight: number;
  timestamp: string;
}

type TSensorHistoryContext = {
  data: IBundledSensorData[];
  period: SensorHistoryPeriod;
  setHistoryPeriod: React.Dispatch<React.SetStateAction<SensorHistoryPeriod>>;
};

const SensorReadingContext = createContext<TSensorHistoryContext>({
  data: [],
  period: "weekly",
  setHistoryPeriod: () => {},
});

export default SensorReadingContext;
