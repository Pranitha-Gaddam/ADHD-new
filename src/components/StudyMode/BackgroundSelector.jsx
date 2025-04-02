import React, { useState } from "react";

const backgrounds = [
  { id: 1, src: "images/backgrounds/5fbe1685b1f7d617361fdb63e0c94a7e.gif", alt: "Background 1" },
  { id: 2, src: "images/backgrounds/73ed4c80d21426e2444d370e187270d3.gif", alt: "Background 2" },
  { id: 3, src: "images/backgrounds/1883de5bfee36b043b973bef00c561e0.gif", alt: "Background 3" },
  { id: 4, src: "images/backgrounds/7313cc2b24c323b3df2562fbd27ed918.gif", alt: "Background 4" },
  { id: 5, src: "images/backgrounds/c84fb740471d58ba9597ace28969d490.gif", alt: "Background 5" },
  { id: 6, src: "images/backgrounds/ff2236e2a40e5102820ea2e02ca53e35.gif", alt: "Background 6" },
];

const BackgroundSelector = ({ background, setBackground }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="absolute bottom-5 right-5">
      {/* Toggle Button */}
      <button
        className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        🎨
      </button>

      {/* Background Dropdown */}
      {showDropdown && (
        <div className="absolute bottom-16 right-0 bg-white glass-effect shadow-lg rounded-lg p-1 flex flex-wrap gap-2 w-45
        before:absolute before:top-full before:right-4 before:w-3 before:h-3 before:rotate-45 before:-translate-y-1/2 
        before:bg-white/30 before:backdrop-blur-md before:border-<0.5> before:border-white before:shadow-lg">
    
    
          {backgrounds.map((bg) => (
            <button
              key={bg.id}
              className={`h-12 w-20 rounded-md border-2 transition ${
                background === bg.src ? "border-blue-400 shadow-lg border-2" : "border-gray-500 hover:border-gray-400"
              }`}
              style={{ backgroundImage: `url(${bg.src})`, backgroundSize: "cover" }}
              onClick={() => setBackground(bg.src)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BackgroundSelector;
