
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
    <div className="flex flex-col gap-4 w-full px-2">
      <div className="flex bg-card rounded-full shadow border border-border overflow-hidden">
        <input
          type="text"
          placeholder="Tell the robot what to do…"
          className="flex-1 px-6 py-3 text-base bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
          aria-label="Robot command input"
        />
        <button
          className="btn-accent px-6 font-semibold text-lg flex items-center gap-2 border-l border-border transition"
          onClick={handleSend}
          type="button"
          aria-label="Send command"
        >
          <Send className="inline w-5 h-5" /> Send
        </button>
      </div>
      <div className="flex flex-row gap-3 mt-1 justify-center">
        <button
          className={`rounded-full px-5 py-2 text-base font-semibold shadow-md transition border
            ${voiceActive ? "btn-active border-sky-400" : "btn-inactive border-border"}`}
          onClick={onVoice}
          type="button"
          aria-pressed={voiceActive}
        >
          Voice Command
        </button>
        <button
          className="btn-inactive rounded-full px-5 py-2 text-base font-semibold shadow-md border border-border"
          onClick={onShowCamera}
          type="button"
        >
          Show Camera
        </button>
        <button
          className="btn-destroy rounded-full px-5 py-2 text-base font-semibold shadow-md border border-destructive/50"
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
