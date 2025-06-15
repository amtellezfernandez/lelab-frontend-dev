
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import UrdfViewer from "../UrdfViewer";
import UrdfProcessorInitializer from "../UrdfProcessorInitializer";
import Logo from "@/components/Logo";

interface VisualizerPanelProps {
  onGoBack: () => void;
  className?: string;
}

const VisualizerPanel: React.FC<VisualizerPanelProps> = ({
  onGoBack,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full lg:w-1/2 p-2 sm:p-4 space-y-4 flex flex-col",
        className
      )}
    >
      <div className="bg-gray-900 rounded-lg p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onGoBack}
            className="text-gray-400 hover:text-white hover:bg-gray-800 flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Logo iconOnly={true} />
          <div className="w-px h-6 bg-gray-700" />
          <h2 className="text-xl font-medium text-gray-200">Teleoperation</h2>
        </div>
        <div className="flex-1 bg-black rounded border border-gray-800 min-h-[50vh] lg:min-h-0">
          {/* <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <RobotArm />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          </Canvas> */}
          <UrdfProcessorInitializer />
          <UrdfViewer />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((cam) => (
          <div
            key={cam}
            className="aspect-video bg-gray-900 rounded border border-gray-700 flex items-center justify-center"
          >
            <span className="text-gray-400 text-sm">Camera {cam}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualizerPanel;
