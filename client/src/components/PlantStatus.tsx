import { useContext, useEffect } from "react";
import SensorReadingContext from "../contexts/SensorReadingContext";
import usePredicion from "../hooks/usePrediction";
import { Icon } from "@iconify/react/dist/iconify.js";
import sadPlantImg from "../assets/plants/sad_plant.png";
import normalPlantImg from "../assets/plants/normal_plant.png";
import happyPlantImg from "../assets/plants/happy_plant.png";

export default function PlantStatus({
  handleMetadata,
}: {
  handleMetadata: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data } = useContext(SensorReadingContext);
  const { requestPredict, res } = usePredicion();

  const StatusClass = ["Sedih", "Senang", "Normal"];

  const StatusColor = [sadPlantImg, happyPlantImg, normalPlantImg];

  useEffect(() => {
    if (!data) return;
    requestPredict([
      data?.temperature.value,
      data?.humidity.value,
      data?.waterQuality.value,
    ]);
  }, [data]);

  return (
    <div className="flex flex-col p-5 max-w-72">
      <div className="flex flex-col items-center justify-between text-green-500 h-full ">
        <p className="font-semibold text-2xl">Spinny</p>
        <img
          src={(res && StatusColor[res]) || ""}
          alt="plant status"
          className="w-full"
        />
        <p>
          {res !== null
            ? `Spinny Merasa ${StatusClass[res]}`
            : "Terjadi Kesalahan"}{" "}
          <Icon
            icon={"akar-icons:question-fill"}
            className="inline cursor-pointer -mt-2 text-gray-400"
            onClick={() => handleMetadata((prev) => !prev)}
          />
        </p>
      </div>
    </div>
  );
}
