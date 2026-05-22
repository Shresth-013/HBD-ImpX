import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPARKS = ["✦","✧","⋆","·","★","✨"];

export default function Preloader({ onDone }) {
  const [sparks] = useState(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      char: SPARKS[i % SPARKS.length],
      left: `${5 + Math.random() * 90}%`,
      top: `${5 + Math.random() * 90}%`,
      duration: 1.5 + Math.random() * 2.5,
      delay: Math.random() * 2,
      size: 8 + Math.random() * 14,
    }))
  );

  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
      transition={{ exit: { duration: 0.7 } }}
      style={{
        position: "fixed", inset: 0, zIndex: 9000,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, #fff0f5, #fce4ec, #f3e5f5, #fff8f0)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 6s ease infinite",
        overflow: "hidden",
      }}
    >
      {/* sparkles */}
      {sparks.map((s) => (
        <motion.span key={s.id}
          style={{
            position: "absolute", left: s.left, top: s.top,
            fontSize: s.size, color: "#e8a0c0",
            pointerEvents: "none", userSelect: "none",
          }}
          animate={{ opacity: [0.1, 1, 0.1], scale: [0.5, 1.4, 0.5] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
        >
          {s.char}
        </motion.span>
      ))}

      {/* envelope */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], rotate: [0, -4, 4, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ fontSize: 72, marginBottom: 28, filter: "drop-shadow(0 4px 16px rgba(220,130,170,0.3))" }}
      >
        💌
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(16px, 3vw, 22px)",
          color: "#8b4567",
          marginBottom: 24,
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        Unlocking a few special memories… 💌
      </motion.p>

      {/* progress bar */}
      <div style={{
        width: 180, height: 3, borderRadius: 99,
        background: "rgba(220,130,170,0.15)",
        overflow: "hidden",
      }}>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #ffb3c6, #d4b3ff, #ffd6b3)",
            borderRadius: 99,
          }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: 16,
          fontFamily: "'Dancing Script', cursive",
          fontSize: 15,
          color: "#d4a0b5",
          letterSpacing: 1,
        }}
      >
        made with love ✨
      </motion.p>
    </motion.div>
  );
}