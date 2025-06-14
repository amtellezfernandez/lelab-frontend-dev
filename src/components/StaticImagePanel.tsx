
import React from "react";

const StaticImagePanel = () => (
  <div className="w-full flex flex-col items-center pt-4 pb-2">
    <div className="relative w-64 h-64 bg-gradient-to-br from-neutral-800 via-black to-neutral-900 
      rounded-2xl shadow-xl border-2 border-orange-400 overflow-hidden flex items-center justify-center">
      {/* Replace below img with a proper 3D SVG, but using a static image for now */}
      <img
        src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=512&q=80"
        alt="Robotic arm 3D visual"
        className="object-contain w-56 h-56 select-none pointer-events-none drop-shadow-xl"
        draggable={false}
      />
    </div>
    <h2 className="text-xl font-bold mt-4 text-orange-400">Robotic Arm Visual</h2>
    <p className="text-sm text-gray-400">3D reference (static)</p>
  </div>
);

export default StaticImagePanel;
