import React from "react";
import "./message.css";
export default function Message({
  message = "",
  date = "",
  bg = "aqua",
  p = "start",
}) {
  return (
    <div
      className="message-container"
      style={{ backgroundColor: bg, alignItems: p }}
    >
      <div className="message">{message}</div>
      <div className="date">{date}</div>
    </div>
  );
}
