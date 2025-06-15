
import React from "react";
import { useNavigate } from "react-router-dom";
import VisualizerPanel from "@/components/control/VisualizerPanel";
import { useToast } from "@/hooks/use-toast";

const DirectFollowerPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoBack = async () => {
    try {
      // Stop the direct follower control process before navigating back
      console.log("🛑 Stopping direct follower control...");
      const response = await fetch("http://localhost:8000/stop-direct-follower", {
        method: "POST",
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Direct follower control stopped:", result.message);
        toast({
          title: "Direct Follower Control Stopped",
          description:
            result.message ||
            "Direct follower control has been stopped successfully.",
        });
      } else {
        const errorText = await response.text();
        console.warn(
          "⚠️ Failed to stop direct follower control:",
          response.status,
          errorText
        );
        toast({
          title: "Warning",
          description: `Failed to stop direct follower control properly. Status: ${response.status}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("❌ Error stopping direct follower control:", error);
      toast({
        title: "Error",
        description: "Failed to communicate with the robot server.",
        variant: "destructive",
      });
    } finally {
      // Navigate back regardless of the result
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-2 sm:p-4">
      <div className="w-full h-[95vh] flex">
        <DirectFollowerVisualizerPanel onGoBack={handleGoBack} className="lg:w-full" />
      </div>
    </div>
  );
};

const DirectFollowerVisualizerPanel: React.FC<{
  onGoBack: () => void;
  className?: string;
}> = ({ onGoBack, className }) => {
  return (
    <div className={`w-full p-2 sm:p-4 ${className}`}>
      <div className="bg-gray-900 rounded-lg p-4 flex-1 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onGoBack}
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-bold text-white">LiveLab</span>
          </div>
          <div className="w-px h-6 bg-gray-700" />
          <h2 className="text-xl font-medium text-gray-200">Direct Follower Control</h2>
        </div>
        <div className="flex-1 bg-black rounded border border-gray-800 min-h-[50vh]">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Direct Follower Control Active</h3>
                <p className="text-gray-400">Send 6-axis commands directly to the follower arm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectFollowerPage;
