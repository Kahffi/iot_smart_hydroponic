import sadPlantImg from "../assets/plants/sad_plant.png";
import normalPlantImg from "../assets/plants/normal_plant.png";
import happyPlantImg from "../assets/plants/happy_plant.png";

type TSpinnyMetaData = {
  status: string;
  image: string;
  description: string;
};

export default function SpinnyStats({
  handleClose,
}: {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const SpinnyMetaData: TSpinnyMetaData[] = [
    {
      status: "Sedih",
      image: sadPlantImg,
      description:
        "Aku sedih ketika kelembapan udara di sekitar ku rendah, suhu udara tinggi, dan pupuk yang diberikan sedikit",
    },
    {
      status: "Normal",
      image: normalPlantImg,
      description:
        "Aku sedih ketika kelembapan udara di sekitar ku rendah, suhu udara tinggi, dan pupuk yang diberikan sedikit",
    },
    {
      status: "Senang",
      image: happyPlantImg,
      description:
        "Aku sangat senang ketika kelembapan udara di sekitar ku tinggi, suhu udara rendah, dan pupuk yang diberikan berlimpah",
    },
  ];

  return (
    <div className="w-screen h-dvh fixed top-0 flex items-center justify-center bg-slate-400/40 backdrop-blur-sm p-5 z-10">
      <div className="flex flex-col bg-gray-200 p-10 pt-12 rounded-md gap-5 relative max-h-dvh items-center">
        <div className="flex flex-wrap justify-center items-center  relative overflow-auto gap-3">
          {SpinnyMetaData.map(({ image, status, description }) => {
            return (
              <div
                className="shadow-lg flex flex-col items-center rounded-md p-4 bg-white w-72 h-80"
                key={`${status}~spinny_status`}
              >
                <h3 className="font-bold">{status}</h3>
                <img src={image} alt={`spinny-${status}`} className="w-36" />
                <p className="text-center">{description}</p>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => handleClose(false)}
          className="p-3 py-2 border border-white max-w-72 font-semibold w-full bg-white rounded-md hover:opacity-60"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
