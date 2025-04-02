import React, { useRef } from "react";

const TimerSounds = () => {
  const startSound = useRef(new Audio("/sounds/start.mp3")); // Timer start sound
  const pauseSound = useRef(new Audio("/sounds/pause.mp3")); // Timer pause sound
  const countdownSound = useRef(new Audio("/sounds/countdown.mp3")); // Countdown ticking sound

  const playSound = (type) => {
    if (type === "start") startSound.current.play();
    if (type === "pause") pauseSound.current.play();
    if (type === "countdown") countdownSound.current.play();
  };

  return { playSound };
};

export default TimerSounds;