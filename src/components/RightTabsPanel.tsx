
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface Props {
  cameraAudioEnabled: boolean;
}

const RightTabsPanel: React.FC<Props> = ({ cameraAudioEnabled }) => {
  const [activeTab, setActiveTab] = React.useState("sensors");

  // For Sensors: display webcam/mic preview if granted
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
      <TabsList className="grid grid-cols-3 mb-6 bg-gray-200 rounded-lg overflow-hidden shadow">
        <TabsTrigger
          value="motors"
          className="!rounded-none px-6 py-2 text-lg font-bold data-[state=active]:bg-blue-600 data-[state=active]:text-white transition"
        >
          Motors
        </TabsTrigger>
        <TabsTrigger
          value="graphs"
          className="!rounded-none px-6 py-2 text-lg font-bold data-[state=active]:bg-slate-600 data-[state=active]:text-white transition"
        >
          Graphs
        </TabsTrigger>
        <TabsTrigger
          value="sensors"
          className="!rounded-none px-6 py-2 text-lg font-bold data-[state=active]:bg-green-600 data-[state=active]:text-white transition"
        >
          Sensors
        </TabsTrigger>
      </TabsList>
      <div className="flex-1 overflow-y-auto px-1">
        <TabsContent value="motors" className="px-2">
          <h3 className="text-xl font-bold mb-3">Motor Status</h3>
          <div className="w-full p-8 flex items-center justify-center bg-blue-50 rounded-md h-64 text-blue-700 text-lg font-semibold">
            Motor panel UI goes here
          </div>
        </TabsContent>
        <TabsContent value="graphs" className="px-2">
          <h3 className="text-xl font-bold mb-3">Graphs</h3>
          <div className="w-full p-8 flex items-center justify-center bg-slate-50 rounded-md h-64 text-slate-700 text-lg font-semibold">
            Graphs panel UI goes here
          </div>
        </TabsContent>
        <TabsContent value="sensors" className="px-2">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Camera className="inline-block" /> Live Sensors
          </h3>
          {!cameraAudioEnabled ? (
            <div className="min-h-[240px] flex items-center justify-center text-green-700 font-semibold bg-green-50 w-full rounded-lg">
              Waiting for device permission...
            </div>
          ) : (
            <SensorsPanel />
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
};

// --- Webcam and microphone preview ---
const SensorsPanel = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [audioSupported, setAudioSupported] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let stream: MediaStream | null = null;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (e) {
        setError("Unable to access microphone and/or camera.");
        setAudioSupported(false);
      }
    })();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex gap-4 flex-col items-center">
      {!error ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="rounded-lg shadow border w-full max-w-xs h-60 bg-black"
          />
          <div className="mt-2 px-3 py-1 rounded bg-green-200 text-green-800 font-medium text-center">
            Webcam + Microphone Enabled
          </div>
        </>
      ) : (
        <div className="text-red-700 font-semibold text-center bg-red-50 p-4 w-full rounded-lg">
          {error}
        </div>
      )}
      <div className="w-full flex gap-2 mt-3 justify-center">
        <Button variant="outline" className="cursor-not-allowed opacity-60">Record Audio (TBD)</Button>
        <Button variant="outline" className="cursor-not-allowed opacity-60">Show Data (TBD)</Button>
      </div>
    </div>
  );
};

export default RightTabsPanel;
