
import React, { useState, useEffect, useRef } from "react";

const VoiceBar: React.FC<{ active: boolean }> = ({ active }) => {
  const [volume, setVolume] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrame = useRef<number>();
  const micStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!active) {
      setVolume(0);
      setMicError(null);
      // Clean up
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
        micStreamRef.current = null;
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      return;
    }

    let mounted = true;
    
    const setupAudio = async () => {
      try {
        setMicError(null);
        console.log('Requesting microphone access...');
        
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          } 
        });
        
        if (!mounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        
        micStreamRef.current = stream;
        console.log('Microphone access granted');
        
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        await ctx.resume(); // Ensure context is running
        audioCtxRef.current = ctx;
        
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.8;
        source.connect(analyser);
        analyserRef.current = analyser;
        
        const buffer = new Uint8Array(analyser.frequencyBinCount);

        const animate = () => {
          if (!mounted || !analyser) return;
          
          analyser.getByteFrequencyData(buffer);
          
          // Calculate average volume
          const sum = buffer.reduce((a, b) => a + b, 0);
          const average = sum / buffer.length;
          const normalizedVolume = Math.min(average / 128, 1);
          
          setVolume(normalizedVolume);
          animationFrame.current = requestAnimationFrame(animate);
        };
        
        animate();
      } catch (error) {
        console.error('Microphone access failed:', error);
        setMicError('Microphone access denied or unavailable');
        setVolume(0);
      }
    };

    setupAudio();

    return () => {
      mounted = false;
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
        micStreamRef.current = null;
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [active]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-gray-800 w-40 h-3 rounded-full overflow-hidden border border-gray-700">
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{
            width: `${Math.max(volume * 100, 2)}%`,
            background: active 
              ? "linear-gradient(90deg, #ff9500 0%, #fbbf24 100%)" 
              : "linear-gradient(90deg, #6b7280 0%, #9ca3af 100%)",
          }}
        />
      </div>
      <span className="text-xs mt-1 text-orange-300 tracking-wider">
        {micError ? "Mic Error" : active ? "Listening..." : "Mic Off"}
      </span>
      {micError && (
        <span className="text-xs text-red-400 mt-1 text-center max-w-32">
          {micError}
        </span>
      )}
    </div>
  );
};

export default VoiceBar;
