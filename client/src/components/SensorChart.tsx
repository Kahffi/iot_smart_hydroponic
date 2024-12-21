import { LineChart, Line, ResponsiveContainer } from "recharts";
import useSensorHistory from "../hooks/useSensorHistory";

export default function SensorChart() {
  const sensorHistory = useSensorHistory();
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <LineChart width={500} height={300}></LineChart>
    </ResponsiveContainer>
  );
}
