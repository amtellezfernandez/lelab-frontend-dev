
import StaticImagePanel from "@/components/StaticImagePanel";
import CameraGrid from "@/components/CameraGrid";
import InputPanel from "@/components/InputPanel";
import RightTabsPanel from "@/components/RightTabsPanel";
import LandingPermissionModal from "@/components/LandingPermissionModal";
import React, { useState } from "react";

const Index = () => {
  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [voiceActive, setVoiceActive] = useState(true);

  const handleEndSession = () => {
    setVoiceActive(false);
  };

  const handlePermissionResult = (result: boolean) => {
    setPermissionsGranted(result);
    setShowPermissionModal(false);
  };

  const handleSendCommand = (text: string) => {
    console.log(`Command sent: ${text}`);
    // Add actual command handling logic here
  };

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans">
      <LandingPermissionModal
        open={showPermissionModal}
        onPermissionResult={handlePermissionResult}
      />
      
      <div className="flex flex-1 w-full max-w-7xl mx-auto gap-4 p-4 min-h-screen">
        {/* LEFT PANEL - Static Image + Camera Grid */}
        <div className="bg-[#181818] rounded-2xl shadow-xl flex flex-col pt-4 pb-4 px-4 w-80 flex-shrink-0 border-2 border-orange-900">
          <StaticImagePanel />
          <div className="mt-4 mb-2">
            <h3 className="text-lg font-bold text-orange-300 mb-2 text-center">Live Views</h3>
            <CameraGrid />
          </div>
        </div>
        
        {/* CENTER PANEL - Controls */}
        <div className="flex flex-col justify-end flex-1 min-w-96 pb-8">
          <InputPanel
            onSend={handleSendCommand}
            onVoice={() => setVoiceActive((v) => !v)}
            onShowCamera={() => console.log("Show Camera pressed")}
            onEndSession={handleEndSession}
            voiceActive={voiceActive}
          />
        </div>
        
        {/* RIGHT PANEL - Tabs */}
        <div className="bg-[#181818] rounded-2xl shadow-xl px-4 pt-4 pb-4 w-96 flex-shrink-0 border-2 border-orange-900">
          <RightTabsPanel
            permissionsGranted={permissionsGranted}
            activeVoice={voiceActive}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
