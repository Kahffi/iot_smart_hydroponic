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

import { READING_INFO } from "../constants";

type Props = {
  sensorType: keyof TSensorChartContext;
  themeColor: string;
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
  sensorLabel: string;
  themeColor: string;
};

function CustomTooltip({
  active,
  payload,
  label,
  sensorLabel,
  themeColor,
}: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/70 rounded-lg backdrop-blur-md text-sm text-gray-900 p-3 shadow-md">
        <h2 className="mb-2 text-black" style={{ color: themeColor }}>
          {sensorLabel}
        </h2>
        <p>{`Time: ${label ? new Date(label).toLocaleString() : ""}`}</p>
        <p>{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
}

export default function SensorChart({ sensorType, themeColor }: Props) {
  const sensorData = useContext(SensorChartContext);

  return (
    <div className="w-[520px] h-full bg-white box-content sm:p-5 rounded-xl shadow-md">
      <h1 className="text-center mb-3">{READING_INFO[sensorType].label}</h1>
      <ResponsiveContainer width={"100%"} height={400}>
        <AreaChart
          data={sensorData[sensorType]}
          margin={{ right: 50, left: 10 }}
          syncId={"sensorChart"}
        >
          <XAxis
            height={60}
            dataKey={"datetime"}
            type="number"
            domain={["dataMin", "dataMax"]}
            tickCount={3}
            tick={{
              fontSize: 14,
              width: 100,
            }}
            tickMargin={10}
            interval={0}
            tickFormatter={(value) => new Date(value).toLocaleString()}
          />
          <YAxis
            type="number"
            domain={(dataArr) => [0, dataArr[1] + dataArr[1] / 10]}
            tickFormatter={(value) => parseFloat(value).toFixed(2)}
            tick={{
              fontSize: 14,
            }}
            unit={READING_INFO[sensorType].unit}
          />
          <CartesianGrid strokeDasharray={"5"} />
          <Tooltip
            content={
              <CustomTooltip
                themeColor={themeColor}
                sensorLabel={READING_INFO[sensorType].label}
              />
            }
          />
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
            fill={themeColor}
            stroke={themeColor}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
