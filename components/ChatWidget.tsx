import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, X, MessageSquare, Sparkles, Loader2, AlertTriangle, Trash2, Copy, Check, Volume2, StopCircle } from 'lucide-react';
import { Message, Role } from '../types';
import { sendMessageToGemini, generateSpeechWithGemini, transcribeAudioWithGemini } from '../services/geminiService';

// ... (Decode helpers)
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- Message Content Parser ---
const MessageContent: React.FC<{ text: string; isLightMode?: boolean }> = ({ text, isLightMode }) => {
  const lines = text.split('\n');
  return (
    <div className="space-y-3 font-sans">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('🔹')) {
          return (
            <h2 key={index} className="mt-4 mb-2 text-sm font-bold uppercase tracking-wider text-champagne-500 border-b border-white/10 pb-2">
              {trimmed.replace(/🔹|\*\*/g, '').trim()}
            </h2>
          );
        }
        if (trimmed.startsWith('# ')) {
          return <h1 key={index} className="text-lg font-display font-bold mb-2">{trimmed.replace('# ', '').replace(/\*\*/g, '')}</h1>;
        }
        if (trimmed.toLowerCase().includes('disclaimer')) {
           return (
             <div key={index} className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-500 flex gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{trimmed.replace(/\*\*/g, '').replace('Disclaimer', '').replace(':', '').trim()}</span>
             </div>
           )
        }
        if (trimmed.startsWith('•') || trimmed.startsWith('* ')) {
            return (
                <div key={index} className="flex items-start gap-3 ml-1 mb-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-champagne-400 shrink-0 block"></span>
                    <span className="text-sm leading-relaxed opacity-90">{parseBold(trimmed.replace(/^[•*]\s*/, ''), isLightMode)}</span>
                </div>
            )
        }
        if (trimmed === '') return <div key={index} className="h-2"></div>;
        return <p key={index} className="text-sm leading-relaxed opacity-90">{parseBold(trimmed, isLightMode)}</p>;
      })}
    </div>
  );
};

const parseBold = (text: string, isLightMode?: boolean) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-champagne-400">{part.slice(2, -2)}</strong>;
    }
    const linkParts = part.match(/\[(.*?)\]\((.*?)\)/);
    if (linkParts) return <a key={i} href={linkParts[2]} target="_blank" className="text-lightblue-400 underline">{linkParts[1]}</a>;
    return part;
  });
};

// --- Updated Language Selector ---
const LanguageSelector: React.FC<{ onSelect: (lang: string) => void; isLightMode?: boolean }> = ({ onSelect, isLightMode }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' }
  ];

  return (
    <div className="flex flex-col h-full items-center justify-center p-8 text-center space-y-8 animate-slide-up">
      <div className={`p-5 rounded-full ${isLightMode ? 'bg-steelblue-100 text-steelblue-700' : 'bg-steelblue-800 text-champagne-500'}`}>
        <Sparkles className="h-8 w-8" />
      </div>
      <div>
        <h3 className={`text-2xl font-display font-bold mb-2 ${isLightMode ? 'text-steelblue-900' : 'text-white'}`}>Select Language</h3>
        <p className="text-sm opacity-60">Choose your preferred language to start legal consultation</p>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full max-h-[300px] overflow-y-auto scrollbar-thin">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang.name)}
            className={`p-4 rounded-xl font-bold transition-all border text-sm ${
              isLightMode 
                ? 'bg-white border-steelblue-200 hover:border-champagne-400 hover:shadow-lg' 
                : 'bg-steelblue-900 border-steelblue-700 hover:border-champagne-500 hover:bg-steelblue-800'
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export const ChatWidget: React.FC<{ isLightMode?: boolean }> = ({ isLightMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [audioLoadingId, setAudioLoadingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const currentAudioIdRef = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Event Listeners for opening chat
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-chat-widget', handleOpenChat);
    return () => window.removeEventListener('open-chat-widget', handleOpenChat);
  }, []);
  
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages, isOpen, selectedLanguage]);
  
  const handleLanguageSelect = (lang: string) => {
      setSelectedLanguage(lang);
      setMessages([{ id: '1', role: Role.SYSTEM, text: `🔹 **Welcome to Nyaya Mitra**\nNamaste! I am your legal assistant in **${lang}**. How can I help you today?`, timestamp: new Date() }]);
  };
  const handleDeleteClick = () => { if(confirmDelete) { setMessages([]); setSelectedLanguage(null); setConfirmDelete(false); stopAudioPlayback(); } else { setConfirmDelete(true); setTimeout(() => setConfirmDelete(false), 3000); }};
  const handleCopy = (text: string, id: string) => { navigator.clipboard.writeText(text); setCopiedId(id); setTimeout(() => setCopiedId(null), 2000); };
  const stopAudioPlayback = () => { if(audioSourceRef.current) { try { audioSourceRef.current.stop(); } catch(e){} audioSourceRef.current = null; } setSpeakingId(null); setAudioLoadingId(null); currentAudioIdRef.current = null; };
  
  const handleSpeak = async (text: string, id: string) => {
      if (speakingId === id || audioLoadingId === id) { stopAudioPlayback(); return; }
      stopAudioPlayback(); setAudioLoadingId(id); currentAudioIdRef.current = id;
      try {
          const cleanText = text.replace(/🔹|\*\*|[-_]{3,}|\[.*?\]\(.*?\)/g, '').trim().substring(0, 1000);
          if(!cleanText) return;
          const base64Audio = await generateSpeechWithGemini(cleanText);
          if (currentAudioIdRef.current !== id) return;
          const audioBytes = decode(base64Audio as string);
          if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
          const ctx = audioContextRef.current;
          if(ctx.state === 'suspended') await ctx.resume();
          const audioBuffer = await decodeAudioData(audioBytes, ctx, 24000, 1);
          if (currentAudioIdRef.current !== id) return;
          const source = ctx.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(ctx.destination);
          source.onended = () => { if (currentAudioIdRef.current === id) { setSpeakingId(null); currentAudioIdRef.current = null; } };
          source.start();
          audioSourceRef.current = source;
          setAudioLoadingId(null); setSpeakingId(id);
      } catch(err) { setAudioLoadingId(null); setSpeakingId(null); }
  };

  const handleMicClick = async () => {
      if(isRecording) { mediaRecorderRef.current?.stop(); setIsRecording(false); setIsTranscribing(true); } 
      else { 
          try {
              const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
              streamRef.current = stream;
              const mediaRecorder = new MediaRecorder(stream);
              mediaRecorderRef.current = mediaRecorder;
              audioChunksRef.current = [];
              mediaRecorder.ondataavailable = (e) => { if(e.data.size > 0) audioChunksRef.current.push(e.data); };
              mediaRecorder.onstop = async () => {
                  if(streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
                  const blob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType || 'audio/webm' });
                  const reader = new FileReader();
                  reader.readAsDataURL(blob);
                  reader.onloadend = async () => {
                      const res = reader.result as string;
                      if(res) {
                          try {
                              const trans = await transcribeAudioWithGemini(res.split(',')[1], mediaRecorder.mimeType);
                              if(trans) setInputValue(trans);
                          } catch(e){} finally { setIsTranscribing(false); }
                      }
                  }
              };
              mediaRecorder.start(); setIsRecording(true);
          } catch(e) { alert("Microphone error"); setIsRecording(false); }
      }
  };

  const handleSend = async () => {
      if(!inputValue.trim() || isLoading) return;
      stopAudioPlayback();
      const userMsg: Message = { id: Date.now().toString(), role: Role.USER, text: inputValue, timestamp: new Date() };
      setMessages(p => [...p, userMsg]); setInputValue(''); setIsLoading(true);
      try {
          const hist = messages.map(m => ({ role: m.role === Role.SYSTEM ? 'model' : m.role, parts: [{ text: m.text }] }));
          const res = await sendMessageToGemini(hist, `(Lang: ${selectedLanguage}) ${userMsg.text}`);
          setMessages(p => [...p, { id: (Date.now()+1).toString(), role: Role.MODEL, text: res, timestamp: new Date() }]);
      } catch(e) { setMessages(p => [...p, { id: Date.now().toString(), role: Role.MODEL, text: "Error connecting.", timestamp: new Date(), isError: true }]); }
      finally { setIsLoading(false); }
  };

  return (
    <>
      <div className={`fixed bottom-10 right-10 z-50 transition-all duration-500 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
         <button onClick={() => setIsOpen(true)} className="group relative flex items-center justify-center h-20 w-20 bg-champagne-500 rounded-full shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 bg-white/30 rounded-full animate-ping opacity-50"></div>
            <MessageSquare className="h-8 w-8 text-steelblue-900" />
         </button>
      </div>

      <div className={`fixed bottom-6 right-6 z-50 w-[90vw] md:w-[500px] h-[750px] max-h-[85vh] flex flex-col rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-blur-2xl transition-all duration-500 origin-bottom-right border ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
        } ${isLightMode ? 'bg-white/90 border-champagne-200' : 'bg-steelblue-900/95 border-steelblue-700'}`}>
          
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b shrink-0 ${isLightMode ? 'bg-champagne-50/50 border-champagne-100' : 'bg-steelblue-950/50 border-steelblue-800'}`}>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-champagne-300 to-champagne-500 flex items-center justify-center shadow-lg">
                <Sparkles className="h-7 w-7 text-steelblue-900" />
              </div>
              <div>
                <h3 className={`font-display font-bold text-xl ${isLightMode ? 'text-steelblue-900' : 'text-white'}`}>Nyaya Mitra</h3>
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-champagne-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {selectedLanguage && <button onClick={handleDeleteClick} className="p-3 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="h-5 w-5"/></button>}
              <button onClick={() => setIsOpen(false)} className="p-3 rounded-xl hover:bg-black/5 text-slate-400 hover:text-white transition-colors"><X className="h-6 w-6"/></button>
            </div>
          </div>

          {/* Content */}
          <div className={`flex-1 overflow-y-auto p-6 ${isLightMode ? 'bg-white' : 'bg-steelblue-950/30'}`}>
            {!selectedLanguage ? <LanguageSelector onSelect={handleLanguageSelect} isLightMode={isLightMode} /> : (
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === Role.USER ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-[1.5rem] p-6 shadow-sm ${
                        msg.role === Role.USER 
                        ? 'bg-steelblue-600 text-white rounded-tr-sm' 
                        : isLightMode ? 'bg-champagne-50 text-steelblue-900 rounded-tl-sm border border-champagne-200' : 'bg-steelblue-800 text-champagne-100 rounded-tl-sm border border-steelblue-700'
                    }`}>
                        {msg.role === Role.USER ? <p className="text-base">{msg.text}</p> : <MessageContent text={msg.text} isLightMode={isLightMode} />}
                        
                        {/* Actions */}
                        <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-white/10">
                           {msg.role !== Role.USER && (
                             <button onClick={() => handleSpeak(msg.text, msg.id)} className="p-1.5 hover:text-champagne-400 transition-colors">
                                {speakingId === msg.id ? <StopCircle className="h-4 w-4 animate-pulse text-red-400"/> : <Volume2 className="h-4 w-4"/>}
                             </button>
                           )}
                           <button onClick={() => handleCopy(msg.text, msg.id)} className="p-1.5 hover:text-champagne-400 transition-colors">
                              {copiedId === msg.id ? <Check className="h-4 w-4 text-emerald-400"/> : <Copy className="h-4 w-4"/>}
                           </button>
                        </div>
                    </div>
                  </div>
                ))}
                {isLoading && <div className="flex items-center gap-3 text-champagne-500 text-sm font-bold uppercase tracking-widest"><Loader2 className="h-4 w-4 animate-spin"/> Processing Legal Query...</div>}
                <div ref={messagesEndRef}/>
              </div>
            )}
          </div>

          {/* Input */}
          <div className={`p-6 border-t ${isLightMode ? 'bg-white border-champagne-100' : 'bg-steelblue-900 border-steelblue-800'}`}>
             <div className="relative flex gap-4">
                <textarea 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={!selectedLanguage}
                  placeholder={selectedLanguage ? "Describe your situation..." : "Select language first..."}
                  className={`w-full rounded-2xl pl-5 pr-14 py-4 text-base focus:outline-none border-2 resize-none h-[64px] ${
                     isLightMode ? 'bg-steelblue-50 border-steelblue-100 focus:border-champagne-400 text-steelblue-900' : 'bg-steelblue-950 border-steelblue-800 focus:border-champagne-500 text-white'
                  }`}
                />
                <button 
                   onClick={handleMicClick}
                   className={`absolute right-24 top-1/2 -translate-y-1/2 p-2 ${isRecording ? 'text-red-500 animate-pulse' : 'text-steelblue-400 hover:text-champagne-500'}`}
                >
                   {isTranscribing ? <Loader2 className="h-5 w-5 animate-spin"/> : <Mic className="h-6 w-6"/>}
                </button>
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="h-[64px] w-[64px] rounded-2xl bg-champagne-500 hover:bg-champagne-400 flex items-center justify-center text-steelblue-900 transition-colors shadow-lg shadow-champagne-500/20"
                >
                   <Send className="h-6 w-6" />
                </button>
             </div>
          </div>
      </div>
    </>
  );
};