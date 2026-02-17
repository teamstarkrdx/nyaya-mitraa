import React, { useState, useEffect } from 'react';

// Advanced context phrases
const phrases = [
  "in simple terms.",
  "without legal jargon.",
  "in your local language.",
  "for your safety.",
  "instantly.",
  "based on Indian Laws."
];

export const TypingText: React.FC = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 80);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500); 
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-lightblue-400 to-champagne-400 border-r-4 border-champagne-500 pr-1 animate-pulse min-h-[1.5em] inline-block font-heading font-bold">
      {text}
    </span>
  );
};