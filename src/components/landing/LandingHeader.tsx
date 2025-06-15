
import React from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface LandingHeaderProps {
  onShowInstructions: () => void;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ onShowInstructions }) => {
  return (
    <div className="text-center md:text-left space-y-4 w-full">
      <img src="/lovable-uploads/5e648747-34b7-4d8f-93fd-4dbd00aeeefc.png" alt="LiveLab Logo" className="mx-auto md:mx-0 h-20 w-20" />
      <div className="flex items-center gap-4 justify-center md:justify-start">
        <h1 className="text-5xl font-bold tracking-tight">LeLab</h1>
        <Button variant="ghost" size="icon" onClick={onShowInstructions} className="mt-1">
          <Info className="h-6 w-6 text-gray-400 hover:text-white" />
        </Button>
      </div>
      <p className="text-xl text-gray-400">LeRobot but on HFSpace.</p>
    </div>
  );
};
export default LandingHeader;
