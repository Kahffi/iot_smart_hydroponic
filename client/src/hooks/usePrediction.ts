import { useCallback, useState } from "react";

export default function usePredicion() {
  const [res, setRes] = useState<number | null>(null);

  const requestPredict = useCallback((input: number[]) => {
    async function fetchPredict(url: string) {
      const req = await fetch(url, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),

        body: JSON.stringify(input),
      });

      if (!req.ok) return;
      const res = await req.json();
      setRes(res.prediction);
    }

    fetchPredict("https://1ca3-34-73-75-213.ngrok-free.app/predict");
  }, []);
  return { requestPredict, res };
}
