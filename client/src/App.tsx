import PumpController from "./components/PumpController";
import SensorMeter from "./components/SensorMeter";
import { Icon } from "@iconify/react";
import SensorChart from "./components/SensorChart";
import SensorReadingContextProvider from "./contexts/SensorReadingContextProvider";
import SensorChartContextProvider from "./contexts/SensorChartContextProvider";

function App() {
  // useEffect(() => {
  //   const numberSse = new EventSource("http://127.0.0.1:8000/random");

  //   numberSse.addEventListener("numberUpdate", (event) => {
  //     if (event.data) setData(event.data);
  //   });

  //   return () => numberSse.close();
  // }, []);
  console.log("render");
  return (
    <div className="min-h-dvh bg-slate-100 p-4 pt-7">
      {/* Header */}
      <div className="text-5xl font-bold text-green-400 w-full flex flex-col items-center gap-1">
        <div className="w-[72px] aspect-square">
          <Icon icon="teenyicons:plant-outline" width={"100%"} />
        </div>
        <h1 className="">Smart Hydroponic</h1>
      </div>
      {/* Sensor Reading */}
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-wrap justify-center sm:gap-5 gap-3 mt-10 w-full">
          <SensorReadingContextProvider>
            <SensorMeter sensorType="humidity" />
            <SensorMeter sensorType="temperature" />
            <SensorMeter sensorType="waterHeight" />
            <SensorMeter sensorType="waterQuality" />
          </SensorReadingContextProvider>
        </div>
        {/* Pump Controll */}
        <div className="flex flex-1 px-5 py-10 bg-white justify-around rounded-lg shadow-md h-48 max-w-[500px] w-full">
          <PumpController label="Water Pump" pumpTarget="waterPump" />
          <PumpController label="Fertilizer Pump" pumpTarget="fertPump" />
        </div>
      </div>
      {/* Sensor Reading Graph/History */}
      <div className=" flex flex-wrap w-full overflow-auto justify-evenly gap-5">
        <SensorReadingContextProvider>
          <SensorChartContextProvider>
            <SensorChart sensorType="humidity" />
            <SensorChart sensorType="temperature" />
            <SensorChart sensorType="waterHeight" />
          </SensorChartContextProvider>
        </SensorReadingContextProvider>
      </div>
    </div>
  );
}

export default App;
