import DropDown from "./DropDown";
export default function GraphControl() {
  function onDropdownUpdate(data: string) {}
  return (
    <div>
      <p>Graph Period</p>
      <div>Realtime</div>
      <DropDown
        data={[
          { label: "Realtime", value: "rt" },
          { label: "Periodic", value: "pd" },
        ]}
        // defaultValue={0}
        headerLabel="select"
        defaultValueIdx={0}
        onUpdate={onDropdownUpdate}
        style={{ width: 300 }}
      />
    </div>
  );
}
