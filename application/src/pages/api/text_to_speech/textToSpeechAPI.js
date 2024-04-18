const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };
  
  const cancelSpeech = () => {
    speechSynthesis.cancel();
  };
  
  export { speakText, cancelSpeech };
