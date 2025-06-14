import StaticImagePanel from "@/components/StaticImagePanel";
import CameraGrid from "@/components/CameraGrid";
import InputPanel from "@/components/InputPanel";
import RightTabsPanel from "@/components/RightTabsPanel";
import LandingPermissionModal from "@/components/LandingPermissionModal";
import React, { useState } from "react";

// Main robotic control interface
const Index = () => {
  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [voiceActive, setVoiceActive] = useState(true);

  // Simulate a session-ending event
  const handleEndSession = () => {
    setVoiceActive(false);
    // Could add more handling logic
  };

  // Modal permission handler
  const handlePermissionResult = (result: boolean) => {
    setPermissionsGranted(result);
    setShowPermissionModal(false);
  };

  // Handle command send
  const handleSendCommand = (text: string) => {
    alert(`Command sent: ${text}`);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans">
      <LandingPermissionModal
        open={showPermissionModal}
        onPermissionResult={handlePermissionResult}
      />
      <div className="flex flex-1 w-full max-w-[1700px] mx-auto my-5 gap-10 px-3">
        {/* LEFT PANEL */}
        <div className="bg-[#181818] rounded-2xl shadow-xl flex flex-col items-center pt-6 pb-4 px-4 min-w-[340px] max-w-[370px] flex-shrink-0 border-2 border-orange-900 h-[880px]">
          <StaticImagePanel />
          {/* Camera Thumbnails */}
          <div className="w-full mt-6 mb-2">
            <h3 className="text-lg font-bold text-orange-300 mb-1 text-center">Live Views</h3>
            <CameraGrid />
          </div>
        </div>
        {/* CENTER: CONTROLS */}
        <div className="flex flex-col items-center justify-end flex-1 min-w-[380px] max-w-[520px] gap-6">
          <div className="mb-8 w-full">
            {/* Empty space above for symmetry */}
          </div>
          <InputPanel
            onSend={handleSendCommand}
            onVoice={() => setVoiceActive((v) => !v)}
            onShowCamera={() => alert("Show Camera pressed (TBD)")}
            onEndSession={handleEndSession}
            voiceActive={voiceActive}
          />
        </div>
        {/* RIGHT: TABS */}
        <div className="bg-[#181818] rounded-2xl shadow-xl px-6 pt-5 pb-8 min-w-[430px] max-w-[590px] h-[880px] flex flex-col border-2 border-orange-900">
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
