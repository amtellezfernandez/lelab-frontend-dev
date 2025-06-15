
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEFAULT_PORT = "/dev/tty.usbmodem58760433651";
const JOINTS = [
  { name: "shoulder_pan.pos", label: "Shoulder Pan" },
  { name: "shoulder_lift.pos", label: "Shoulder Lift" },
  { name: "elbow_flex.pos", label: "Elbow Flex" },
  { name: "wrist_flex.pos", label: "Wrist Flex" },
  { name: "wrist_roll.pos", label: "Wrist Roll" },
  { name: "gripper.pos", label: "Gripper" }
];

type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

const FollowerArmControlCard: React.FC = () => {
  const [port, setPort] = useState(DEFAULT_PORT);
  const [jointValues, setJointValues] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [error, setError] = useState<string>("");

  const handleJointChange = (idx: number, value: string) => {
    const next = [...jointValues];
    next[idx] = value === "" ? 0 : parseFloat(value);
    setJointValues(next);
  };

  const connect = async () => {
    setStatus("connecting");
    setError("");
    try {
      const resp = await fetch("http://localhost:8000/follower/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          port,
          use_degrees: true,
          calibrate: false,
        }),
      });
      if (resp.ok) {
        setStatus("connected");
      } else {
        setStatus("error");
        const data = await resp.json();
        setError(data?.message ?? "Failed to connect.");
      }
    } catch (e: any) {
      setStatus("error");
      setError("Connection failed.");
    }
  };

  const send = async () => {
    setError("");
    if (status !== "connected") {
      setError("Please connect first.");
      return;
    }
    const actionPayload: Record<string, number> = {};
    JOINTS.forEach((j, idx) => { actionPayload[j.name] = jointValues[idx]}); 
    try {
      const resp = await fetch("http://localhost:8000/follower/send_action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          port,
          action: actionPayload,
        }),
      });
      if (!resp.ok) {
        const data = await resp.json();
        setError(data?.message ?? "Failed to send action.");
      }
    } catch (e: any) {
      setError("Failed to send action.");
    }
  };

  const disconnect = async () => {
    setError("");
    try {
      await fetch("http://localhost:8000/follower/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ port }),
      });
    } catch {}
    setStatus("disconnected");
  };

  return (
    <Card className="bg-gray-800/90 border-gray-700 rounded-2xl shadow-md mb-6">
      <CardHeader className="flex items-center gap-3 pb-2">
        <CardTitle className="flex items-center gap-2 text-lg text-yellow-400">
          Follower Arm Direct Control
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col sm:flex-row gap-3 items-center mb-2"
          onSubmit={e => { e.preventDefault(); connect(); }}
        >
          <Label htmlFor="follower-port" className="mr-1 min-w-[60px] flex-shrink-0">
            Port
          </Label>
          <Input
            id="follower-port"
            value={port}
            onChange={e => setPort(e.target.value)}
            className="bg-gray-700 border-gray-600 w-56 text-white"
            autoComplete="off"
            disabled={status === "connected"}
          />
          <Button
            type="submit"
            className="ml-2 bg-yellow-500 hover:bg-yellow-600"
            disabled={status === "connecting" || status === "connected"}
          >
            {status === "connecting" ? "Connecting..." : "Connect"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="ml-2"
            disabled={status !== "connected"}
            onClick={disconnect}
          >
            Disconnect
          </Button>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {JOINTS.map((j, idx) => (
            <div key={j.name} className="flex flex-col gap-1 items-center">
              <Label htmlFor={j.name} className="text-xs text-gray-200">{j.label}</Label>
              <Input
                id={j.name}
                type="number"
                min={-180}
                max={180}
                value={jointValues[idx]}
                onChange={e => handleJointChange(idx, e.target.value)}
                className="w-20 text-center bg-gray-700 border-gray-600 text-white rounded-full"
                step={1}
                disabled={status !== "connected"}
              />
            </div>
          ))}
        </div>
        {error && (
          <div className="text-sm text-red-400 text-center mb-2">{error}</div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center gap-3 pt-0">
        <Button
          type="button"
          onClick={send}
          className="bg-green-500 hover:bg-green-600 px-8"
          disabled={status !== "connected"}
        >
          Send to Follower
        </Button>
      </CardFooter>
      <div className="text-xs text-center text-gray-400 pb-3">
        {status === "connected"
          ? "Connected"
          : status === "connecting"
          ? "Connecting..."
          : "Disconnected"}
      </div>
    </Card>
  );
};

export default FollowerArmControlCard;
