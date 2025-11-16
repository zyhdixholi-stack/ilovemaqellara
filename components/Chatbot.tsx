import React, { useState, useRef, useEffect } from 'react';
import { generateContent } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (!isOpen && messages.length === 0) {
      setMessages([
        { role: 'model', content: t('chatbotWelcome') }
      ]);
    }
  }, [isOpen, messages.length, t]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isOpen && messages.length <= 1) { // If closing and only welcome message exists, update it
         setMessages([
            { role: 'model', content: t('chatbotWelcome') }
         ]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const prompt = `Përgjigju si një guidë turistike miqësore dhe e ditur për njësinë administrative Maqellarë në Dibër, Shqipëri. Përdoruesi pyeti: "${userInput}". Jep një përgjigje të dobishme dhe tërheqëse.`;
      const response = await generateContent(prompt, false, language);
      setMessages([...newMessages, { role: 'model', content: response.text }]);
    } catch (error) {
      console.error("Problem me Chatbot-in:", error);
      setMessages([...newMessages, { role: 'model', content: 'Ndjesë, pata një problem me lidhjen. Mund ta provoni sërish?' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-emerald-700 text-white p-4 rounded-full shadow-lg hover:bg-emerald-800 transition-transform transform hover:scale-110 z-50"
        aria-label="Hap bisedën me asistentin virtual"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-full max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 animate-fade-in-up">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b bg-emerald-700 text-white rounded-t-2xl">
            <h3 className="text-lg font-bold">{t('askTheGuide')}</h3>
            <button onClick={toggleChat} className="hover:bg-emerald-600 p-1 rounded-full" aria-label={t('closeChat')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl bg-gray-200 text-gray-800">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                        </div>
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Form */}
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={t('typeYourQuestion')}
                className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 disabled:bg-emerald-300 transition-colors"
                disabled={isLoading || !userInput.trim()}
                aria-label={t('sendMessage')}
              >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;