import pic1 from "./assets/Diids7.jpg";
import pic2 from "./assets/Diids10.jpg";
import pic3 from "./assets/Diids8.jpg";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const PETALS = ["🌸", "🌷", "✿", "❀", "🌺"];
const SPARKLES = ["✦", "✧", "⋆", "✨", "·", "★"];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function FloatingPetals() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: PETALS[i % PETALS.length],
      left: `${random(0, 100)}%`,
      fontSize: `${random(12, 24)}px`,
      duration: `${random(10, 22)}s`,
      delay: `${random(0, 10)}s`,
      opacity: random(0.4, 0.85),
    }));
    setPetals(items);
  }, []);

  return (
    <>
      {petals.map((p) => (
        <span
          key={p.id}
          className="animate-float-petal select-none"
          style={{
            left: p.left,
            top: "-5%",
            fontSize: p.fontSize,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </>
  );
}

function Sparkles() {
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      char: SPARKLES[i % SPARKLES.length],
      left: `${random(2, 98)}%`,
      top: `${random(2, 98)}%`,
      fontSize: `${random(8, 20)}px`,
      duration: `${random(2, 5)}s`,
      delay: `${random(0, 5)}s`,
    }));
    setSparks(items);
  }, []);

  return (
    <>
      {sparks.map((s) => (
        <span
          key={s.id}
          className="animate-sparkle select-none"
          style={{
            left: s.left,
            top: s.top,
            fontSize: s.fontSize,
            animationDuration: s.duration,
            animationDelay: s.delay,
            color: "#e8a0c0",
          }}
        >
          {s.char}
        </span>
      ))}
    </>
  );
}

function PolaroidCard({ image, label, tilt, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: tilt }}
      animate={{ opacity: 1, y: 0, rotate: tilt }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.08, rotate: 0, y: -10 }}
      style={{ cursor: "pointer" }}
    >
      <div
        style={{
          background: "#fff",
          padding: "14px 14px 44px 14px",
          borderRadius: "4px",
          boxShadow: "0 8px 32px rgba(220,130,170,0.2), 0 2px 8px rgba(180,120,160,0.1)",
          border: "1.5px solid #f5d6e0",
          width: "160px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
  src={image}
  alt={label}
  style={{
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "2px",
    marginBottom: "8px",
  }}
/>
        <span
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "13px",
            color: "#c48fa0",
            letterSpacing: "2px",
            textAlign: "center",
          }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export default function LandingPage({ onEnter }) {
  return (
    <div
      className="animated-bg"
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Playfair Display', serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Dancing+Script:wght@400;600&family=Lato:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <FloatingPetals />
      <Sparkles />

      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 15% 15%, rgba(255,182,193,0.25) 0%, transparent 55%), radial-gradient(ellipse at 85% 85%, rgba(216,191,216,0.2) 0%, transparent 55%)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px 20px",
          gap: "40px",
        }}
      >
        <motion.div
          style={{ textAlign: "center" }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "12px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#c8889a",
              marginBottom: "16px",
            }}
          >
            ✦ a little something special ✦
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            style={{
              fontSize: "clamp(28px, 5vw, 56px)",
              fontWeight: "700",
              lineHeight: "1.3",
              color: "#8b4567",
              marginBottom: "16px",
            }}
          >
            A Little Surprise For
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #d4829a, #b07fd4, #e8a87c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              My Dearest Sister
            </span>{" "}
            💌
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(16px, 3vw, 22px)",
              color: "#b8789a",
            }}
          >
            Made with love, memories, and a little chaos ❤️
          </motion.p>
        </motion.div>

        <motion.div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
<PolaroidCard
  image={pic1}
  label="❤️ Mummy"
  tilt={-5}
  delay={0.9}
/>

<PolaroidCard
  image={pic2}
  label="❤️ Me"
  tilt={2}
  delay={1.05}
/>

<PolaroidCard
  image={pic3}
  label="❤️ Daddy"
  tilt={-3}
  delay={1.2}
/>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          whileHover={{ y: -6, scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onEnter()}
          style={{
            background:
              "linear-gradient(135deg, rgba(255,182,210,0.55), rgba(220,180,255,0.45), rgba(255,218,190,0.4))",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1.5px solid rgba(255,182,210,0.6)",
            borderRadius: "999px",
            padding: "16px 40px",
            fontSize: "clamp(14px, 2vw, 18px)",
            fontFamily: "'Playfair Display', serif",
            fontWeight: "600",
            color: "#9b5a78",
            cursor: "pointer",
            boxShadow:
              "0 4px 24px rgba(220,130,170,0.25), inset 0 1px 0 rgba(255,255,255,0.6)",
            letterSpacing: "0.03em",
            transition: "box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 8px 40px rgba(220,130,170,0.45), 0 2px 12px rgba(200,150,230,0.3), inset 0 1px 0 rgba(255,255,255,0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 4px 24px rgba(220,130,170,0.25), inset 0 1px 0 rgba(255,255,255,0.6)";
          }}
        >
          💌 Open Only If You're My Sister ✨
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9 }}
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "12px",
            color: "#d4a0b5",
            letterSpacing: "2px",
          }}
        >
          psst — only for you 🎀
        </motion.p>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 1 }}
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "16px",
        }}
      >
        <p
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "16px",
            color: "#c8a0b8",
          }}
        >
          Because birthdays deserve magic ✨
        </p>
      </motion.footer>
    </div>
  );
}