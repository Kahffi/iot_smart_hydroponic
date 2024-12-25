import { ReactNode } from "react";
import SensorReadingContext from "./SensorReadingContext";

import { useFetchLatestSensorData } from "../hooks/useFetchLatestSensorsData";

export default function SensorReadingContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const sensorData = useFetchLatestSensorData();
  //   get

  return (
    <SensorReadingContext.Provider
      value={{
        data: sensorData,
      }}
    >
      {children}
    </SensorReadingContext.Provider>
  );
}
