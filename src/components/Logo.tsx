import React from 'react';
import { cn } from '@/lib/utils';
interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  iconOnly?: boolean;
}
const Logo: React.FC<LogoProps> = ({
  className,
  iconOnly = false
}) => {
  return <div className={cn("flex items-center gap-2", className)}>
      
      {!iconOnly && <span className="font-bold text-white text-2xl">LeLab</span>}
    </div>;
};
export default Logo;