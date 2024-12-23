import { ReactNode, useContext, useEffect, useState } from "react";
import SensorChartContext, { TSensorChartContext } from "./SensorChartContext";
import SensorReadingContext from "./SensorReadingContext";

export default function SensorChartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const sensorData = useContext(SensorReadingContext);
  const [chartData, setChartData] = useState<TSensorChartContext>({
    humidity: [],
    temperature: [],
    waterHeight: [],
    waterQuality: [],
  });

  // listening to sensorReading and appending to chart data
  useEffect(() => {
    if (!sensorData.data) return;
    // create a copy of previous sensor data
    setChartData((prevChartData) => {
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
            datetime: sensorData.data![sensorKey].datetime.getTime(),
            value: sensorData.data![sensorKey].value,
          },
        ];
      });

      return updatedChartData; // Return the updated chart data
    });
  }, [sensorData]);

  return (
    <SensorChartContext.Provider value={chartData}>
      {children}
    </SensorChartContext.Provider>
  );
}
