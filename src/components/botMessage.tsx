import Image from "next/image";
import { LoadingDots } from "./loadingDots";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function BotMessage(props: { message: string }) {
  return (
    <div className="flex flex-row">
      <Image
        className="mx-1 my-3 max-h-[20px]"
        src="/chatbot.png"
        alt="Chat"
        width={20}
        height={20}
      />
      <div className="mx-1 my-3 p-4 w-[75%] bg-white rounded-xl text-sm leading-tight">
        {props.message ? (
          <MarkdownPreview
            style={{
              background: "transparent",
              color: "black",
              fontSize: "12px",
            }}
            source={props.message}
          />
        ) : (
          <LoadingDots />
        )}
      </div>
    </div>
  );
}
