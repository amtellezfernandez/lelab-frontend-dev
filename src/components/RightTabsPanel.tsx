
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import VoiceBar from "./VoiceBar";
import WebcamPreview from "./WebcamPreview";

const sensorChartColors = {
  pressure: "#FFD600",
  torque: "#FF9100",
  position: "#80D8FF",
  velocity: "#FF5252",
};
const motorChartColors = {
  speed: "#42A5F5",
  current: "#FFA726",
  temperature: "#EF5350",
};

// Mocked data for demos:
function getSensorData() {
  const t = Date.now();
  return Array.from({ length: 20 }, (_, i) => ({
    time: (t / 1000 - (19 - i)).toFixed(0),
    pressure: 60 + 10 * Math.sin(i / 2),
    torque: 30 + 4 * Math.cos(i / 3),
    position: 90 + 20 * Math.sin(i / 6),
    velocity: 70 + 15 * Math.cos(i / 5),
  }));
}
function getMotorData() {
  const t = Date.now();
  return Array.from({ length: 20 }, (_, i) => ({
    time: (t / 1000 - (19 - i)).toFixed(0),
    speed: 1100 + i * 10 + 90 * Math.sin(i / 2),
    current: 3.7 + Math.sin(i / 5),
    temperature: 45 + 2 * Math.sin(i),
  }));
}

const RightTabsPanel: React.FC<{
  permissionsGranted: boolean;
  activeVoice: boolean;
}> = ({ permissionsGranted, activeVoice }) => {
  const [tab, setTab] = React.useState("sensors");
  const [sensorData, setSensorData] = React.useState(getSensorData());
  const [motorData, setMotorData] = React.useState(getMotorData());

  // Simulate real-time data
  React.useEffect(() => {
    const intv = setInterval(() => {
      setSensorData(getSensorData());
      setMotorData(getMotorData());
    }, 1300);
    return () => clearInterval(intv);
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <Tabs value={tab} onValueChange={setTab} className="flex-1 flex flex-col">
        <TabsList className="flex w-full bg-[#222] rounded-xl overflow-hidden shadow border border-orange-900 mb-6">
          <TabsTrigger
            value="motors"
            className="flex-1 !rounded-none px-6 py-2 text-xl font-bold text-orange-500 data-[state=active]:bg-black data-[state=active]:text-yellow-300 data-[state=active]:border-b-4 border-yellow-400 select-none transition uppercase"
          >
            MOTORS
          </TabsTrigger>
          <TabsTrigger
            value="sensors"
            className="flex-1 !rounded-none px-6 py-2 text-xl font-bold text-orange-500 data-[state=active]:bg-black data-[state=active]:text-yellow-300 data-[state=active]:border-b-4 border-yellow-400 select-none transition uppercase"
          >
            SENSORS
          </TabsTrigger>
        </TabsList>
        <div className="flex-1 overflow-y-auto px-2">
          <TabsContent value="sensors" className="px-2">
            <h3 className="text-lg font-bold mb-2 text-yellow-400">Sensor Streams</h3>
            <div className="h-56 mb-4 bg-black p-3 rounded-2xl border-2 border-yellow-400">
              <ChartContainer config={{
                pressure: { color: sensorChartColors.pressure, label: "Pressure" },
                torque: { color: sensorChartColors.torque, label: "Torque" },
                position: { color: sensorChartColors.position, label: "Position" },
                velocity: { color: sensorChartColors.velocity, label: "Velocity" },
              }}>
                {({ ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend }) => (
                  <LineChart data={sensorData}>
                    <XAxis dataKey="time" stroke="#fff" />
                    <YAxis stroke="#fff" tickFormatter={tick => tick.toFixed(0)} />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend content={<ChartLegendContent />} />
                    <Line type="monotone" dataKey="pressure" stroke={sensorChartColors.pressure} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="torque" stroke={sensorChartColors.torque} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="position" stroke={sensorChartColors.position} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="velocity" stroke={sensorChartColors.velocity} strokeWidth={2} dot={false} />
                  </LineChart>
                )}
              </ChartContainer>
            </div>
          </TabsContent>
          <TabsContent value="motors" className="px-2">
            <h3 className="text-lg font-bold mb-2 text-yellow-400">Motor Telemetry</h3>
            <div className="h-56 mb-4 bg-black p-3 rounded-2xl border-2 border-yellow-400">
              <ChartContainer config={{
                speed: { color: motorChartColors.speed, label: "Speed" },
                current: { color: motorChartColors.current, label: "Current" },
                temperature: { color: motorChartColors.temperature, label: "Temperature" },
              }}>
                {({ ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend }) => (
                  <LineChart data={motorData}>
                    <XAxis dataKey="time" stroke="#fff" />
                    <YAxis stroke="#fff" tickFormatter={tick => tick.toFixed(0)} />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend content={<ChartLegendContent />} />
                    <Line type="monotone" dataKey="speed" stroke={motorChartColors.speed} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="current" stroke={motorChartColors.current} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="temperature" stroke={motorChartColors.temperature} strokeWidth={2} dot={false} />
                  </LineChart>
                )}
              </ChartContainer>
            </div>
          </TabsContent>
          {permissionsGranted && (
            <div className="flex flex-col items-center mt-4">
              <div className="flex flex-row items-center gap-4">
                <div>
                  <WebcamPreview />
                  <div className="text-gray-400 text-xs mt-1 text-center">
                    Live Webcam (You)
                  </div>
                </div>
                <VoiceBar active={activeVoice} />
              </div>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};
export default RightTabsPanel;

