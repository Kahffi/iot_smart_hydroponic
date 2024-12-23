import { useContext } from "react";
import { IBundledSensorData } from "../contexts/SensorReadingContext";
import SensorReadingContext from "../contexts/SensorReadingContext";

import { Icon } from "@iconify/react/dist/iconify.js";

export type SensorLabel = keyof IBundledSensorData;
type Props = {
  sensorType: SensorLabel;
};

export default function SensorMeter({ sensorType }: Props) {
  const { data: sensorsData } = useContext(SensorReadingContext);
  const sensorValue = sensorsData ? sensorsData[sensorType] : null;
  const sensorConstants = {
    humidity: {
      label: "Humidity",
      icon: "mdi:humidity",
      unit: "%",
    },
    temperature: {
      label: "Temperature",
      icon: "mdi:temperature",
      unit: "C",
    },
    waterQuality: {
      label: "Water Quality",
      icon: "material-symbols:water-drop",
      unit: "ppm",
    },
    waterHeight: {
      label: "Water Height",
      icon: "mdi:car-coolant-level",
      unit: "cm",
    },
  };

  return (
    <div className="flex flex-col p-5 bg-white rounded-lg shadow-md h-48 w-44">
      <div className="flex flex-col items-center justify-between text-green-500 h-full">
        <p className="font-semibold text-xl">
          {sensorConstants[sensorType].label}
        </p>
        <Icon icon={sensorConstants[sensorType]?.icon} className="text-5xl" />
        {sensorValue && (
          <p>{sensorValue.value + " " + sensorConstants[sensorType]?.unit}</p>
        )}
      </div>
    </div>
  );
}
