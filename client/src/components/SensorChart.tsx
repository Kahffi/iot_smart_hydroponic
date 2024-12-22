import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SensorChartContext, {
  TSensorChartContext,
} from "../contexts/SensorChartContext";
import { useContext } from "react";

type Props = {
  sensorType: keyof TSensorChartContext;
};

export default function SensorChart({ sensorType }: Props) {
  const sensorData = useContext(SensorChartContext);

  return (
    <div className="w-[520px] h-[400px]">
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <AreaChart width={500} height={300} data={sensorData[sensorType]}>
          <XAxis dataKey={"datetime"} />
          <YAxis />
          <CartesianGrid />
          <Tooltip />
          <Area type={"monotone"} dataKey={"value"} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
