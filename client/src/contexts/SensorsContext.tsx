import { createContext, type ReactNode, useEffect, useState } from "react";
import { database } from "../firebase";
import {
  ref,
  onValue,
  query,
  orderByChild,
  limitToLast,
} from "firebase/database";

type TSensorData = {
  datetime?: Date;
  value: number;
};

interface IBundledSensorData {
  humidity: TSensorData;
  temperature: TSensorData;
  waterQuality: TSensorData;
  waterHeight: TSensorData;
}

interface FetchedSensorData {
  humidity: number;
  temperature: number;
  waterQuality: number;
  waterHeight: number;
  timestamp: string;
}

type TSensorContext = {
  sensorsData: IBundledSensorData[];
  setSensorData: React.Dispatch<React.SetStateAction<IBundledSensorData[]>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const SensorContext = createContext<TSensorContext>({
  sensorsData: [],
  setSensorData: () => {},
});

export default function SensorsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [sensorsData, setSensorData] = useState<IBundledSensorData[]>([]);

  // update sensor data
  // [dht, ultra, tds]
  useEffect(() => {
    const sensorsRef = ref(database, "Sensor/");
    const latestSensorQuery = query(
      sensorsRef,
      orderByChild("timestamp"),
      limitToLast(1)
    );
    onValue(latestSensorQuery, (snapshot) => {
      const data: {
        [key: string]: FetchedSensorData;
      } | null = snapshot.val();
      if (!data) return;

      const parsedData: IBundledSensorData[] = Object.values(data).map(
        (sensorData) => {
          return {
            humidity: {
              value: sensorData.humidity,
              datetime: new Date(parseInt(sensorData.timestamp) * 1000),
            },
            temperature: {
              value: sensorData.temperature,
              datetime: new Date(parseInt(sensorData.timestamp) * 1000),
            },
            waterHeight: {
              value: sensorData.waterHeight,
              datetime: new Date(parseInt(sensorData.timestamp) * 1000),
            },
            waterQuality: {
              value: sensorData.waterQuality,
              datetime: new Date(parseInt(sensorData.timestamp) * 1000),
            },
          };
        }
      );
      setSensorData([...parsedData]);
    });
  }, []);

  return (
    <SensorContext.Provider
      value={{ sensorsData: sensorsData, setSensorData: setSensorData }}
    >
      {children}
    </SensorContext.Provider>
  );
}
