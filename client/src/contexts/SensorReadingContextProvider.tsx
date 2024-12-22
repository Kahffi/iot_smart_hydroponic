import { ReactNode, useState } from "react";
import SensorReadingContext from "./SensorReadingContext";

import {
  HistoryPeriod,
  useFetchSensorData,
} from "../hooks/useFetchSensorsData";

export default function SensorReadingContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [historyPeriod, setHistoryPeriod] =
    useState<HistoryPeriod>("_10minutes");
  const sensorData = useFetchSensorData(historyPeriod);
  //   get

  console.log(sensorData);
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
