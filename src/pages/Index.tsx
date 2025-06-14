
import StaticImagePanel from "@/components/StaticImagePanel";
import CameraGrid from "@/components/CameraGrid";
import InputPanel from "@/components/InputPanel";
import RightTabsPanel from "@/components/RightTabsPanel";
import LandingPermissionModal from "@/components/LandingPermissionModal";
import React, { useState } from "react";

const Index = () => {
  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Pass info to Tabs so camera/audio access is forced only after modal positive interaction
  const handlePermissionResult = (result: boolean) => {
    setPermissionGranted(result);
    setShowPermissionModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <LandingPermissionModal
        open={showPermissionModal}
        onPermissionResult={handlePermissionResult}
      />
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto my-6 gap-8">
        {/* Left: Static image */}
        <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 min-w-[340px] max-w-[400px] flex-shrink-0 h-[700px]">
          <StaticImagePanel />
        </div>

        {/* Center: Camera grid + input */}
        <div className="flex flex-col min-w-[380px] max-w-[480px] flex-1">
          <div className="flex-1 mb-4">
            <CameraGrid />
          </div>
          <InputPanel />
        </div>

        {/* Right: Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 min-w-[420px] max-w-[500px] h-[700px] flex flex-col">
          <RightTabsPanel
            cameraAudioEnabled={permissionGranted}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
