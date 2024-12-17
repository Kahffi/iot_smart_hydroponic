import { useCallback, useEffect, useRef } from "react";

type Props = {
  value: number | undefined;
};

export default function Indicator({ value = 0 }: Props) {
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!indicatorRef.current) return;
    indicatorRef.current.style.height = `${(value || 0) * 100}%`;
  }, [value]);

  return (
    <div className="w-40 h-64 flex items-end bg-gray-100 overflow-hidden rounded-lg drop-shadow-md border border-black">
      <div
        className="w-full will-change-transform bg-blue-700 transition-all"
        ref={indicatorRef}
      ></div>
    </div>
  );
}
