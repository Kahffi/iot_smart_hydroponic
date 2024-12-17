import PumpController from "./components/PumpController";
import SensorMeter from "./components/SensorMeter";
import SensorsContextProvider from "./contexts/SensorsContext";
import { Icon } from "@iconify/react";

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
        <Icon icon="teenyicons:plant-outline" className="text-7xl" />
        <h1 className="">Smart Hydroponic</h1>
      </div>

      <div className="flex flex-wrap justify-center sm:gap-5 gap-3 mt-10">
        <SensorsContextProvider>
          <SensorMeter sensorType="humidity" />
          <SensorMeter sensorType="temperature" />
          <SensorMeter sensorType="waterHeight" />
          <SensorMeter sensorType="waterQuality" />
        </SensorsContextProvider>
        <div className="flex flex-1 p-5 bg-white justify-around rounded-lg shadow-md h-48 max-w-[500px]">
          <PumpController label="Water Pump" pumpTarget="waterPump" />
          <PumpController label="Fertilizer Pump" pumpTarget="fertPump" />
        </div>
      </div>
    </div>
  );
}

export default App;
