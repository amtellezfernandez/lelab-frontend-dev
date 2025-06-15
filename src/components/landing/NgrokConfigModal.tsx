import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Globe, Wifi, WifiOff, ExternalLink } from "lucide-react";
import { useApi } from "@/contexts/ApiContext";
import { useToast } from "@/hooks/use-toast";

interface NgrokConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NgrokConfigModal: React.FC<NgrokConfigModalProps> = ({
  open,
  onOpenChange,
}) => {
  const {
    ngrokUrl,
    isNgrokEnabled,
    setNgrokUrl,
    resetToLocalhost,
    fetchWithHeaders,
  } = useApi();
  const [inputUrl, setInputUrl] = useState(ngrokUrl);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!inputUrl.trim()) {
      resetToLocalhost();
      toast({
        title: "Ngrok Disabled",
        description: "Switched back to localhost mode.",
      });
      onOpenChange(false);
      return;
    }

    setIsTestingConnection(true);

    try {
      // Clean the URL
      let cleanUrl = inputUrl.trim();
      if (!cleanUrl.startsWith("http")) {
        cleanUrl = `https://${cleanUrl}`;
      }
      cleanUrl = cleanUrl.replace(/\/$/, "");

      // Test the connection
      const testResponse = await fetchWithHeaders(`${cleanUrl}/health`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (testResponse.ok) {
        setNgrokUrl(cleanUrl);
        toast({
          title: "Ngrok Configured Successfully",
          description: `Connected to ${cleanUrl}. All API calls will now use this URL.`,
        });
        onOpenChange(false);
      } else {
        throw new Error(`Server responded with status ${testResponse.status}`);
      }
    } catch (error) {
      console.error("Failed to connect to ngrok URL:", error);
      toast({
        title: "Connection Failed",
        description: `Could not connect to ${inputUrl}. Please check the URL and ensure your ngrok tunnel is running.`,
        variant: "destructive",
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleReset = () => {
    resetToLocalhost();
    setInputUrl("");
    toast({
      title: "Reset to Localhost",
      description: "All API calls will now use localhost:8000.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white sm:max-w-[500px] p-8">
        <DialogHeader>
          <div className="flex justify-center items-center mb-4">
            <Globe className="w-8 h-8 text-blue-500" />
          </div>
          <DialogTitle className="text-white text-center text-2xl font-bold">
            Ngrok Configuration
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-center">
            Configure ngrok tunnel for external access and phone camera
            features.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Status */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              {isNgrokEnabled ? (
                <Wifi className="w-5 h-5 text-green-500" />
              ) : (
                <WifiOff className="w-5 h-5 text-gray-500" />
              )}
              <span className="font-semibold">
                Current Mode: {isNgrokEnabled ? "Ngrok" : "Localhost"}
              </span>
            </div>
            <p className="text-sm text-gray-400">
              {isNgrokEnabled
                ? `Using: ${ngrokUrl}`
                : "Using: http://localhost:8000"}
            </p>
          </div>

          {/* URL Input */}
          <div className="space-y-2">
            <Label
              htmlFor="ngrokUrl"
              className="text-sm font-medium text-gray-300"
            >
              Ngrok URL
            </Label>
            <Input
              id="ngrokUrl"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://abc123.ngrok.io"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <p className="text-xs text-gray-500">
              Enter your ngrok tunnel URL. Leave empty to use localhost.
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-400 mb-2">
              Setup Instructions:
            </h3>
            <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
              <li>
                Install ngrok:{" "}
                <code className="bg-gray-800 px-1 rounded">
                  npm install -g ngrok
                </code>
              </li>
              <li>Start your backend server on port 8000</li>
              <li>
                Run:{" "}
                <code className="bg-gray-800 px-1 rounded">
                  ngrok http 8000
                </code>
              </li>
              <li>Copy the HTTPS URL (e.g., https://abc123.ngrok.io)</li>
              <li>Paste it above and click "Save Configuration"</li>
            </ol>
          </div>

          {/* Benefits */}
          <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
            <h3 className="font-semibold text-green-400 mb-2">
              Why use Ngrok?
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Access your robot from anywhere on the internet</li>
              <li>• Use phone cameras as secondary recording angles</li>
              <li>• Share your robot session with remote collaborators</li>
              <li>• Test your setup from different devices</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              onClick={handleSave}
              disabled={isTestingConnection}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg transition-all shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40"
            >
              {isTestingConnection ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Testing Connection...
                </>
              ) : (
                <>
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Save Configuration
                </>
              )}
            </Button>

            {isNgrokEnabled && (
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full sm:w-auto border-orange-500 hover:border-orange-400 text-orange-400 hover:text-orange-300 px-8 py-3 text-lg"
              >
                Reset to Localhost
              </Button>
            )}

            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="w-full sm:w-auto border-gray-500 hover:border-gray-200 px-8 py-3 text-lg text-zinc-500 bg-zinc-900 hover:bg-zinc-800"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NgrokConfigModal;
