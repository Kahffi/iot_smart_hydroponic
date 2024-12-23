import { ReactNode } from "react";
import SensorReadingContext from "./SensorReadingContext";

import { useFetchSensorData } from "../hooks/useFetchSensorsData";

export default function SensorReadingContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const sensorData = useFetchSensorData();
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
