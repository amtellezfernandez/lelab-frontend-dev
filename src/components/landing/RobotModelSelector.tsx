
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
interface RobotModelSelectorProps {
  robotModel: string;
  onValueChange: (model: string) => void;
}
const RobotModelSelector: React.FC<RobotModelSelectorProps> = ({
  robotModel,
  onValueChange
}) => {
  return <>
      <h2 className="text-2xl font-semibold text-center text-white">
        Select Robot Model
      </h2>
      <RadioGroup value={robotModel} onValueChange={onValueChange} className="space-y-2">
        <div>
          <RadioGroupItem value="SO100" id="so100" className="sr-only" />
          <Label htmlFor="so100" className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800 border border-gray-700 cursor-pointer transition-all">
            <span className="w-6 h-6 rounded-full border-2 border-gray-500 flex items-center justify-center">
              {robotModel === "SO100" && <span className="w-3 h-3 rounded-full bg-orange-500" />}
            </span>
            <span className="text-lg flex-1">SO100</span>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="SO101" id="so101" className="sr-only" />
          <Label htmlFor="so101" className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800 border border-gray-700 cursor-pointer transition-all">
            <span className="w-6 h-6 rounded-full border-2 border-gray-500 flex items-center justify-center">
              {robotModel === "SO101" && <span className="w-3 h-3 rounded-full bg-orange-500" />}
            </span>
            <span className="text-lg flex-1">SO101</span>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="LeKiwi" id="lekiwi" className="sr-only" disabled />
          <Label htmlFor="lekiwi" className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800 border border-gray-700 cursor-not-allowed opacity-50 transition-all">
            <span className="w-6 h-6 rounded-full border-2 border-gray-500 flex items-center justify-center">
              {robotModel === "LeKiwi" && <span className="w-3 h-3 rounded-full bg-orange-500" />}
            </span>
            <div className="flex-1">
              <span className="text-lg">LeKiwi</span>
              <span className="text-xs text-gray-400 block">Not yet available</span>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </>;
};
export default RobotModelSelector;
