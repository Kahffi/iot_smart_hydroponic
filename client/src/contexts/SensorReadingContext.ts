import { createContext } from "react";
import { HistoryPeriod } from "../hooks/useFetchSensorsData";

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
  period: HistoryPeriod;
  setHistoryPeriod: React.Dispatch<React.SetStateAction<HistoryPeriod>>;
};

const SensorReadingContext = createContext<TSensorHistoryContext>({
  data: [],
  period: "daily",
  setHistoryPeriod: () => {},
});

export default SensorReadingContext;
