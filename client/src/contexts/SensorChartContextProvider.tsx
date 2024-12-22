import { ReactNode, useContext, useMemo } from "react";
import SensorChartContext, { TSensorChartContext } from "./SensorChartContext";
import SensorReadingContext from "./SensorReadingContext";

export default function SensorChartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const sensorData = useContext(SensorReadingContext);
  const formattedData = useMemo<TSensorChartContext>(() => {
    return sensorData.data.reduce(
      (acc: TSensorChartContext, currentValue) => {
        Object.keys(acc).forEach((accKey) => {
          acc[accKey as keyof TSensorChartContext].push({
            ...currentValue[accKey as keyof TSensorChartContext],
            datetime:
              currentValue[
                accKey as keyof TSensorChartContext
              ].datetime.getTime(),
          });
        });
        return acc;
      },
      {
        humidity: [],
        temperature: [],
        waterHeight: [],
        waterQuality: [],
      }
    );
  }, [sensorData]);
  return (
    <SensorChartContext.Provider value={formattedData}>
      {children}
    </SensorChartContext.Provider>
  );
}
