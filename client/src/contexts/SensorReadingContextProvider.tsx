import { ReactNode, useState } from "react";
import { SensorHistoryPeriod } from "./SensorReadingContext";
import SensorReadingContext from "./SensorReadingContext";

import { useFetchSensorData } from "../hooks/useFetchSensorsData";

export default function SensorReadingContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [historyPeriod, setHistoryPeriod] =
    useState<SensorHistoryPeriod>("daily");
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
