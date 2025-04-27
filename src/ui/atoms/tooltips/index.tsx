import { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
}

export default function Tooltip({ children }: TooltipProps) {
  return <div className="relative inline-block">{children}</div>;
};


