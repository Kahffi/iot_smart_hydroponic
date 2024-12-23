import { createContext } from "react";

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
  data: IBundledSensorData | null;
};

const SensorReadingContext = createContext<TSensorHistoryContext>({
  data: null,
});

export default SensorReadingContext;
