import { ReactNode } from "react";
import { createPortal } from "react-dom";
import useTooltip from "../context";

interface TooltipContentProps {
  children: ReactNode;
}

export default function TooltipContent({ children }: TooltipContentProps) {
  const { isOpen, tooltipPosition } = useTooltip();

  // Don't render if tooltip is closed
  if (!isOpen || !tooltipPosition) return null;
  return createPortal(
    <div
      className="fixed z-50 px-3 py-1 text-sm text-white bg-[#212121] rounded-md shadow-lg"
      style={{
        transform: `translate(-50%, calc(-100% - 8px - 4px)`,
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y}px`,
        pointerEvents: 'none', // Prevent tooltip from blocking mouse events
      }}
    >
      {children}
      <div
        className="absolute w-0 h-0"
        style={{
          left: "50%",
          bottom: "-6px",
          transform: "translateX(-50%)",
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: "6px solid #212121"
        }}
      />
    </div>,
    document.body
  );
}