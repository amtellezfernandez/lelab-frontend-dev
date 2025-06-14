
import { useState } from "react";
import { Button } from "@/components/ui/button";

const InputPanel = () => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      // Mock: send command to robot
      alert(`Command sent: ${text}`);
    }
    setText("");
  };

  return (
    <div className="bg-gray-200 rounded-xl p-3 flex items-center gap-2 shadow">
      <input
        type="text"
        placeholder="Tell the robot what to do..."
        className="flex-1 px-3 py-2 rounded-l-lg bg-white text-gray-800 border-none focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") handleSend();
        }}
        aria-label="Robot command input"
      />
      <Button
        className="rounded-r-lg px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        onClick={handleSend}
        type="button"
      >
        Send
      </Button>
    </div>
  );
};

export default InputPanel;
