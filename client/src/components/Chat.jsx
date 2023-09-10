import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import Message from "./Message";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const [input, setInput] = useState("");
  const onSubmit = (event) => {
    const date = new Date();
    event.preventDefault();
    socket
      .timeout(5000)
      .emit(
        "chat message",
        { message: input, date: `${date.getHours()}:${date.getMinutes()}` },
        () => {}
      );
    inputRef.current.value = "";
    setInput.value = "";
  };

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    function onMessage(value) {
      console.log("log", value);
      setMessages([...messages, value]);
    }

    socket.on("chat message", onMessage);

    return () => {
      socket.off("chat message", onMessage);
    };
  }, [messages]);
  return (
    <>
      <div className="container">
        <div className="chat-area">
          {messages.map((e, i) => {
            return (
              <Message
                message={e.message}
                date={e.date}
                bg={i % 2 == 0 ? null : "pink"}
              />
            );
          })}
        </div>
        <div className="input-area">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              onChange={(i) => setInput(i.target.value)}
              ref={inputRef}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      ;
    </>
  );
}
