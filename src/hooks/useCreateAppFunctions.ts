import { useRef, useState } from "react";

export enum Units {
  PIXEL = "pixel",
  PERCENT = "percent",
}

export type UnitState = Units.PERCENT | Units.PIXEL;

export const useCreateAppFunctions = () => {
  const [state, setState] = useState<Units>(Units.PERCENT);
  const [value, setValue] = useState<number>(0);
  const [inputValue, setInputValue] = useState('0');
  const previousUnit = useRef(Units.PERCENT);
  const max = state === Units.PERCENT ? 100 : Infinity;
  const min = 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;

    // Replace commas with periods
    let processed = inputText.replace(',', '.');

    // Remove any characters that aren't digits, periods or minus signs
    processed = processed.replace(/[^\d.-]/g, '');

    // Ensure there's only one decimal point
    const parts = processed.split('.');
    if (parts.length > 2) {
      processed = parts[0] + '.' + parts.slice(1).join('');
    }

    // Ensure there's only one minus sign at the beginning
    if (processed.indexOf('-') !== -1 && processed.indexOf('-') !== 0) {
      processed = processed.replace(/-/g, '');
    }

    setInputValue(processed);

    // Update the numeric value if it's a valid number
    if (processed === '' || processed === '-' || processed === '.') {
      setValue(0);
    } else {
      const numericValue = parseFloat(processed);
      if (!isNaN(numericValue)) {
        setValue(numericValue);
      }
    }
  };

  const handleBlur = () => {
    let finalValue = value;

    // Apply min/max constraints
    if (value < min) {
      finalValue = min;
    } else if (state === Units.PERCENT && value > 100) {
      finalValue = 100;
    } else if (value > max) {
      finalValue = max;
    }

    setValue(finalValue);
    setInputValue(finalValue.toString());
  };

  const handleIncrement = () => {
    const newValue = Math.min(value + 1, max);
    setValue(newValue);
    setInputValue(newValue.toString());
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - 1, min);
    setValue(newValue);
    setInputValue(newValue.toString());
  };

  const handleUnitChange = (newUnit: Units) => {
    if (previousUnit.current !== newUnit) {
      if (newUnit === Units.PERCENT && value > 100) {
        setValue(100);
        setInputValue('100');
      }
      previousUnit.current = newUnit;
      setState(newUnit);
    }
  };

  return {
    state,
    value,
    inputValue,
    previousUnit,
    max,
    min,
    handleChange,
    handleBlur,
    handleIncrement,
    handleDecrement,
    handleUnitChange
  };
};