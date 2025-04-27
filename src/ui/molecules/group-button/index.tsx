import { UnitState, Units } from "../../../hooks/useCreateAppFunctions";
import PercentButton from "../../atoms/button/percent";
import PixelButton from "../../atoms/button/pixel";

export default function GroupButton({ state, handleUnitChange }: { state: UnitState, handleUnitChange: (state: UnitState) => void }) {
  return (
    <div className="flex gap-[2px] w-[140px] bg-[#212121] rounded-[4px] border-2 border-[#212121]">
      <PercentButton
        className={state === Units.PERCENT ? "bg-[#424242] text-[#F9F9F9]" : "text-[#AAAAAA]"}
        onClick={() => handleUnitChange(Units.PERCENT)}
      />
      <PixelButton
        className={state === Units.PIXEL ? "bg-[#424242] text-[#F9F9F9]" : "text-[#AAAAAA]"}
        onClick={() => handleUnitChange(Units.PIXEL)}
      />
    </div>
  );
}