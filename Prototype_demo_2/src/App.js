import React, { useState } from 'react';
const campusImage = process.env.PUBLIC_URL + '/campus_map.jpg';

export default function App() {
  const [gesture, setGesture] = useState('');
  const [message, setMessage] = useState('');

  // Simulate micro gesture control
  const handleGesture = (type) => {
    setGesture(type);
    setMessage(type === 'nod' ? 'Nod detected: Confirmed direction' : 'Finger raise detected: Show options');
    setTimeout(() => setMessage(''), 2000);
  };

  // Optional Voice Input Button (uses Web Speech API if available)
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice input not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceTranscript(transcript);
      setMessage(`Voice: ${transcript}`);
      setTimeout(() => setMessage(''), 2000);
    };
    recognition.start();
  };

  // Improved Arrow Overlay (centered, visually matches road direction)
  const ArrowOverlay = () => (
    <div className="absolute left-1/2 bottom-36 transform -translate-x-1/2 flex flex-col items-center z-20">
      <div className="bg-white/80 rounded-full shadow-lg p-4 flex items-center justify-center mb-2 border-4 border-emerald-200 animate-bounce">
        <svg width="64" height="64" viewBox="0 0 80 80" style={{ transform: 'rotate(45deg)' }}>
          <polygon points="40,10 70,70 40,55 10,70" fill="#10b981" stroke="#065f46" strokeWidth="4" />
        </svg>
      </div>
      <div className="mt-2 text-emerald-700 font-bold text-xl bg-white/80 rounded-lg px-6 py-2 shadow-lg border border-emerald-200 flex items-center gap-2">
        <span role="img" aria-label="arrow">➡️</span>
        Turn right in 50m
      </div>
    </div>
  );

  // Improved Micro Gesture & Voice Control UI
  const MicroGestureControl = () => (
    <div className="absolute bottom-10 right-10 flex flex-col gap-4 z-30 items-end">
      <div className="flex gap-3">
        <button onClick={() => handleGesture('nod')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg font-bold text-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-400">Nod</button>
        <button onClick={() => handleGesture('finger-raise')} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg font-bold text-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400">Finger Raise</button>
      </div>
      <button onClick={handleVoiceInput} className={`mt-2 flex items-center gap-2 px-5 py-2 rounded-full shadow-lg font-semibold text-base transition-all duration-150 focus:outline-none ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>🎤 {isListening ? 'Listening...' : 'Voice Input'}</button>
      {voiceTranscript && (
        <div className="mt-2 bg-white/90 rounded-lg px-4 py-2 shadow text-gray-800 text-sm border border-gray-200 max-w-xs text-right">{voiceTranscript}</div>
      )}
    </div>
  );

  // Message Bar
  const MessageBar = () => (
    message && (
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-6 py-2 rounded-full shadow text-center text-base font-semibold z-50">
        {message}
      </div>
    )
  );

  // Top-right status bar styled like animal recognition UI
  const TopRightStatusBar = () => (
    <div className="fixed top-6 right-8 flex flex-col items-end z-40 gap-3">
      {/* Status bar */}
      <div className="flex items-center gap-3 bg-white/80 rounded-xl shadow px-4 py-2 backdrop-blur-md text-gray-800 text-sm font-semibold min-w-[180px]">
        <span role="img" aria-label="clock">🕒</span>
        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <span role="img" aria-label="weather">☀️</span>
        <span>22°C</span>
        <span role="img" aria-label="battery">🔋</span>
        <span>87%</span>
      </div>
      {/* Example stacked navigation info card */}
      <div className="bg-white/80 rounded-xl shadow px-4 py-2 text-emerald-700 font-semibold text-base flex items-center gap-2 min-w-[180px]">
        <span role="img" aria-label="arrow">➡️</span>
        Turn right in 50m
      </div>
      {/* Add more stacked cards here as needed */}
    </div>
  );

  // Bottom Panel (matches animal recognition UI, for navigation context)
  const BottomPanel = () => (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-6 z-40">
      {/* Example navigation actions, replace icons as needed */}
      <button className="bg-emerald-500 hover:bg-emerald-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-2xl border-4 border-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-150" title="Start Navigation">
        <span role="img" aria-label="navigate">🧭</span>
      </button>
      <button className="bg-white/80 hover:bg-white text-emerald-700 w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-2xl border-4 border-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-150" title="Show Map">
        <span role="img" aria-label="map">🗺️</span>
      </button>
      <button className="bg-white/80 hover:bg-white text-emerald-700 w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-2xl border-4 border-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-150" title="Settings">
        <span role="img" aria-label="settings">⚙️</span>
      </button>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Campus background image only */}
      <div className="fixed inset-0 -z-10" style={{
        backgroundImage: `url(${campusImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }} />
      <TopRightStatusBar />
      <ArrowOverlay />
      <MicroGestureControl />
      <MessageBar />
      <BottomPanel />
    </div>
  );
}
