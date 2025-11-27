"use client";

import { useEffect, useRef, useState } from "react";

// IMPORT YOUR ASSETS
import brandLogo from "@/assets/brand_new_logo.png";
import seedhemautAudio from "@/assets/seedhemaut.mp3";

export default function TapMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const startMusic = () => {
      if (!started) {
        audioRef.current?.play().catch(() => {});
        setStarted(true);
        setIsPlaying(true);
      }

      window.removeEventListener("click", startMusic);
      window.removeEventListener("scroll", startMusic);
    };

    window.addEventListener("click", startMusic);
    window.addEventListener("scroll", startMusic);

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("scroll", startMusic);
    };
  }, [started]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      {/* Floating badge */}
      {started && (
        <div
          onClick={togglePlay}
          className="fixed bottom-6 right-6 z-50 cursor-pointer
                     bg-[#0a0a0a] border border-cyan-400/50 shadow-lg
                     rounded-xl p-3 flex items-center gap-3
                     hover:scale-105 transition-transform"
          style={{ boxShadow: "0 0 15px rgba(0,255,255,0.35)" }}
        >
          <img
            src={brandLogo.src}
            alt="SeedheMaut Logo"
            className="w-12 h-12 rounded-full"
            style={{
              animation: isPlaying ? "spin 3s linear infinite" : "none",
              filter: "drop-shadow(0 0 8px rgba(255,50,255,0.5))"
            }}
          />

          <p className="text-sm text-cyan-300 font-semibold">
            {isPlaying ? "Playing..." : "Paused"}
          </p>

          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
          </style>
        </div>
      )}

      {/* Hidden Audio */}
      <audio ref={audioRef} src={seedhemautAudio} preload="auto" loop />
    </>
  );
}
