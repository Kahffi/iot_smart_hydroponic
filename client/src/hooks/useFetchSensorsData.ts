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
  startAfter,
  onValue,
} from "firebase/database";

export function useFetchSensorData(
  historyPeriod: "daily" | "weekly" | "monthly"
) {
  const [sensorHistory, setSensorHistory] = useState<IBundledSensorData[]>([]);

  useEffect(() => {
    const sensorsRef = ref(database, "Sensor/");

    //======================================================
    // Control period of the fethced data
    const currentDate = new Date();
    const dailyPeriodInSeconds = Math.floor(
      //   getting the current day timestamp (unix timestamp) in seconds
      // the code below will get the first hour of the current date
      //   VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      ).getTime() / 1000
    );
    console.log(dailyPeriodInSeconds);
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    const periodInSeconds = {
      daily: dailyPeriodInSeconds,
      weekly: dailyPeriodInSeconds - 7 * 24 * 60 * 60,
      monthly: dailyPeriodInSeconds - 30 * 24 * 60 * 60,
    }[historyPeriod];
    const startTime = periodInSeconds;

    const sensorQuery = query(
      sensorsRef,
      orderByChild("timestamp"),
      startAfter(startTime)
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

      setSensorHistory((prev) => [...prev, ...parsedData]);
    });
    return () => {
      // Cleanup listener
      unsubscribe();
    };
  }, [historyPeriod]);

  return sensorHistory;
}
