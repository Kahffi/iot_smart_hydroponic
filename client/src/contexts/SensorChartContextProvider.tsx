import { ReactNode, useContext, useEffect, useState } from "react";
import SensorChartContext, { TSensorChartContext } from "./SensorChartContext";
import SensorReadingContext from "./SensorReadingContext";

// graph type = realtime or periodic, (periodic only fetch once)
type GraphType = "rt" | "pd";

export default function SensorChartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const latestSensorData = useContext(SensorReadingContext);
  const [latestChartData, setLatestChartData] = useState<TSensorChartContext>({
    humidity: [],
    temperature: [],
    waterHeight: [],
    waterQuality: [],
  });

  const [graphType] = useState<GraphType>("rt");

  // listening to latestSensorReading and appending to chart data and if
  // graph type is realtime
  useEffect(() => {
    if (!latestSensorData.data || graphType !== "rt") return;
    // create a copy of previous sensor data
    setLatestChartData((prevChartData) => {
      const updatedChartData = { ...prevChartData };

      // Create new arrays for each sensor type
      Object.keys(updatedChartData).forEach((key) => {
        const sensorKey = key as keyof TSensorChartContext;

        // Ensure the array doesn't exceed the limit
        if (updatedChartData[sensorKey].length > 500) {
          updatedChartData[sensorKey] = updatedChartData[sensorKey].slice(1); // Remove first element immutably
        }

        // Add the new data point
        updatedChartData[sensorKey] = [
          ...updatedChartData[sensorKey], // Spread existing data
          {
            datetime: latestSensorData.data![sensorKey].datetime.getTime(),
            value: latestSensorData.data![sensorKey].value,
          },
        ];
      });

      return updatedChartData; // Return the updated chart data
    });
  }, [latestSensorData, graphType]);

  // listening to periodicSensorReading and appending to chart data if
  // graph type is periodic
  useEffect(() => {
    if (graphType !== "pd") return;
  }, [graphType]);

  return (
    <SensorChartContext.Provider value={latestChartData}>
      {children}
    </SensorChartContext.Provider>
  );
}
