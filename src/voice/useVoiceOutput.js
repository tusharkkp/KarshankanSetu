import { useEffect, useState } from "react";

export const useVoiceOutput = () => {
  const [supported, setSupported] = useState(true);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setSupported(false);
      setEnabled(false);
    }
  }, []);

  const speak = (text) => {
    if (!supported || !enabled || !text) return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  return {
    supported,
    enabled,
    setEnabled,
    speak,
  };
};
