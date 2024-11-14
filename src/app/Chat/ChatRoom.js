"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

let socket;

const ChatRoom = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [file, setFile] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    socket = io({ path: "/api/socket" });

    socket.on("connect", () => {
      setSocketConnected(true);
      console.log("Connected to WebSocket server");
      socket.emit("joinRoom", room);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [room]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const message = { user: "You", text: inputMessage, room, timestamp: new Date() };
      setMessages((prevMessages) => [...prevMessages, message]);
      socket.emit("sendMessage", message);
      setInputMessage("");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      const message = {
        user: "You",
        text: `File uploaded: ${response.data.file.filename}`,
        room,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, message]);
      socket.emit("sendMessage", message);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center bg-gray-800 text-white">
      <div className="chat-app flex flex-col md:flex-row w-full max-w-4xl bg-gray-700 rounded-lg shadow-lg overflow-hidden">
        {/* People List */}
        <div className="people-list w-full md:w-1/3 p-4 bg-gray-900 md:min-h-full overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Participants</h2>
          {/* Dummy data for participants */}
          <ul>
            <li className="p-2 hover:bg-gray-800 rounded cursor-pointer">User 1</li>
            <li className="p-2 hover:bg-gray-800 rounded cursor-pointer">User 2</li>
          </ul>
        </div>

        {/* Chat Room */}
        <div className="chat flex-1 flex flex-col h-full">
          {/* Chat Header */}
          <div className="chat-header p-4 border-b border-gray-600 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Room: {room}</h2>
          </div>

          {/* Chat History */}
          <div className="chat-history flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div key={index} className={`message-bubble mb-4 p-3 rounded ${msg.user === "You" ? "bg-blue-600 self-end" : "bg-gray-600 self-start"}`}>
                <p className="font-bold">{msg.user}</p>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="chat-footer p-4 border-t border-gray-600 flex flex-col md:flex-row items-center gap-2">
          <textarea
  className="textarea max-w-sm p-6 md:flex-1 md:p-4 bg-gray-800 rounded focus:outline-none resize-none lg:p-10"
  value={inputMessage}
  onChange={(e) => setInputMessage(e.target.value)}
  placeholder="Type a message..."
/>
            <button onClick={handleSendMessage} className="send-button px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">Send</button>
            <input type="file" onChange={handleFileChange} className="file-input md:w-auto" />
            <button onClick={handleFileUpload} className="upload-button px-4 py-2 bg-green-500 rounded hover:bg-green-600">Upload File</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          padding: 2px !important;
          transition: width 0.5s, background 2s ease !important;
        }

        /* Chat Room */
        .chat-container {
          z-index: 5;
          position: relative;
          width: var(--msger-width);
          height: var(--msger-height);
          min-width: var(--msger-width);
          min-height: var(--msger-height);
          padding: 3px;
          background: var(--msger-bg);
          border: var(--border);
          border-radius: 10px;
          box-shadow: var(--box-shadow);
          transition: background 1s;
        }

        /* Chat app container */
        .chat-app {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          overflow-y: auto;
          overflow-x: hidden;
        }

        /* Chat app people container */
        .chat-app .people-list {
          z-index: 6;
          position: absolute;
          padding: 20px;
          top: 0;
          left: 0;
          width: 300px;
          height: 99%;
          background: var(--msger-bg);
          overflow-y: auto;
          overflow-x: hidden;
        }

        /* Chat app people list container */
        .people-list {
          -moz-transition: 0.5s;
          -o-transition: 0.5s;
          -webkit-transition: 0.5s;
          transition: 0.5s;
        }

        .people-list .chat-list li {
          padding: 10px 15px;
          list-style: none;
          border-radius: 3px;
        }

        .people-list .chat-list li:hover {
          background: rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }

        .people-list .chat-list li.active {
          background: rgba(0, 0, 0, 0.2);
        }

        .people-list .chat-list li .name {
          color: #fff;
          font-size: 15px;
        }

        .people-list .chat-list img {
          width: 45px;
          border-radius: 50%;
        }

        .people-list img {
          float: left;
          border-radius: 50%;
        }

        .people-list .about {
          float: left;
          padding-left: 8px;
        }

        .people-list .about-buttons {
          margin-top: 35px;
          width: auto;
        }

        .people-list .status {
          color: #999;
          font-size: 13px;
        }

        /* Chat app people list container */
        .chat-app .chat-list {
          height: auto;
        }

        /* Chat app container */
        .chat-app .chat {
          position: relative;
          margin-left: 300px;
          border-left: var(--border);
          border-radius: 10px;
        }

        /* Chat header */
        .chat .chat-header {
          padding: 15px 20px;
          border-bottom: var(--border);
          height: 70px;
          max-height: 70px;
          cursor: move;
        }

        .all-participants-img {
          border: var(--border);
          width: 40px;
          margin-right: 5px;
          cursor: pointer;
        }

        .all-participants-img:hover {
          background-color: lime;
          transition: all 0.3s ease-in-out;
        }

        .chat .chat-header img {
          float: left;
          border-radius: 40px;
          width: 40px;
        }

        .chat .chat-header .chat-about {
          float: left;
          padding-left: 10px;
          color: #fff;
        }

        .chat .chat-header .status {
          color: #999;
          font-size: 13px;
        }

        .chat .chat-header .chat-option-buttons {
          position: absolute;
          display: inline-flex;
          top: 20px;
          right: 20px;
          z-index: 5;
        }

        /* Chat history */
        .chat .chat-history {
          padding: 20px;
          height: calc(100vh - 210px);
          min-height: 490px;
          max-height: 490px;
          border-bottom: var(--border);
          overflow-y: auto;
          overflow-x: hidden;
        }

        .chat .chat-history ul {
          padding: 0;
        }

        .chat .chat-history ul li {
          list-style-type: none;
          margin: 10px 0;
        }

        .chat .chat-history ul li .message-bubble {
          padding: 10px;
          border-radius: 5px;
          max-width: 300px;
          clear: both;
        }

        .chat .chat-history .message-bubble .message-info {
          font-size: 11px;
          color: #9a9a9a;
        }

        .chat .chat-footer {
          padding: 20px;
          background: #fff;
          border-top: var(--border);
          position: relative;
        }

        .chat .chat-footer .textarea {
          width: calc(100% - 80px);
          height: 40px;
          padding: 12px;
          border-radius: 4px;
          border: 1px solid #ddd;
          background-color: #f5f5f5;
        }

        .chat .chat-footer .textarea:focus {
          border-color: #b5d8e3;
          box-shadow: 0 0 10px rgba(67, 173, 242, 0.5);
        }

        .chat .chat-footer .send-button {
          margin-left: 10px;
          background-color: #4ab6b6;
          border: none;
          color: white;
          padding: 10px 20px;
          cursor: pointer;
        }

        .chat .chat-footer .send-button:hover {
          background-color: #3a9b9b;
        }

        .chat .chat-footer .file-input {
          margin-left: 10px;
          background-color: #4ab6b6;
          border: none;
          color: white;
          padding: 10px 20px;
          cursor: pointer;
        }

        .chat .chat-footer .file-input:hover {
          background-color: #3a9b9b;
        }

        .chat .chat-footer .upload-button {
          margin-left: 10px;
          background-color: #4ab6b6;
          border: none;
          color: white;
          padding: 10px 20px;
          cursor: pointer;
        }

        .chat .chat-footer .upload-button:hover {
          background-color: #3a9b9b;
        }
        .chat .chat-footer .textarea {
    width: 100%;
    height: 80px; /* Increase height */
    padding: 12px; /* Add more padding */
    border-radius: 8px; /* Round corners */
    border: 1px solid #ddd; /* Light border */
    background-color: #f5f5f5; /* Lighter background */
    resize: none; /* Disable resizing */
    transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Smooth transition */
  }

  .chat .chat-footer .textarea:focus {
    border-color: #4ab6b6; /* Focus border color */
    box-shadow: 0 0 10px rgba(67, 173, 242, 0.5); /* Focus shadow effect */
  }
      `}</style>
    </div>
  );
};

export default ChatRoom;
