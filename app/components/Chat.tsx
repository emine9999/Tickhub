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
  chat: Chat | null;
}

const Chat: React.FC<ChatProps> = ({ chat }) => {
  if (!chat) {
    return (
      <div className="flex items-center justify-center mr-24 text-black text-3xl  h-screen rounded-lg">
Comment puis-je vous aider ?
</div>
    );
  }

  return (
    <div className="flex flex-col w-full  max-h-fit overflow-hidden rounded-lg shadow-lg leading-9">
      {/* Chat header */}
      <div className="py-2 px-3 bg-cust-blue text-white font-semibold rounded-full w-fit">
        <h1 className="text-xl truncate">{chat.title}</h1>
      </div>
      
      {/* Messages container */}
      <div className="flex-grow p-4 overflow-y-auto bg-white">
        {chat.messages.map((message) => (
          <div 
            key={message.id} 
            className="mb-4 p-3 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center mb-1">
              <span className="font-bold text-blue-600">{message.user}</span>
              <span className="ml-2 text-xs text-gray-500">
                {new Date(message.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="pl-1 text-gray-800">
              {message.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;