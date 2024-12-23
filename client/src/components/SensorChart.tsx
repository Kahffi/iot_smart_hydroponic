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

type LatestDataDotProps = {
  cx?: number;
  cy?: number;
  index?: number;
  dataLength: number;
};

function LatestDataDot({ cx, cy, index, dataLength }: LatestDataDotProps) {
  console.log(`Index: ${index}, Data Length: ${dataLength}`);

  // Render only for the last data point
  if (index === dataLength - 1) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={3} // Dot size
        fill="orange" // Dot color
        stroke="white" // Border color
        strokeWidth={1}
      />
    );
  }
  return null; // No dot for other points
}

type CustomTooltipProps = {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  label?: string | number;
  sensorType: keyof TSensorChartContext;
};

function CustomTooltip({
  active,
  payload,
  label,
  sensorType,
}: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/70 rounded-lg backdrop-blur-md text-sm text-gray-900 p-3 shadow-md">
        <h2 className="mb-2 text-black">{sensorType.toUpperCase()}</h2>
        <p>{`Time: ${label ? new Date(label).toLocaleString() : ""}`}</p>
        <p>{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
}

export default function SensorChart({ sensorType }: Props) {
  const sensorData = useContext(SensorChartContext);

  return (
    <div className="w-[520px] h-[400px]">
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <AreaChart width={500} height={300} data={sensorData[sensorType]}>
          <XAxis
            dataKey={"datetime"}
            type="number"
            domain={["dataMin", "dataMax"]}
            tickCount={3}
            tick={{
              fontSize: 13,
              width: 100,
            }}
            tickMargin={7}
            interval={0}
            tickFormatter={(value) => new Date(value).toLocaleString()}
          />
          <YAxis />
          <CartesianGrid />
          <Tooltip content={<CustomTooltip sensorType={sensorType} />} />
          <Area
            type={"linear"}
            dataKey={"value"}
            dot={(props) => (
              <LatestDataDot
                {...props}
                dataLength={sensorData[sensorType].length}
              />
            )}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
