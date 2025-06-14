import * as React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-md mx-auto my-8 rounded-3xl border-0 shadow-lg bg-card p-8">
        <DialogTitle className="text-2xl font-bold mb-2 text-primary text-center">
          Permissions Required
        </DialogTitle>
        <DialogDescription className="text-base mb-4 text-muted-foreground text-center">
          To control and monitor the robot, we need access to your camera and microphone.
        </DialogDescription>
        {error && <div className="mb-2 text-sm text-red-400 bg-destructive/20 rounded p-2 text-center">{error}</div>}
        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={() => onPermissionResult(false)}
            className="btn-inactive px-8 py-2 rounded-full font-semibold text-lg"
            disabled={trying}
          >
            Deny
          </button>
          <button
            onClick={handleGrant}
            className="btn-accent px-8 py-2 rounded-full font-semibold text-lg"
            disabled={trying}
          >
            {trying ? "Checking..." : "Allow"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LandingPermissionModal;
