import { useEffect, useState } from "react";
import {
  FetchedSensorData,
  IBundledSensorData,
} from "../contexts/SensorsContext";
import { database } from "../firebase";
import {
  onValue,
  orderByChild,
  query,
  ref,
  startAfter,
} from "firebase/database";

// type Period = "daily" | "monthly";
// // type Props = {
// //   period: Period;
// // };

export default function useSensorHistory() {
  const [data, setData] = useState<IBundledSensorData[]>([]);

  useEffect(() => {
    const sensorsRef = ref(database, "Sensor/");
    const period = Date.now() / 1000 - 86400 * 7;
    // Creating query to get the desired period from firebase
    const sensorHistoryQuery = query(
      sensorsRef,
      orderByChild("timestamp"),
      startAfter(period)
    );
    // handle value change from firebase realtime database
    onValue(sensorHistoryQuery, (snapshot) => {
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
      setData([...parsedData]);
    });
  }, []);

  return data;
}
