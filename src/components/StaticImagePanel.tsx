
const StaticImagePanel = () => (
  <div className="flex flex-col items-center justify-center w-full h-full">
    <img
      src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=480&q=80"
      alt="Robotic arm"
      className="rounded-xl object-cover h-[320px] w-[320px] mb-3 shadow"
      draggable={false}
    />
    <h2 className="text-xl font-bold text-gray-800 mt-2 mb-1">Robot Arm Visual</h2>
    <p className="text-gray-500 text-center">Static visualization of the robot.</p>
  </div>
);

export default StaticImagePanel;
