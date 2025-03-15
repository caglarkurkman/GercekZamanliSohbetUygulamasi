import Image from "next/image";
import { useEffect } from "react";

export default function MessageBubble({
  message,
  sentAt,
  isSender,
  senderPicture,
  sender,
  messageRef,
}) {
  const bubbleClasses = isSender
    ? "bg-blue-500 text-white rounded-br-none rounded-lg"
    : "bg-gray-200 text-gray-800 rounded-tl-none rounded-lg rounded-bl-none rounded-br-none rounded-tl-none rounded-bl max-w-3xl";

  // Saati alma işlemi
  const convertedTime = new Date(sentAt ?? new Date()).toLocaleTimeString(
    "tr-TR",
    {
      hour: "numeric",
      minute: "numeric",
    }
  );

  return (
    <div
      className={`mb-5 ${isSender ? "text-right" : "text-left"}`}
      ref={messageRef}
    >
      {!isSender ? (
        <div>
          <Image
            className={`w-12 h-12 rounded-full ${
              isSender ? "float-right ml-3" : "float-left mr-3"
            }`}
            src={`/assets/` + senderPicture}
            height={36}
            width={36}
          ></Image>
        </div>
      ) : null}

      <div className={`px-4 py-2 inline-block ${bubbleClasses}`}>
        {!isSender ? <div className="font-bold">{sender}</div> : null}
        <div>{message}</div>
        <div className={`text-xs ${isSender ? "text-white" : "text-black"}`}>
          {convertedTime}
        </div>
      </div>
    </div>
  );
}
