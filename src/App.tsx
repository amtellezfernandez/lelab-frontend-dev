
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UrdfProvider } from "@/contexts/UrdfContext";
import { DragAndDropProvider } from "@/contexts/DragAndDropContext";
import { Toaster } from "@/components/ui/toaster";
import Landing from "@/pages/Landing";
import Teleoperation from "@/pages/Teleoperation";
import DirectFollower from "@/pages/DirectFollower";
import Calibration from "@/pages/Calibration";
import Recording from "@/pages/Recording";
import Training from "@/pages/Training";
import ReplayDataset from "@/pages/ReplayDataset";
import EditDataset from "@/pages/EditDataset";
import Upload from "@/pages/Upload";
import PhoneCamera from "@/pages/PhoneCamera";
import NotFound from "@/pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UrdfProvider>
          <DragAndDropProvider>
            <Router>
              <div className="min-h-screen bg-background">
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/teleoperation" element={<Teleoperation />} />
                  <Route path="/direct-follower" element={<DirectFollower />} />
                  <Route path="/calibration" element={<Calibration />} />
                  <Route path="/recording" element={<Recording />} />
                  <Route path="/training" element={<Training />} />
                  <Route path="/replay-dataset" element={<ReplayDataset />} />
                  <Route path="/edit-dataset" element={<EditDataset />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/phone-camera" element={<PhoneCamera />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
              </div>
            </Router>
          </DragAndDropProvider>
        </UrdfProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
