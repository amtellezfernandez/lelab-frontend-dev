
import React, { useRef, useEffect } from "react";

const WebcamPreview: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch {}
    })();

    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="rounded-2xl border-2 border-primary/80 overflow-hidden w-28 h-20 bg-black shadow-xl">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="object-cover w-full h-full"
      />
    </div>
  );
};
export default WebcamPreview;
