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
  const [lastFetchedTimestamp, setLastFetchedTimestamp] = useState<
    number | null
  >(null);

  useEffect(() => {
    const sensorsRef = ref(database, "Sensor/");

    //======================================================
    // Control period of the fethced data, it made sure that only
    // the latest data are being fetched
    const periodInSeconds = {
      daily: 86400,
      weekly: 86400 * 7,
      monthly: 86400 * 30,
    }[historyPeriod];
    const startTime = lastFetchedTimestamp
      ? lastFetchedTimestamp
      : Date.now() / 1000 - periodInSeconds;

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

      // Update state
      //   (adding the new data)
      setSensorHistory((prev) => [...prev, ...parsedData]);
      const latestTimestamp =
        parsedData[parsedData.length - 1].humidity.datetime.getTime();
      //   keeping the latest data's timestamp
      setLastFetchedTimestamp(latestTimestamp);
    });
    return () => {
      // Cleanup listener
      unsubscribe();
    };
  }, [historyPeriod, lastFetchedTimestamp]);

  return sensorHistory;
}
