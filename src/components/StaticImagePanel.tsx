
import React from "react";

const StaticImagePanel = () => (
  <div className="w-full flex flex-col items-center pt-4 pb-2">
    <div className="relative w-64 h-64 bg-background
      rounded-3xl shadow-xl border-2 border-primary/50 overflow-hidden flex items-center justify-center">
      <img
        src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=512&q=80"
        alt="Robotic arm 3D visual"
        className="object-contain w-56 h-56 select-none pointer-events-none drop-shadow-xl"
        draggable={false}
      />
    </div>
    <h2 className="text-xl font-bold mt-4 text-primary">Robotic Arm Visual</h2>
    <p className="text-sm text-muted-foreground">3D reference (static)</p>
  </div>
);

export default StaticImagePanel;
