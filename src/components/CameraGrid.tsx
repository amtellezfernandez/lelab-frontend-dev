import React from "react";

const cameraFeeds = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=240&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=240&q=80",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=240&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=240&q=80",
];

const CameraGrid: React.FC = () => (
  <div className="w-full px-2">
    <div className="grid grid-cols-2 grid-rows-2 gap-3 bg-background rounded-2xl p-2 border border-border aspect-[4/3] shadow-inner relative">
      {cameraFeeds.map((src, idx) => (
        <div
          key={idx}
          className="rounded-xl bg-black border border-border/50 flex items-center justify-center overflow-hidden aspect-[4/3]"
        >
          <img
            src={src}
            alt={`Camera view ${idx + 1}`}
            className="object-cover w-full h-full"
            draggable={false}
          />
        </div>
      ))}
    </div>
  </div>
);

export default CameraGrid;
