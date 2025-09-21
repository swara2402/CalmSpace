import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message, Sender } from '../types';
import { ai } from '../services/geminiServiceReal';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Memoize the chat instance creation to avoid re-creating it on every render
  const chat = useRef(ai.chats.create({ model: 'gemini-2.5-flash' })).current;

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(async (inputText: string) => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputText,
      sender: Sender.USER,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const aiMessageId = `ai-${Date.now()}`;
    // Add a placeholder for the AI response
    setMessages(prev => [...prev, { id: aiMessageId, text: '', sender: Sender.AI, timestamp: new Date().toISOString() }]);

    try {
      const stream = await chat.sendMessageStream({ message: inputText });
      // FIX: Updated stream handling to access the .text property of the chunk,
      // aligning with the Gemini API and the updated mock service.
      for await (const chunk of stream) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === aiMessageId ? { ...msg, text: chunk.text } : msg
          )
        );
      }
    } catch (error) {
      console.error("Error streaming response:", error);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === aiMessageId ? { ...msg, text: "I'm sorry, I encountered an issue. Please try again." } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, chat]);

  return (
    <div
      className="flex flex-col h-full max-w-5xl mx-auto bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/30 dark:border-gray-700/30 overflow-hidden relative"
      style={{
        backgroundImage: 'url("/chat.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-[2px]"></div>

      <div className="relative p-6 border-b border-white/30 dark:border-gray-700/30 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
            <i className="fa-solid fa-brain text-white text-lg"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">CalmSpace Companion</h1>
        </div>
        <div className="absolute top-4 right-4">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50"></div>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 relative z-10">
        {messages.map((msg, index) => (
          <div key={msg.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <MessageBubble message={msg} />
          </div>
        ))}
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 animate-fade-in-up">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-lg mb-4">
              <i className="fa-solid fa-brain text-white text-3xl"></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Welcome to CalmSpace</h2>
            <p className="mt-1">I'm here to listen. What's on your mind today?</p>
          </div>
        )}
        {isLoading && messages[messages.length - 1]?.sender === Sender.USER && (
           <div className="animate-fade-in-up">
             <MessageBubble message={{id: 'typing', text: '...', sender: Sender.AI, timestamp: ''}} />
           </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <InputBar onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;
