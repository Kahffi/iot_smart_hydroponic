import { LineChart, ResponsiveContainer } from "recharts";
import { useContext } from "react";
import SensorReadingContext from "../contexts/SensorReadingContext";

export default function SensorChart() {
  const { data: sensorHistory } = useContext(SensorReadingContext);
  console.log(sensorHistory);
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <LineChart width={500} height={300}></LineChart>
    </ResponsiveContainer>
  );
}
