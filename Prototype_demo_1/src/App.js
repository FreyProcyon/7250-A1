import React, { useState, useEffect } from 'react';

export default function App() {
  const [view, setView] = useState('camera');
  const [photos, setPhotos] = useState([]);
  const [message, setMessage] = useState('');
  const [battery, setBattery] = useState(85);
  const [time, setTime] = useState(new Date());
  const [weather] = useState({ temp: '22°C', condition: '☀️' });
  const [notifications] = useState([
    { id: 1, text: 'Object detected: Ibis', icon: '🦅' },
    { id: 2, text: 'Camera ready for capture', icon: '📸' }
  ]);
  const [arObjects] = useState([
    { id: 1, type: 'wildlife', label: 'Australian White Ibis', confidence: '98%', distance: '2m' },
    { id: 2, type: 'info', label: 'Native Bird Species', details: 'Common in urban areas' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBlink = () => {
    const timestamp = new Date().toLocaleTimeString();
    const newPhoto = `Ibis Photo ${photos.length + 1} (${timestamp})`;
    setPhotos([...photos, newPhoto]);
    setMessage(`📸 Wildlife captured: Australian White Ibis at ${timestamp}`);
    setTimeout(() => {
      setMessage('Object tracking: Ibis in frame');
    }, 2000);
  };

  const handleVoiceCommand = (cmd) => {
    if (cmd === 'gallery') setView('gallery');
    if (cmd === 'camera') setView('camera');
    if (cmd === 'hud') setView('hud');
    if (cmd === 'recognition') setView('recognition');

    setMessage(`🎤 Voice: switch to ${cmd}`);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleHUDSelect = (option) => {
    setMessage(`🎯 Gaze selected: ${option}`);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleTouchOverride = () => {
    handleBlink();
    setMessage('🖐️ Photo captured via touch override');
  };

  const RecognitionView = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 rounded-[40px] shadow-lg p-8 space-y-6">
      <h2 className="text-emerald-700 font-bold text-2xl">Recognition Mode</h2>
      <img src="/detail.jpg" alt="Recognized Animal" className="w-64 h-auto rounded-xl shadow-lg" />
      <div className="text-emerald-800 text-left max-w-md space-y-2">
        <p><strong>📛 Name:</strong> Silver Gull</p>
        <p><strong>🔬 Scientific Name:</strong> <em>Chroicocephalus novaehollandiae</em></p>
        <p><strong>📍 Distribution:</strong> Common along Australian coastlines, beaches, and urban parks</p>
        <p><strong>🧠 Behavior:</strong> Social and opportunistic, often seen scavenging around humans</p>
        <p><strong>⚠️ Aggression:</strong> Low — may swoop when competing for food, but not typically harmful</p>
        <p><strong>🍞 Feeding Advice:</strong> Suitable: plain rice, unsalted bread<br/>Avoid: chips, chocolate, or processed food</p>
        <p><strong>💧 Water Advice:</strong> Provide clean water; avoid sugary or salty liquids</p>
      </div>
    </div>
  );
  

  // --- ANNOTATIONS & FEATURE DEMONSTRATION ---
  // Feature 1: Micro Gesture Control (nod, glance, finger-raise, blink)
  // [Annotation] The 'Blink to Capture Ibis' button simulates hands-free capture via micro gesture (US-1: Hands-free operation, Jakob’s Law: Familiar gesture metaphors).
  // Feature 2: Eye-Tracking Input (gaze/blink selection)
  // [Annotation] The HUD mode (see below) simulates gaze-based selection (US-2: Gaze selection, Fitts’s Law: Reduces selection effort).
  // Feature 3: Optional Voice Input
  // [Annotation] Navigation buttons simulate voice command input (US-3: Voice accessibility, can be disabled for privacy).
  // Feature 4: AR Contextual Overlays
  // [Annotation] AR overlays in the right lens provide real-time guidance and feedback (US-4: In-situ learning, reduces phone reliance).
  // Feature 5: Real-Time Recognition Engine
  // [Annotation] Object detection overlays in the left lens demonstrate real-time recognition (US-5: Contextual awareness, Miller’s Law: Info chunking).

  // --- HUD Mode for Eye-Tracking Simulation ---
  // [Annotation] HUD mode simulates gaze-based selection for quick actions.
  const HUDView = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-[40px] shadow-lg">
      <h2 className="text-emerald-700 font-bold text-xl mb-4">Quick Actions (Gaze to Select)</h2>
      <div className="flex flex-col space-y-4">
        <button
          className="px-6 py-3 bg-emerald-100 hover:bg-emerald-200 rounded-lg text-emerald-700 text-lg shadow"
          onClick={() => handleHUDSelect('Capture Photo')}
        >
          👁️ Capture Photo
        </button>
        <button
          className="px-6 py-3 bg-emerald-100 hover:bg-emerald-200 rounded-lg text-emerald-700 text-lg shadow"
          onClick={() => handleHUDSelect('Identify Object')}
        >
          🔍 Identify Object
        </button>
        <button
          className="px-6 py-3 bg-emerald-100 hover:bg-emerald-200 rounded-lg text-emerald-700 text-lg shadow"
          onClick={() => handleHUDSelect('Read Text')}
        >
          📝 Read Text
        </button>
      </div>
      <div className="mt-8 text-xs text-emerald-500">[Simulates gaze-based selection for accessibility]</div>
    </div>
  );

  // --- Gallery Mode for Reviewing Captured Photos ---
  // [Annotation] Gallery mode supports reviewing captured content (supports accessibility by providing visual feedback).
  const GalleryView = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 rounded-[40px] shadow-lg">
      <h2 className="text-emerald-700 font-bold text-xl mb-4">Gallery</h2>
      {photos.length === 0 ? (
        <div className="text-emerald-500">No photos captured yet.</div>
      ) : (
        <ul className="space-y-2">
          {photos.map((p, i) => (
            <li key={i} className="bg-emerald-50 px-4 py-2 rounded text-emerald-700 shadow-sm">{p}</li>
          ))}
        </ul>
      )}
      <div className="mt-8 text-xs text-emerald-500">[Accessible review of captured content]</div>
    </div>
  );

  // --- HUD Panel: Task Tracking and Quick Pinning ---
  // [Annotation] HUD panel overlays inside the left lens for quick task tracking and pinning (imitates AR HUD in reality).
  const HUDPanel = () => (
    <div className="absolute top-8 left-8 bg-white/80 rounded-xl shadow-lg px-4 py-3 text-emerald-800 text-sm z-30 border border-emerald-200 w-64">
      <div className="font-bold mb-1">HUD Panel</div>
      <ul className="list-disc ml-4 mb-2">
        <li>Track: Wildlife Spotting</li>
        <li>Pin: Ibis Sighting</li>
        <li>Task: Capture Photo</li>
      </ul>
      <button className="bg-emerald-500 text-white px-2 py-1 rounded text-xs mt-1">+ Pin Task</button>
      <div className="mt-2 text-xs text-emerald-500">[HUD: Task tracking & quick pinning]</div>
    </div>
  );

  // --- Voice Command Input ---
  // [Annotation] Voice command input module for optional speech interaction (imitates real-world voice input).
  const VoiceCommandInput = () => (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 rounded-full shadow px-4 py-2 flex items-center space-x-2 z-40 border border-emerald-200">
      <span role="img" aria-label="mic">🎤</span>
      <input
        type="text"
        placeholder="Say a command..."
        className="bg-transparent outline-none text-emerald-700 w-32"
        onKeyDown={e => {
          if (e.key === 'Enter') handleVoiceCommand(e.target.value);
        }}
        aria-label="Voice Command Input"
      />
      <span className="text-xs text-emerald-500">[Voice: Optional speech interaction]</span>
    </div>
  );

  // Create a background that simulates looking through smart glasses
  const GlassesView = () => (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden" style={{
      backgroundImage: 'url("/ibis.jpg")', 
      backgroundSize: 'cover',  // Changed from contain to cover to stretch the image
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#2f3e2f', // Adding a subtle background color
      filter: 'blur(1px)'  // Slight blur to push it visually back
    }}>
      {/* Tech Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern - More subtle */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, rgba(0,200,100,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,200,100,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Glowing Circles - More subtle */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-green-300 rounded-full filter blur-[100px] opacity-10"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 bg-emerald-300 rounded-full filter blur-[120px] opacity-10"></div>

        {/* Tech Lines */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="30%" x2="100%" y2="30%" stroke="rgba(0,200,100,0.3)" strokeWidth="0.5">
              <animate attributeName="opacity" values="0.2;0.4;0.2" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="0" y1="70%" x2="100%" y2="70%" stroke="rgba(0,200,100,0.3)" strokeWidth="0.5">
              <animate attributeName="opacity" values="0.2;0.4;0.2" dur="4s" repeatCount="indefinite" />
            </line>
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GlassesView />
      
      {/* Status Bar */}
      <div className="absolute top-4 right-4 flex items-center space-x-4 bg-white/80 px-4 py-2 rounded-full text-emerald-700 text-sm border border-emerald-200">
        <span>{time.toLocaleTimeString()}</span>
        <span>{weather.condition} {weather.temp}</span>
        <span>🔋 {battery}%</span>
      </div>

      {/* Notifications */}
      <div className="absolute top-16 right-4 w-64">
        {notifications.map(n => (
          <div key={n.id} className="bg-white/80 mb-2 px-4 py-2 rounded-lg text-emerald-700 text-sm border border-emerald-200">
            {n.icon} {n.text}
          </div>
        ))}
      </div>

      {/* AR Object Detection */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 space-y-2">
        {arObjects.map(obj => (
          <div key={obj.id} className="bg-white/80 px-4 py-2 rounded-lg text-emerald-700 text-sm border border-emerald-200">
            <div className="font-bold">{obj.label}</div>
            <div className="text-xs">Confidence: {obj.confidence}</div>
            {obj.distance && <div className="text-xs">Distance: {obj.distance}</div>}
          </div>
        ))}
      </div>

      {/* Message Display */}
      {message && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm">
          {message}
        </div>
      )}

      {/* Main Content */}
      {view === 'hud' && <HUDView />}
      {view === 'gallery' && <GalleryView />}
      {view === 'camera' && (
        <button
          onClick={handleTouchOverride}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 w-32 h-32 rounded-full border-2 border-white/40 flex items-center justify-center text-black text-lg"
        >
          Blink to Capture
        </button>
      )}
      {view === 'recognition' && <RecognitionView />}

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {['camera', 'gallery', 'hud', 'recognition'].map((v) => (
          <button
            key={v}
            onClick={() => handleVoiceCommand(v)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              view === v 
                ? 'bg-gradient-to-r from-emerald-500 to-green-400 shadow-lg text-white' 
                : 'bg-white/80 hover:bg-emerald-50/80 border border-emerald-200 text-emerald-600'
            }`}
          >
            {v === 'camera' ? '📷' : v === 'gallery' ? '🖼️' : v === 'hud' ? '🎯' : '🔎'}
          </button>
        ))}
      </div>

      {/* HUD Panel */}
      <HUDPanel />
    </div>
  );
}
