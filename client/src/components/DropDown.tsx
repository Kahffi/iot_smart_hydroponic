import { useMemo, useState } from "react";
import { v7 } from "uuid";

interface DropDownData {
  value: string;
  label: string;
}

interface DataWithID extends DropDownData {
  id: string;
}

type DropDownProps = {
  onUpdate: (value: string) => void;
  style?: React.CSSProperties;
  data: DropDownData[];
  headerLabel: string;
  defaultValueIdx?: number /* The default value is retrived from array */;
};

export default function DropDown({
  style,
  onUpdate,
  data,
  defaultValueIdx,
  headerLabel,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dataWithId = useMemo<DataWithID[]>(() => {
    return data.map((dropdownData) => ({ ...dropdownData, id: v7() }));
  }, [data]);

  const [currentValue, setCurrentValue] = useState<DataWithID | null>(
    defaultValueIdx !== undefined && defaultValueIdx < data.length
      ? dataWithId[defaultValueIdx]
      : null
  );

  function handleItemClick(dataObj: DataWithID) {
    setCurrentValue({ ...dataObj });
    setIsOpen(false);
    onUpdate(dataObj.value);
  }

  return (
    <div
      style={style}
      className={`w-full flex flex-col gap-1 bg-white transition-transform`}
    >
      {/* header */}
      <div
        className="shadow-md cursor-pointer p-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Header label */}
        {currentValue ? currentValue.label : headerLabel}
      </div>
      {/* Content */}
      {isOpen && (
        <div className="flex flex-col px-1 py-2  gap-1">
          {dataWithId.map((dataObj) => {
            return dataObj.id !== currentValue?.id ? (
              <div
                onClick={() => handleItemClick(dataObj)}
                key={dataObj.id}
                className="px-2 py-2 cursor-pointer hover:shadow-md rounded-lg hover:opacity-65"
              >
                <h2>{dataObj.label}</h2>
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}
