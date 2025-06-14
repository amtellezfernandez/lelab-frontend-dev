
import React, { useRef, useEffect, useState } from "react";

const WebcamPreview: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const setupCamera = async () => {
      try {
        setError(null);
        setLoading(true);
        
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 160 },
            height: { ideal: 120 },
            facingMode: 'user'
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setLoading(false);
        }
      } catch (err) {
        console.error('Camera access failed:', err);
        setError('Camera unavailable');
        setLoading(false);
      }
    };

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  if (error) {
    return (
      <div className="rounded-lg border-2 border-red-400 w-32 h-24 bg-red-900/20 flex items-center justify-center">
        <span className="text-xs text-red-400 text-center px-2">{error}</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-lg border-2 border-orange-400 w-32 h-24 bg-gray-800 flex items-center justify-center">
        <span className="text-xs text-orange-400">Loading...</span>
      </div>
    );
  }

  return (
    <div className="rounded-lg border-2 border-orange-400 overflow-hidden w-32 h-24 bg-black shadow-lg">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="object-cover w-full h-full mirror"
        style={{ transform: 'scaleX(-1)' }}
      />
    </div>
  );
};

export default WebcamPreview;
