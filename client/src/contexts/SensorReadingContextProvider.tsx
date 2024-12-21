import { ReactNode, useState } from "react";
import { SensorHistoryPeriod } from "./SensorReadingContext";
import SensorReadingContext from "./SensorReadingContext";

import { useFetchSensorData } from "../hooks/useFetchSensorsData";

type TSensorData = {
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

export default function SensorReadingContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [historyPeriod, setHistoryPeriod] =
    useState<SensorHistoryPeriod>("weekly");
  const sensorData = useFetchSensorData(historyPeriod);
  console.log(sensorData);
  //   get

  return (
    <SensorReadingContext.Provider
      value={{
        data: sensorData,
        period: historyPeriod,
        setHistoryPeriod: setHistoryPeriod,
      }}
    >
      {children}
    </SensorReadingContext.Provider>
  );
}
