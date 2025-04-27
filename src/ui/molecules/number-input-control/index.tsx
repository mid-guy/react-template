import DecrementButton from "../../atoms/button/decrement";
import IncrementButton from "../../atoms/button/increment";
import Input from "../../atoms/input";
import TooltipProvider from "../../atoms/tooltips/provider";
import Tooltip from "../../atoms/tooltips";
import TooltipTrigger from "../../atoms/tooltips/trigger";
import TooltipContent from "../../atoms/tooltips/content";

export default function NumberInputControl({
  inputValue,
  onDecrement,
  onIncrement,
  handleChange,
  handleBlur,
  disabled,
}: {
  inputValue: string;
  onDecrement: () => void;
  onIncrement: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  disabled: {
    decrement: boolean;
    increment: boolean;
  }
}) {
  return (
    <div className="flex w-[140px] bg-[#212121] has-[input:hover]:not-[:has(input:focus)]:bg-[#3B3B3B] has-[input:focus]:border-blue-500 rounded-[4px] overflow-hidden border border-transparent transition-all duration-150">
      <TooltipProvider delay={300}>
        <Tooltip>
          <TooltipTrigger>
            <DecrementButton onClick={onDecrement} disabled={disabled.decrement} />
          </TooltipTrigger>
          <TooltipContent>
            <span className="text-sm">Value must greater than 0</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Input
        className="flex-1 min-w-0 text-center outline-0 bg-transparent"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TooltipProvider delay={300}>
        <Tooltip>
          <TooltipTrigger>
            <IncrementButton onClick={onIncrement} disabled={disabled.increment} />
          </TooltipTrigger>
          <TooltipContent>
            <span className="text-sm">Value must smaller than 100</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}