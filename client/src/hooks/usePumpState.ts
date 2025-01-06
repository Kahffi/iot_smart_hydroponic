import { useCallback, useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, onValue, type DataSnapshot, set } from "firebase/database";

export type PumpTarget = "fertPump" | "waterPump";

export default function usePumpState(pumpTarget: PumpTarget) {
  // database location
  const pumpRef = ref(database, "Aktuator/" + pumpTarget);
  const [pumpState, setPumpState] = useState<null | boolean>(null);

  useEffect(() => {
    function handlePumpRequest(snapshot: DataSnapshot) {
      const data = snapshot.val();
      console.log(data);
      if (typeof data === "boolean") {
        setPumpState(data);
      } else {
        setPumpState(null);
      }
    }

    const unsubscribe = onValue(pumpRef, handlePumpRequest);

    // cleanup
    return () => unsubscribe();
  }, [pumpRef]);

  //   function to set the pump state in the IoT device
  const switchPumpState = useCallback(() => {
    try {
      set(pumpRef, !pumpState).then(() => {
        console.log("sent");
      });
    } catch (e) {
      console.error(e);
    }
  }, [pumpRef, pumpState]);

  return { pumpState, switchPumpState };
}
