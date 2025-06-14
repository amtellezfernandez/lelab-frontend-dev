
import * as React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onPermissionResult: (granted: boolean) => void;
}

const LandingPermissionModal: React.FC<Props> = ({ open, onPermissionResult }) => {
  const [error, setError] = React.useState<string | null>(null);
  const [trying, setTrying] = React.useState(false);

  const handleGrant = async () => {
    setError(null);
    setTrying(true);
    try {
      // Request both permissions up front
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      onPermissionResult(true);
    } catch (e) {
      setError("Permissions denied or unavailable. Please allow both camera and microphone access.");
      onPermissionResult(false);
    } finally {
      setTrying(false);
    }
  };

  React.useEffect(() => {
    // Autofocus and block background scroll while modal open
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-md mx-auto my-8 rounded-2xl border-0 shadow-lg bg-white p-8">
        <DialogTitle className="text-2xl font-bold mb-2">Access Required</DialogTitle>
        <DialogDescription className="text-base mb-4">
          This dashboard needs access to your device camera and microphone to use the Sensors panel.<br />
          Please allow permissions to continue.
        </DialogDescription>
        {error && <div className="mb-2 text-sm text-red-700 bg-red-50 rounded p-2">{error}</div>}
        <div className="flex gap-4 justify-end">
          <Button
            onClick={() => onPermissionResult(false)}
            variant="outline"
            className="font-semibold"
            disabled={trying}
          >
            Cancel
          </Button>
          <Button
            onClick={handleGrant}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold"
            disabled={trying}
          >
            {trying ? "Checking..." : "Allow Access"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LandingPermissionModal;
