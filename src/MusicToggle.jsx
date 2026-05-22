import { useState, useRef } from "react";
import { motion } from "framer-motion";

const HAPPY_BIRTHDAY = [
  [261.63,0.35],[261.63,0.15],[293.66,0.5],[261.63,0.5],[349.23,0.5],[329.63,1.0],
  [261.63,0.35],[261.63,0.15],[293.66,0.5],[261.63,0.5],[392.00,0.5],[349.23,1.0],
  [261.63,0.35],[261.63,0.15],[523.25,0.5],[440.00,0.5],[349.23,0.5],[329.63,0.5],[293.66,1.0],
  [466.16,0.35],[466.16,0.15],[440.00,0.5],[349.23,0.5],[392.00,0.5],[349.23,1.2],
];

function playHappyBirthday(audioCtxRef, sourceNodesRef, onEnd) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  audioCtxRef.current = ctx;
  sourceNodesRef.current = [];

  let time = ctx.currentTime + 0.05;

  HAPPY_BIRTHDAY.forEach(([freq, dur]) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.22, time + 0.02);
    gain.gain.setValueAtTime(0.22, time + dur - 0.05);
    gain.gain.linearRampToValueAtTime(0, time + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + dur);
    sourceNodesRef.current.push(osc);

    time += dur + 0.06;
  });

  const lastOsc = sourceNodesRef.current[sourceNodesRef.current.length - 1];
  lastOsc.onended = () => {
    ctx.close();
    onEnd();
  };
}

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const sourceNodesRef = useRef([]);

  const stop = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setPlaying(false);
  };

  const toggle = () => {
    if (playing) {
      stop();
    } else {
      setPlaying(true);
      playHappyBirthday(audioCtxRef, sourceNodesRef, () => setPlaying(false));
    }
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
      title={playing ? "Stop music" : "Play Happy Birthday"}
    >
      {playing ? "🔊" : "🎵"}
    </motion.button>
  );
}