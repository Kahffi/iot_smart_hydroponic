import { Icon } from "@iconify/react/dist/iconify.js";
import usePumpState from "../hooks/usePumpState";
import type { PumpTarget } from "../hooks/usePumpState";
type Props = {
  label: string;
  pumpTarget: PumpTarget;
};

export default function PumpController({ label, pumpTarget }: Props) {
  const { pumpState, switchPumpState } = usePumpState(pumpTarget);

  return (
    <>
      <div className="flex flex-col items-center justify-between  text-green-500 w-fit h-full gap-5">
        <p className="font-semibold text-xl">{label}</p>
        <Icon
          icon={"mingcute:engine-line"}
          className="group-hover:text-green-700 text-5xl"
        />
        <button
          onClick={switchPumpState}
          className={`font-semibold w-32 px-12 py-1 rounded-sm shadow-md transition-all hover:scale-95 ${
            pumpState
              ? "bg-green-500 border-2 border-green-500 hover:border-green-600  hover:bg-green-600 text-white"
              : "border-2  border-green-500 hover:bg-green-400 text-green-500 hover:text-white "
          }`}
        >
          {pumpState === null ? "Database Offline" : pumpState ? "ON" : "OFF"}
        </button>
      </div>
    </>
  );
}
