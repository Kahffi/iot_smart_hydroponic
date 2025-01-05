import PumpController from "./components/PumpController";
import SensorMeter from "./components/SensorMeter";
import { Icon } from "@iconify/react";
import SensorChart from "./components/SensorChart";
import SensorReadingContextProvider from "./contexts/SensorReadingContextProvider";
import SensorChartContextProvider from "./contexts/SensorChartContextProvider";
import GraphControl from "./components/GraphControl";
import PlantStatus from "./components/PlantStatus";
import { useState } from "react";
import SpinnyStats from "./components/SpinnyStats";

function App() {
  const [isMetadataOpen, setIsMetadataOpen] = useState(false);
  // useEffect(() => {
  //   const numberSse = new EventSource("http://127.0.0.1:8000/random");

  //   numberSse.addEventListener("numberUpdate", (event) => {
  //     if (event.data) setData(event.data);
  //   });

  //   return () => numberSse.close();
  // }, []);
  console.log("render");
  return (
    <div
      className={`min-h-dvh bg-slate-100 p-4 pt-7 overflow-hidden ${
        isMetadataOpen ? "overflow-hidden" : "overflow-auto"
      }`}
    >
      {isMetadataOpen && <SpinnyStats handleClose={setIsMetadataOpen} />}
      {/* Header */}
      <div className="text-5xl font-bold text-green-400 w-full flex flex-col items-center gap-1 mb-10">
        <div className="w-[72px] aspect-square">
          <Icon icon="teenyicons:plant-outline" width={"100%"} />
        </div>
        <h1 className="">Smart Hydroponic</h1>
      </div>

      {/* Sensors */}
      <div className="flex flex-col gap-10">
        {/* Sensor Reading  & pump Control*/}
        <div className="flex flex-col items-center gap-8 ">
          <div className="flex flex-wrap bg-white justify-around rounded-lg shadow-md p-4 gap-8 items-center">
            <SensorReadingContextProvider>
              <PlantStatus handleMetadata={setIsMetadataOpen} />
              <div className="flex flex-wrap justify-center sm:gap-5 gap-3 flex-1`">
                <SensorMeter sensorType="humidity" />
                <SensorMeter sensorType="temperature" />
                <SensorMeter sensorType="waterHeight" />
                <SensorMeter sensorType="waterQuality" />
              </div>
            </SensorReadingContextProvider>
          </div>
          {/* Pump Controll */}
          <div className="flex flex-1 px-5 py-10 bg-white justify-around rounded-lg shadow-md h-48 max-w-[500px] w-full">
            <PumpController label="Water Pump" pumpTarget="waterPump" />
            <PumpController label="Fertilizer Pump" pumpTarget="fertPump" />
          </div>
        </div>
        {/* Sensor Reading Graph/History */}
        {/* a wrapper to get the latest sensor data */}
        <SensorReadingContextProvider>
          <SensorChartContextProvider>
            <GraphControl />
            <div className=" flex flex-wrap w-full overflow-auto justify-evenly gap-5">
              <SensorChart sensorType="humidity" themeColor="red" />
              <SensorChart sensorType="temperature" themeColor="green" />
              <SensorChart sensorType="waterHeight" themeColor="aqua" />
              <SensorChart sensorType="waterQuality" themeColor="purple" />
            </div>
          </SensorChartContextProvider>
        </SensorReadingContextProvider>
      </div>
    </div>
  );
}

export default App;
