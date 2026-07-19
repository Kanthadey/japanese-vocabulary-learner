import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Loader2, RefreshCw, Volume2, Sparkles, BookOpen } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function SenseiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `আসসালামু আলাইকুম! Hello! I am **Jahid Sensei**, your dedicated Japanese language tutor. 

Let's practice Japanese together! You can type anything in Hiragana, Katakana, Kanji, or Romaji. 

I am here to:
* Evaluate your Japanese sentences for correct particle usage.
* Teach you JLPT N5 / N4 vocabulary and grammar.
* Chat with you to build speaking confidence!

Try typing: *"わたし は がくせい です。"* or ask me any question about Japanese!`
    }
  ]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Voice playback of tutor response
  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      // Filter out markdown formatting from read-aloud text
      const cleanText = text.replace(/[*#_~]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "ja-JP"; // Voice engine tries Japanese first, fallback handles multilingual text
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput("");

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: userText
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: messages
        })
      });

      const data = await response.json();
      if (response.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.reply
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: `I'm sorry, I couldn't process that response correctly. (Error: ${data.error || "Tutor server error"}). Please make sure your GEMINI_API_KEY is configured correctly.`
          }
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry! I failed to connect to the tutoring backend. Please check your network connection."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    { label: "Introduce yourself!", text: "Please introduce yourself in Japanese and ask me a question!" },
    { label: "Check my particle rule", text: "Explain when to use は vs が particles in simple Bengali and English." },
    { label: "Start a simple roleplay", text: "Let's do a roleplay where we are meeting at a train station for the first time." }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[500px] max-w-4xl mx-auto glass-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in text-white">
      {/* Header */}
      <div className="bg-white/8 border-b border-white/10 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="block w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-xl font-bold font-sans shadow-md shadow-indigo-500/20">
              JS
            </span>
            <span className="absolute bottom-0 right-0 block w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900"></span>
          </div>
          <div>
            <h3 className="font-sans font-bold text-sm leading-tight text-white">Jahid Sensei</h3>
            <span className="text-[10px] text-white/50 font-mono">Expert Japanese Tutor • Online</span>
          </div>
        </div>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to clear your conversation history?")) {
              setMessages([messages[0]]);
            }
          }}
          className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Clear Conversation"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Chat Messages Stage */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-transparent scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 select-none text-xs font-bold ${
              msg.role === "user" ? "bg-white/15 text-white font-mono border border-white/10" : "bg-indigo-500 text-white font-sans"
            }`}>
              {msg.role === "user" ? "Me" : "JS"}
            </div>

            {/* Bubble */}
            <div className={`rounded-xl p-4 shadow-lg border space-y-2 relative group ${
              msg.role === "user"
                ? "bg-indigo-600/30 border-indigo-500/20 text-white rounded-tr-none"
                : "bg-white/8 border-white/10 text-white rounded-tl-none"
            }`}>
              <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                {msg.content}
              </div>

              {msg.role === "assistant" && (
                <div className="flex items-center justify-between border-t border-white/5 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleSpeak(msg.content)}
                    className="flex items-center gap-1 text-[10px] text-white/60 hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    <Volume2 size={12} /> Play Pronunciation
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 max-w-[85%] mr-auto items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold">
              JS
            </div>
            <div className="bg-white/8 border border-white/10 rounded-xl rounded-tl-none p-4 shadow-md flex items-center gap-2 text-xs text-white/60 font-mono">
              <Loader2 size={14} className="animate-spin text-indigo-400" />
              <span>Jahid Sensei is formulating grammar review...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      {messages.length === 1 && (
        <div className="p-3 border-t border-white/10 bg-white/5 flex flex-wrap gap-2 justify-center">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => setInput(prompt.text)}
              className="inline-flex items-center gap-1 text-[11px] bg-white/10 hover:bg-white/20 border border-white/10 text-indigo-300 px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
            >
              <Sparkles size={10} />
              {prompt.label}
            </button>
          ))}
        </div>
      )}

      {/* Input Stage */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-white/5 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Speak with Jahid Sensei in Japanese or ask questions..."
          className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus:border-indigo-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-white/5 disabled:text-white/30 text-white p-3 rounded-xl transition-colors shrink-0 flex items-center justify-center cursor-pointer shadow-lg shadow-indigo-500/10"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
