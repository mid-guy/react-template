import GroupButton from "./ui/molecules/group-button";
import NumberInputControl from "./ui/molecules/number-input-control";
import { Units, useCreateAppFunctions } from "./hooks/useCreateAppFunctions";


const App = () => {
  const {
    state,
    value,
    inputValue,
    min,
    handleChange,
    handleBlur,
    handleIncrement,
    handleDecrement,
    handleUnitChange
  } = useCreateAppFunctions();
  return (
    <div className="w-screen h-screen bg-neutral-950 flex items-center justify-center text-neutral-100">
      <div className="w-96 h-96 bg-[#303030] p-4 rounded-lg">
        <div className="flex w-[246px] justify-between items-center mb-4">
          <span className="text-lg text-[#AAAAAA]">Unit</span>
          <GroupButton state={state} handleUnitChange={handleUnitChange} />
        </div>
        <div className="flex w-[246px] justify-between items-center">
          <span className="text-lg text-[#AAAAAA]">Value</span>
          <NumberInputControl
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            handleChange={handleChange}
            handleBlur={handleBlur}
            inputValue={inputValue}
            disabled={{
              decrement: value <= min,
              increment: state === Units.PERCENT && value >= 100
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;