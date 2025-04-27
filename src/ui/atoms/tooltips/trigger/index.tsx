import { ReactNode, useRef, useEffect } from "react";
import useTooltip from "../context";

interface TooltipTriggerProps {
  children: ReactNode;
}

export default function TooltipTrigger({
  children,
}: TooltipTriggerProps) {
  const { setIsOpen, delay, setReferenceElement, updateTooltipPosition } = useTooltip();
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setReferenceElement(triggerRef.current);
    }

    // Clean up on unmount
    return () => {
      setReferenceElement(null);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [setReferenceElement]);

  const handleMouseEnter = () => {
    updateTooltipPosition();
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(false);
  };

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}