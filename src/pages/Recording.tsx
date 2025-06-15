import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Square, SkipForward, RotateCcw } from "lucide-react";
import UrdfViewer from "@/components/UrdfViewer";
import UrdfProcessorInitializer from "@/components/UrdfProcessorInitializer";
import PhoneCameraFeed from "@/components/recording/PhoneCameraFeed";

interface RecordingConfig {
  leader_port: string;
  follower_port: string;
  leader_config: string;
  follower_config: string;
  dataset_repo_id: string;
  single_task: string;
  num_episodes: number;
  episode_time_s: number;
  reset_time_s: number;
  fps: number;
  video: boolean;
  push_to_hub: boolean;
  resume: boolean;
}

interface RecordingStatus {
  recording_active: boolean;
  current_episode: number;
  total_episodes: number;
  episode_time_remaining: number;
  reset_time_remaining: number;
  phase: "recording" | "resetting" | "waiting" | "completed";
  dataset_repo_id?: string;
  single_task?: string;
}

const Recording = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const recordingConfig = location.state?.recordingConfig as RecordingConfig;

  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>({
    recording_active: false,
    current_episode: 0,
    total_episodes: recordingConfig?.num_episodes || 0,
    episode_time_remaining: recordingConfig?.episode_time_s || 0,
    reset_time_remaining: recordingConfig?.reset_time_s || 0,
    phase: "waiting",
    dataset_repo_id: recordingConfig?.dataset_repo_id,
    single_task: recordingConfig?.single_task,
  });

  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    if (recordingConfig) {
      // Generate a session ID for this recording session
      const newSessionId = `recording_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);
    }
  }, [recordingConfig]);

  useEffect(() => {
    let eventSource: EventSource | null = null;

    if (recordingConfig) {
      const startRecording = async () => {
        try {
          const response = await fetch("http://localhost:8000/start-recording", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(recordingConfig),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to start recording.");
          }

          toast({
            title: "Recording Started",
            description: "The recording session has started.",
          });

          // Initialize EventSource after successful start
          eventSource = new EventSource("http://localhost:8000/recording-status");

          eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setRecordingStatus(data);
          };

          eventSource.onerror = (error) => {
            console.error("EventSource failed:", error);
            toast({
              title: "EventSource Error",
              description: "Failed to receive recording status updates.",
              variant: "destructive",
            });
            eventSource?.close();
          };
        } catch (error: any) {
          toast({
            title: "Error Starting Recording",
            description: error.message || "Could not start the recording session.",
            variant: "destructive",
          });
        }
      };

      startRecording();
    }

    return () => {
      // Close EventSource on unmount
      eventSource?.close();

      // Optionally stop recording if the component unmounts unexpectedly
      if (recordingStatus.recording_active) {
        stopRecording();
      }
    };
  }, [recordingConfig, toast]);

  const stopRecording = async () => {
    try {
      const response = await fetch("http://localhost:8000/stop-recording", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dataset_repo_id: recordingStatus.dataset_repo_id,
          single_task: recordingStatus.single_task,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Recording Stopped",
          description: data.message || "Successfully stopped recording session.",
        });
      } else {
        toast({
          title: "Error Stopping Recording",
          description: data.message || "Failed to stop recording session.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Could not connect to the backend server.",
        variant: "destructive",
      });
    }
  };

  const resetEpisode = async () => {
    try {
      const response = await fetch("http://localhost:8000/reset-episode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dataset_repo_id: recordingStatus.dataset_repo_id,
          single_task: recordingStatus.single_task,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Episode Reset",
          description: data.message || "Successfully reset episode.",
        });
      } else {
        toast({
          title: "Error Resetting Episode",
          description: data.message || "Failed to reset episode.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Could not connect to the backend server.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            size="icon"
            className="border-gray-600 hover:border-red-500 text-gray-300 hover:text-red-400"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold">Recording Session</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recording Controls and Status */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4">Recording Status</h2>
            <p>
              <strong>Status:</strong>{" "}
              {recordingStatus.phase === "recording"
                ? "Recording"
                : recordingStatus.phase === "resetting"
                  ? "Resetting"
                  : recordingStatus.phase === "waiting"
                    ? "Waiting"
                    : "Completed"}
            </p>
            <p>
              <strong>Episode:</strong> {recordingStatus.current_episode} /{" "}
              {recordingStatus.total_episodes}
            </p>
            <p>
              <strong>Episode Time Remaining:</strong>{" "}
              {recordingStatus.episode_time_remaining} seconds
            </p>
            <p>
              <strong>Reset Time Remaining:</strong>{" "}
              {recordingStatus.reset_time_remaining} seconds
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4">Recording Controls</h2>
            <div className="flex gap-4">
              <Button
                onClick={stopRecording}
                className="bg-red-500 hover:bg-red-600 text-white"
                disabled={!recordingStatus.recording_active}
              >
                <Square className="w-5 h-5 mr-2" />
                Stop Recording
              </Button>
              <Button
                onClick={resetEpisode}
                className="bg-blue-500 hover:bg-blue-600 text-white"
                disabled={recordingStatus.phase !== "waiting"}
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset Episode
              </Button>
              <Button
                onClick={() => {
                  // Skip to the next episode
                }}
                className="bg-green-500 hover:bg-green-600 text-white"
                disabled={recordingStatus.phase !== "waiting"}
              >
                <SkipForward className="w-5 h-5 mr-2" />
                Skip Episode
              </Button>
            </div>
          </div>
        </div>

        {/* Phone Camera Feed */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Phone Camera Feed</h2>
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            {sessionId ? (
              <PhoneCameraFeed sessionId={sessionId} />
            ) : (
              <p className="text-gray-400">
                No session ID available. Please start a recording session to
                enable the camera feed.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* URDF Viewer Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Robot Visualizer</h2>
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
          <UrdfProcessorInitializer />
          <UrdfViewer />
        </div>
      </div>
    </div>
  );
};

export default Recording;
