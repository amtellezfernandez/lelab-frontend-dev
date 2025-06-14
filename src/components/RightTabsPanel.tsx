
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartLegend, ChartLegendContent, ChartTooltipContent } from "@/components/ui/chart";
import VoiceBar from "./VoiceBar";
import WebcamPreview from "./WebcamPreview";
import { LineChart, Line, XAxis, YAxis } from "recharts";

const sensorChartColors = {
  pressure: "hsl(217 91% 60%)",
  torque: "hsl(175 60% 45%)",
  position: "hsl(198 80% 65%)",
  velocity: "hsl(290 70% 60%)",
};
const motorChartColors = {
  speed: "hsl(217 91% 60%)",
  current: "hsl(175 60% 45%)",
  temperature: "hsl(0 72% 51%)",
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
    <div className="flex-1 flex flex-col h-full">
      {/* TOP: CHARTS */}
      <div className="flex-1 flex flex-col min-h-0">
        <Tabs value={tab} onValueChange={setTab} className="flex-1 flex flex-col">
          <TabsList className="flex w-full bg-input rounded-full overflow-hidden shadow border-border mb-6 p-1">
            <TabsTrigger
              value="motors"
              className="flex-1 rounded-full px-6 py-1.5 text-base font-semibold text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md select-none transition-all uppercase"
            >
              MOTORS
            </TabsTrigger>
            <TabsTrigger
              value="sensors"
              className="flex-1 rounded-full px-6 py-1.5 text-base font-semibold text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md select-none transition-all uppercase"
            >
              SENSORS
            </TabsTrigger>
          </TabsList>
          <div className="flex-1 overflow-y-auto px-2 -mx-2 space-y-4">
            <TabsContent value="sensors" className="px-2 mt-0">
              <h3 className="text-lg font-bold mb-2 text-primary">Sensor Streams</h3>
              <div className="h-56 mb-4 bg-background p-3 rounded-3xl border border-border">
                <ChartContainer config={{
                  pressure: { color: sensorChartColors.pressure, label: "Pressure" },
                  torque: { color: sensorChartColors.torque, label: "Torque" },
                  position: { color: sensorChartColors.position, label: "Position" },
                  velocity: { color: sensorChartColors.velocity, label: "Velocity" },
                }}>
                  <LineChart data={sensorData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={tick => tick.toFixed(0)} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line type="monotone" dataKey="pressure" stroke="var(--color-pressure)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="torque" stroke="var(--color-torque)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="position" stroke="var(--color-position)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="velocity" stroke="var(--color-velocity)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ChartContainer>
              </div>
            </TabsContent>
            <TabsContent value="motors" className="px-2 mt-0">
              <h3 className="text-lg font-bold mb-2 text-primary">Motor Telemetry</h3>
              <div className="h-56 mb-4 bg-background p-3 rounded-3xl border border-border">
                <ChartContainer config={{
                  speed: { color: motorChartColors.speed, label: "Speed" },
                  current: { color: motorChartColors.current, label: "Current" },
                  temperature: { color: motorChartColors.temperature, label: "Temperature" },
                }}>
                  <LineChart data={motorData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={tick => tick.toFixed(0)} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line type="monotone" dataKey="speed" stroke="var(--color-speed)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="current" stroke="var(--color-current)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="temperature" stroke="var(--color-temperature)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ChartContainer>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      {/* BOTTOM: USER INTERACTION */}
      {permissionsGranted && (
        <div className="flex-shrink-0 flex flex-col items-center pt-6 mt-4 border-t border-border">
          <div className="flex flex-row items-center gap-4">
            <div>
              <WebcamPreview />
              <div className="text-muted-foreground text-xs mt-1 text-center">
                Live Webcam (You)
              </div>
            </div>
            <VoiceBar active={activeVoice} />
          </div>
        </div>
      )}
    </div>
  );
};
export default RightTabsPanel;
