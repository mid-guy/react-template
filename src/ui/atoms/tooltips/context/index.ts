import { createContext, useContext } from 'react';

interface Position {
  x: number;
  y: number;
}

interface TooltipContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  delay: number;
  referenceElement: HTMLElement | null;
  setReferenceElement: (element: HTMLElement | null) => void;
  tooltipPosition: Position | null;
  updateTooltipPosition: () => void;
}

// Create the context with default values
export const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

// Custom hook to use the tooltip context
export default function useTooltip() {
  const context = useContext(TooltipContext);
  if (context === undefined) {
    throw new Error("useTooltip must be used within a TooltipProvider");
  }
  return context;
};