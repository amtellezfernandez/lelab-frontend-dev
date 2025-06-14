
import React, { useState, useEffect, useRef } from "react";

// Animated audio input volume bar
const VoiceBar: React.FC<{ active: boolean }> = ({ active }) => {
  const [volume, setVolume] = useState(0);
  const audioCtxRef = useRef<null | AudioContext>(null);
  const analyserRef = useRef<null | AnalyserNode>(null);
  const animationFrame = useRef<number>();
  const micStreamRef = useRef<null | MediaStream>(null);

  useEffect(() => {
    if (!active) {
      setVolume(0);
      // Clean up
      if (audioCtxRef.current) {
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
    // Setup audio input + analyser
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micStreamRef.current = stream;
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioCtxRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        source.connect(analyser);
        analyser.fftSize = 256;
        analyserRef.current = analyser;
        const buffer = new Uint8Array(analyser.frequencyBinCount);

        function animate() {
          analyser.getByteTimeDomainData(buffer);
          let rms = Math.sqrt(buffer.reduce((sum, v) => sum + (v - 128) ** 2, 0) / buffer.length);
          rms = Math.min(Math.max(rms / 40, 0), 1);
          if (mounted) setVolume(rms);
          animationFrame.current = requestAnimationFrame(animate);
        }
        animate();
      } catch {
        setVolume(0);
      }
    })();

    return () => {
      mounted = false;
      if (audioCtxRef.current) {
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

  // Bar
  return (
    <div className="w-full mt-1 flex flex-col items-center">
      <div className="bg-gray-800 w-48 h-4 rounded-full overflow-hidden border border-gray-700">
        <div
          className="h-full transition-all duration-100 ease-in"
          style={{
            width: `${(volume * 100).toFixed(0)}%`,
            background: "linear-gradient(90deg, orange 0%, yellow 100%)",
          }}
        />
      </div>
      <span className="text-xs mt-1 text-orange-300 tracking-widest">Mic Level</span>
    </div>
  );
};
export default VoiceBar;
