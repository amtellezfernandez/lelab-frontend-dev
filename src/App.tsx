import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Teleoperation from "./pages/Teleoperation";
import Recording from "./pages/Recording";
import Training from "./pages/Training";
import Calibration from "./pages/Calibration";
import EditDataset from "./pages/EditDataset";
import ReplayDataset from "./pages/ReplayDataset";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DragAndDropProvider } from "./contexts/DragAndDropContext";
import { UrdfProvider } from "./contexts/UrdfContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PhoneCamera from "./pages/PhoneCamera";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UrdfProvider>
          <DragAndDropProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/control" element={<Teleoperation />} />
                <Route path="/recording" element={<Recording />} />
                <Route path="/training" element={<Training />} />
                <Route path="/calibration" element={<Calibration />} />
                <Route path="/edit-dataset" element={<EditDataset />} />
                <Route path="/replay-dataset" element={<ReplayDataset />} />
                <Route path="/phone-camera" element={<PhoneCamera />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </BrowserRouter>
          </DragAndDropProvider>
        </UrdfProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
