import { useState, useRef } from "react";
import { motion } from "framer-motion";

// We use a free soft piano loop from a public CDN
const MUSIC_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(MUSIC_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.18;
    }
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.12, boxShadow: "0 6px 28px rgba(220,130,170,0.45)" }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: "fixed",
        top: 20, right: 20,
        zIndex: 8000,
        width: 44, height: 44,
        borderRadius: "50%",
        border: "1.5px solid rgba(255,182,210,0.55)",
        background: "linear-gradient(135deg, rgba(255,228,240,0.85), rgba(240,220,255,0.8))",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 2px 12px rgba(220,130,170,0.2)",
        fontSize: 18,
        cursor: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "box-shadow 0.3s",
      }}
      title={playing ? "Pause music" : "Play soft music"}
    >
      {playing ? "🔊" : "🎵"}
    </motion.button>
  );
}