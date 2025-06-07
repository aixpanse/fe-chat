"use client";
import BotMessage from "@/components/botMessage";
import UserMessage from "@/components/userMessage";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { getMessages, postMessage, verifyStoredThreadId } from "./utils";
import { Message } from "./types";
import { SendButton } from "@/components/sendButton";
import { ChatBar } from "@/components/chatBar";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      await verifyStoredThreadId("user");
      try {
        const data = await getMessages("user");
        setMessages(data);
        scrollToBottom();
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    setMessages([
      ...messages,
      { type: "human", content: inputValue },
      { type: "ai", content: "" },
    ]);

    setInputValue("");

    scrollToBottom();

    try {
      const stream = await postMessage(inputValue, "user", isLogged);
      await streamAiResponse(stream);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const streamAiResponse = async (stream: ReadableStream | null) => {
    if (!stream) return;

    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let content = "";
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Process complete lines
      const lines = buffer.split("\n");
      buffer = lines.pop() || ""; // Save incomplete line for next iteration

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.replace("data: ", "").trim();
          try {
            let msg;
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed)) {
              msg = parsed[0];
            } else {
              msg = parsed;
            }
            if (msg?.type === "ai" && msg?.content) content = msg.content;
          } catch (error) {
            console.error("Error parsing message:", error);
            // Don't throw, just skip if partial JSON
          }

          setMessages((prev) => {
            prev[prev.length - 1].content = content;
            return [...prev];
          });
          scrollToBottom();
        }
      }
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSendMessage();
      event.preventDefault();
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    });
  };

  const handleOrdersClick = async (newOrder: boolean) => {
    const message = newOrder
      ? "Pokaz tylko nowe zamowienia"
      : "Pokaz wszystkie zamowienia";

    setMessages([
      ...messages,
      {
        type: "human",
        content: message,
      },
      { type: "ai", content: "" },
    ]);

    scrollToBottom();

    try {
      const stream = await postMessage(message, "user", isLogged);
      await streamAiResponse(stream);
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleLoginClick = async (isLoggedIn: boolean) => {
    setIsLogged(isLoggedIn);
  };

  return (
    <div className="flex flex-col items-center justify-items-center w-full bg-gray-100">
      <div className="w-full h-15 shadow-lg shadow-gray-250">
        <ChatBar onOrdersClick={handleOrdersClick} onLoginClick={handleLoginClick} />
      </div>
      <div className="w-full h-120 p-4 flex flex-col overflow-y-auto overflow-x-hidden">
        {messages.map((m, i) =>
          m.type === "ai" ? (
            <BotMessage key={i} message={m.content} />
          ) : (
            <UserMessage key={i} message={m.content} />
          )
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="w-full h-25 pl-4 pr-4 relative flex items-center">
        <textarea
          rows={1}
          className="text-base py-5 pb-3 pl-2 pr-12 h-15 resize-none overflow-y-auto w-full text-sm text-gray-900 bg-white rounded-lg border border-[1px] border-gray-300 focus:border-[#2B2738]"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <SendButton onClick={handleSendMessage} disabled={!inputValue} />
      </div>
    </div>
  );
}
