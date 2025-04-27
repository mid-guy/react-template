import { ReactNode, useState } from 'react';
import { TooltipContext } from '../context';

interface TooltipProviderProps {
  children: ReactNode;
  delay?: number;
}

export default function TooltipProvider({
  children,
  delay = 100
}: TooltipProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number, y: number } | null>(null);

  const updateTooltipPosition = () => {
    if (!referenceElement) return;

    requestAnimationFrame(() => {
      const rect = referenceElement.getBoundingClientRect();
      const x = rect.left + (rect.width / 2);
      const y = rect.top;
      setTooltipPosition({ x, y });
    });
  };

  return (
    <TooltipContext.Provider
      value={{
        isOpen,
        setIsOpen,
        delay,
        referenceElement,
        setReferenceElement,
        tooltipPosition,
        updateTooltipPosition
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
}