import React from 'react';
import { Message, Sender } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-bounce"></div>
    </div>
);

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;
  const isTyping = message.text === '...';

  const bubbleClasses = isUser
    ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-br-sm shadow-lg shadow-purple-500/25'
    : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-800 dark:text-gray-200 border border-white/40 dark:border-gray-600/40 rounded-bl-sm shadow-lg shadow-gray-900/5';

  const containerClasses = isUser ? 'justify-end' : 'justify-start';

  return (
    <div className={`flex items-end gap-4 ${containerClasses} group`}>
       {!isUser && (
         <div className="relative flex-shrink-0">
           <div className="w-10 h-10 bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
             <i className="fas fa-heart text-white text-sm"></i>
           </div>
           <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
         </div>
       )}

      <div
        className={`max-w-md md:max-w-lg lg:max-w-xl px-5 py-4 rounded-2xl transition-all duration-300 transform group-hover:scale-[1.02] ${bubbleClasses}`}
      >
        {isTyping && !isUser ? (
          <TypingIndicator />
        ) : (
          <div className="space-y-2">
            <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{message.text}</p>
            <div className={`text-xs opacity-70 ${isUser ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'}`}>
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
          <i className="fas fa-user text-white text-sm"></i>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
