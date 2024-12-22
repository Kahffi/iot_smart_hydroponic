import { useCallback, useEffect, useState } from "react";
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

export type HistoryPeriod = "daily" | "_3hour" | "_1hour" | "_10minutes";

export function useFetchSensorData(historyPeriod: HistoryPeriod) {
  const [sensorHistory, setSensorHistory] = useState<IBundledSensorData[]>([]);
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);

  const getPeriodInSeconds = useCallback(() => {
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

    return {
      daily: dailyPeriodInSeconds,
      _3hour: Math.round(new Date().getTime() / 1000 - 3 * 3600),
      _1hour: Math.round(new Date().getTime() / 1000 - 1 * 3600),
      _10minutes: Math.round(new Date().getTime() / 1000 - 1 * 60),
    }[historyPeriod];
  }, [historyPeriod]);

  useEffect(() => {
    const sensorsRef = ref(database, "sensorsData/");
    const startTime = lastFetchTime
      ? getPeriodInSeconds()
      : getPeriodInSeconds();

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
      setSensorHistory([...parsedData]);
      setLastFetchTime(
        parsedData[parsedData.length - 1].humidity.datetime.getTime()
      );
    });
    return () => {
      // Cleanup listener
      unsubscribe();
    };
  }, [historyPeriod, getPeriodInSeconds, lastFetchTime]);

  return sensorHistory;
}
