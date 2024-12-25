import { useContext } from "react";
import { IBundledSensorData } from "../contexts/SensorReadingContext";
import SensorReadingContext from "../contexts/SensorReadingContext";
import { READING_INFO } from "../constants";

import { Icon } from "@iconify/react/dist/iconify.js";

export type SensorLabel = keyof IBundledSensorData;
type Props = {
  sensorType: SensorLabel;
};

export default function SensorMeter({ sensorType }: Props) {
  const { data: sensorsData } = useContext(SensorReadingContext);
  const sensorValue = sensorsData ? sensorsData[sensorType] : null;

  return (
    <div className="flex flex-col p-5 bg-white rounded-lg shadow-md h-48 w-44">
      <div className="flex flex-col items-center justify-between text-green-500 h-full">
        <p className="font-semibold text-xl">
          {READING_INFO[sensorType].label}
        </p>
        <Icon icon={READING_INFO[sensorType]?.icon} className="text-5xl" />
        {sensorValue && (
          <p>{sensorValue.value + " " + READING_INFO[sensorType]?.unit}</p>
        )}
      </div>
    </div>
  );
}
