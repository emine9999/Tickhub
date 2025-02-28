// components/Chat.tsx
import React from 'react';

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  timestamp: string;
}

interface Chat {
  id: number;
  title: string;
  messages: ChatMessage[];
}

interface ChatProps {
  chat: Chat | null; // The selected chat
}

const Chat: React.FC<ChatProps> = ({ chat }) => {
  if (!chat) {
    return <div>Please select a chat to view the messages.</div>;
  }

  return (
    <div className="p-5">
      <h1>{chat.title}</h1>
      <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
        {chat.messages.map((message) => (
          <div key={message.id} style={{ marginBottom: '10px' }}>
            <strong>{message.user}</strong>: {message.message} <br />
            <small>{new Date(message.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
