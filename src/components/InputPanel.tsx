
import { useState } from "react";
import { Send } from "lucide-react";

const InputPanel = ({
  onSend,
  onVoice,
  onShowCamera,
  onEndSession,
  voiceActive,
}: {
  onSend: (text: string) => void;
  onVoice: () => void;
  onShowCamera: () => void;
  onEndSession: () => void;
  voiceActive: boolean;
}) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
    }
    setText("");
  };

  return (
    <div className="flex flex-col gap-3 w-full px-2">
      <div className="flex bg-[#181818] rounded-lg shadow border border-orange-900 overflow-hidden">
        <input
          type="text"
          placeholder="Tell the robot what to do…"
          className="flex-1 px-4 py-3 text-base bg-transparent outline-none text-white placeholder:text-gray-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
          aria-label="Robot command input"
        />
        <button
          className="btn-accent px-6 font-semibold text-lg flex items-center gap-1 border-l border-orange-700 transition"
          onClick={handleSend}
          type="button"
          aria-label="Send command"
        >
          <Send className="inline w-5 h-5" /> Send
        </button>
      </div>
      <div className="flex flex-row gap-4 mt-1 justify-center">
        <button
          className={`rounded-lg px-5 py-2 text-lg font-semibold shadow transition border-2
            ${voiceActive ? "btn-active border-blue-500" : "btn-inactive border-gray-600"}`}
          onClick={onVoice}
          type="button"
          aria-pressed={voiceActive}
        >
          Voice Command
        </button>
        <button
          className="btn-inactive rounded-lg px-5 py-2 text-lg font-semibold shadow border-2 border-gray-600"
          onClick={onShowCamera}
          type="button"
        >
          Show Camera
        </button>
        <button
          className="btn-destroy rounded-lg px-5 py-2 text-lg font-semibold shadow border-2 border-red-700"
          onClick={onEndSession}
          type="button"
        >
          End Session
        </button>
      </div>
    </div>
  );
};

export default InputPanel;
