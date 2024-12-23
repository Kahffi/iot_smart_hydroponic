import { useEffect, useState } from "react";
import { database } from "../firebase";
import {
  IBundledSensorData,
  FetchedSensorData,
} from "../contexts/SensorReadingContext";
import {
  ref,
  query,
  orderByChild,
  onValue,
  limitToLast,
} from "firebase/database";

export type HistoryPeriod = "daily" | "_3hour" | "_1hour" | "_10minutes";

export function useFetchSensorData() {
  const [latestSensorRead, setLatestSensorRead] =
    useState<IBundledSensorData | null>(null);

  useEffect(() => {
    const sensorsRef = ref(database, "sensorsData/");

    const sensorQuery = query(
      sensorsRef,
      orderByChild("timestamp"),
      limitToLast(1)
    );
    //======================================================

    const unsubscribe = onValue(sensorQuery, (snapshot) => {
      const data: { [key: string]: FetchedSensorData } | null = snapshot.val();
      if (!data) return;

      const parsedData: IBundledSensorData[] = Object.values(data).map(
        (sensorData) => ({
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
        })
      );
      setLatestSensorRead(parsedData.pop() || null);
    });
    return () => {
      // Cleanup listener
      unsubscribe();
    };
  }, []);

  return latestSensorRead;
}
