import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// ─── shared helpers ───────────────────────────────────────────────
function random(min, max) { return Math.random() * (max - min) + min; }

const BALLOON_COLORS = [
  "#ffb3c6", "#ffd6e0", "#c9b8ff", "#b8d8ff",
  "#ffd6b3", "#b3f0d6", "#ffb3e6", "#ffe0b3", "#d4b3ff", "#b3e0ff",
];

// ─── floating sparkle dot (reused across sections) ────────────────
function SparkDot({ style }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        width: 6, height: 6,
        borderRadius: "50%",
        background: "#f8a0c0",
        ...style,
      }}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
      transition={{ duration: random(1.5, 3), repeat: Infinity, delay: random(0, 2) }}
    />
  );
}

// ══════════════════════════════════════════════════════════════════
// SECTION 1 — BALLOONS
// ══════════════════════════════════════════════════════════════════
function BalloonSection({ onAllPopped }) {
  const COUNT = 9;
  const [popped, setPopped] = useState(new Set());
  const [bursts, setBursts] = useState([]);

  const pop = (id, x, y) => {
    if (popped.has(id)) return;
    const next = new Set(popped);
    next.add(id);
    setPopped(next);
    setBursts((b) => [...b, { id: Date.now(), x, y }]);
    setTimeout(() => setBursts((b) => b.filter((s) => s.id !== Date.now())), 700);
    if (next.size >= COUNT - 1) setTimeout(onAllPopped, 900);
  };

  const balloons = useRef(
    Array.from({ length: COUNT }, (_, i) => ({
      id: i,
      color: BALLOON_COLORS[i % BALLOON_COLORS.length],
      left: `${8 + (i * 9.5) % 84}%`,
      size: random(56, 88),
      duration: random(3, 6),
      delay: random(0, 2),
    }))
  ).current;

  return (
    <div style={{ minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,4vw,38px)", color: "#8b4567", marginBottom: 8, textAlign: "center", zIndex: 10, position: "relative" }}
      >
        Pop the balloons! 🎈
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ fontFamily: "'Dancing Script', cursive", fontSize: 18, color: "#c8889a", marginBottom: 40, zIndex: 10, position: "relative" }}
      >
        Each one holds a little wish for you ✨
      </motion.p>

      {/* balloons */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {balloons.map((b) => (
          <AnimatePresence key={b.id}>
            {!popped.has(b.id) && (
              <motion.div
                key="balloon"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: [0, -18, 0] }}
                exit={{ opacity: 0, scale: 2 }}
                transition={{ opacity: { duration: 0.5 }, y: { duration: b.duration, repeat: Infinity, ease: "easeInOut", delay: b.delay } }}
                style={{ position: "absolute", left: b.left, bottom: "8%", pointerEvents: "all", cursor: "pointer", userSelect: "none", zIndex: 5 }}
                onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); pop(b.id, r.left + r.width / 2, r.top + r.height / 2); }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 1.3 }}
              >
                {/* balloon body */}
                <svg width={b.size} height={b.size * 1.2} viewBox="0 0 60 72" fill="none">
                  <ellipse cx="30" cy="28" rx="26" ry="28" fill={b.color} opacity="0.9" />
                  <ellipse cx="22" cy="18" rx="7" ry="5" fill="white" opacity="0.35" />
                  <polygon points="30,56 27,60 33,60" fill={b.color} opacity="0.7" />
                  <line x1="30" y1="60" x2="30" y2="72" stroke="#d4a0b0" strokeWidth="1.5" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* pop burst sparkles */}
      <AnimatePresence>
        {bursts.map((burst) => (
          <motion.div
            key={burst.id}
            style={{ position: "fixed", left: burst.x, top: burst.y, zIndex: 50, pointerEvents: "none" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.6 }}
          >
            {["✦", "✧", "✨", "·", "★"].map((s, i) => (
              <motion.span
                key={i}
                style={{ position: "absolute", fontSize: random(10, 18), color: BALLOON_COLORS[i % BALLOON_COLORS.length] }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{ x: random(-50, 50), y: random(-60, 20), opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {s}
              </motion.span>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* progress hint */}
      <div style={{ position: "absolute", bottom: 24, zIndex: 10, fontFamily: "'Lato', sans-serif", fontSize: 12, color: "#d4a0b5", letterSpacing: 2 }}>
        {COUNT - popped.size} balloons left 🎈
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SECTION 2 — CAKE
// ══════════════════════════════════════════════════════════════════
function CakeIllustration({ lit, blownOut }) {
  return (
    <svg width="220" height="240" viewBox="0 0 220 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* plate */}
      <ellipse cx="110" cy="222" rx="90" ry="12" fill="#f8d7e8" opacity="0.5" />

      {/* bottom tier */}
      <rect x="25" y="160" width="170" height="55" rx="12" fill="#ffb3c6" />
      <rect x="25" y="160" width="170" height="14" rx="6" fill="#ff8fab" opacity="0.5" />
      {/* bottom frosting drips */}
      {[40,68,96,124,152,178].map((x,i) => (
        <ellipse key={i} cx={x} cy="160" rx="10" ry="7" fill="#ffd6e0" />
      ))}
      {/* bottom dots */}
      {[55,85,115,145,170].map((x,i) => (
        <circle key={i} cx={x} cy="187" r="4" fill="white" opacity="0.7" />
      ))}

      {/* middle tier */}
      <rect x="45" y="105" width="130" height="58" rx="10" fill="#d4b3ff" />
      <rect x="45" y="105" width="130" height="13" rx="5" fill="#b794f4" opacity="0.5" />
      {/* middle frosting drips */}
      {[58,84,110,136,162].map((x,i) => (
        <ellipse key={i} cx={x} cy="105" rx="9" ry="6" fill="#e9d5ff" />
      ))}
      {/* hearts on middle */}
      {[80,110,140].map((x,i) => (
        <text key={i} x={x} y="134" textAnchor="middle" fontSize="14" fill="white" opacity="0.8">♥</text>
      ))}

      {/* top tier */}
      <rect x="68" y="60" width="84" height="48" rx="8" fill="#ffd6b3" />
      <rect x="68" y="60" width="84" height="11" rx="4" fill="#ffb347" opacity="0.4" />
      {/* top frosting drips */}
      {[80,100,120,140].map((x,i) => (
        <ellipse key={i} cx={x} cy="60" rx="8" ry="5" fill="#ffe0c0" />
      ))}
      {/* star on top tier */}
      <text x="110" y="88" textAnchor="middle" fontSize="18" fill="white" opacity="0.8">★</text>

      {/* candle */}
      <rect x="103" y="32" width="14" height="30" rx="4" fill="#ffb3c6" />
      <rect x="103" y="32" width="14" height="8" rx="3" fill="#ff8fab" opacity="0.5" />

      {/* flame */}
      <AnimatePresence>
        {lit && !blownOut && (
          <motion.g
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: [1, 1.1, 0.95, 1.08, 1] }}
            exit={{ opacity: 0, scale: 0, y: -10 }}
            transition={{ scale: { duration: 0.8, repeat: Infinity, ease: "easeInOut" } }}
          >
            {/* glow */}
            <ellipse cx="110" cy="26" rx="18" ry="18" fill="#ffe066" opacity="0.18" />
            {/* outer flame */}
            <ellipse cx="110" cy="22" rx="7" ry="12" fill="#ffb347" opacity="0.8" />
            {/* inner flame */}
            <ellipse cx="110" cy="24" rx="4" ry="8" fill="#fff176" opacity="0.9" />
            {/* core */}
            <ellipse cx="110" cy="27" rx="2" ry="3" fill="white" opacity="0.9" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* smoke after blow */}
      <AnimatePresence>
        {blownOut && (
          <>
            {[0,1,2].map((i) => (
              <motion.ellipse
                key={i}
                cx={106 + i * 4} cy={28}
                rx="3" ry="3"
                fill="#ccc"
                opacity="0.5"
                initial={{ y: 0, opacity: 0.5, scale: 1 }}
                animate={{ y: -30 - i * 10, opacity: 0, scale: 2 + i }}
                transition={{ duration: 1.2, delay: i * 0.15 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </svg>
  );
}

function CakeSection({ onNext }) {
  const [candleLit, setCandleLit] = useState(false);
  const [blownOut, setBlownOut] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const lightCandle = () => setCandleLit(true);

  const blowCandle = () => {
    setBlownOut(true);
    setShowHearts(true);
    setTimeout(() => {
      setShowConfetti(true);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#ffb3c6", "#d4b3ff", "#ffd6b3", "#b3e0ff", "#ffd6e0"],
        scalar: 1.1,
      });
      confetti({
        particleCount: 60,
        spread: 120,
        origin: { x: 0.2, y: 0.6 },
        colors: ["#ffb3c6", "#c9b8ff"],
      });
      confetti({
        particleCount: 60,
        spread: 120,
        origin: { x: 0.8, y: 0.6 },
        colors: ["#ffd6b3", "#b3f0d6"],
      });
    }, 400);
    setTimeout(() => setShowMessage(true), 1400);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", gap: 32, position: "relative", overflow: "hidden" }}>

      {/* floating hearts */}
      <AnimatePresence>
        {showHearts && [..."💕💗💖💝💓"].map((h, i) => (
          <motion.span
            key={i}
            style={{ position: "fixed", left: `${15 + i * 17}%`, bottom: "10%", fontSize: random(20, 36), zIndex: 20, pointerEvents: "none" }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -window.innerHeight * 0.8, opacity: 0 }}
            transition={{ duration: random(2, 3.5), delay: i * 0.2, ease: "easeOut" }}
          >
            {h}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Section 2 — Cake reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{ textAlign: "center" }}
      >
        <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(16px,3vw,22px)", color: "#c8889a", marginBottom: 24 }}>
          Something sweet for someone sweeter 💗
        </p>

        {/* cake + sparkle dots */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <CakeIllustration lit={candleLit} blownOut={blownOut} />
          {[...Array(6)].map((_, i) => (
            <SparkDot
              key={i}
              style={{
                left: `${[10,80,5,90,30,70][i]}%`,
                top: `${[20,15,60,55,5,80][i]}%`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Section 3 — Light candle */}
      <AnimatePresence>
        {!candleLit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.5 }}
            style={{ textAlign: "center" }}
          >
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 18, color: "#b8789a", marginBottom: 16 }}>
              Ready to make a wish? 🕯️
            </p>
            <CelebButton onClick={lightCandle} emoji="✨" label="Light the Candle ✨" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 4 — Blow candle */}
      <AnimatePresence>
        {candleLit && !blownOut && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: "center" }}
          >
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 18, color: "#b8789a", marginBottom: 16 }}>
              Make a wish, Didi... 🌠
            </p>
            <CelebButton onClick={blowCandle} emoji="🌬️" label="Blow the Candle 🌬️" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 5 — Message card */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              maxWidth: 480,
              width: "90%",
              background: "linear-gradient(135deg, rgba(255,255,255,0.88), rgba(255,228,240,0.82))",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1.5px solid rgba(255,182,210,0.5)",
              borderRadius: 24,
              padding: "36px 32px",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(220,130,170,0.18), 0 2px 12px rgba(200,150,230,0.1)",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>🎂</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px,3vw,26px)", color: "#8b4567", marginBottom: 16 }}>
              Happy Birthday Didi ❤️
            </h2>
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(16px,2.5vw,19px)", color: "#a0607a", lineHeight: 1.8 }}>
Built this tiny website for my sister because apparently being annoying full-time wasn’t enough 😌✨
A little bit of memories, chaos, and proof that I’m the better sibling.
            </p>
            <div style={{ marginTop: 12, fontSize: 22 }}>💕 🌸 ✨</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 6 — Next CTA */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ textAlign: "center" }}
          >
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 16, color: "#c8a0b8", marginBottom: 16 }}>
              There's more waiting for you 🎀
            </p>
            <CelebButton onClick={onNext} label="Open Our Memory Timeline 📸" big />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── reusable styled button ───────────────────────────────────────
function CelebButton({ onClick, label, big }) {
  return (
    <motion.button
      whileHover={{ y: -5, scale: 1.05, boxShadow: "0 10px 36px rgba(220,130,170,0.4)" }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        background: "linear-gradient(135deg, rgba(255,182,210,0.6), rgba(216,180,255,0.5), rgba(255,218,190,0.4))",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1.5px solid rgba(255,182,210,0.55)",
        borderRadius: 999,
        padding: big ? "16px 44px" : "12px 32px",
        fontSize: big ? "clamp(15px,2vw,18px)" : "clamp(14px,1.8vw,16px)",
        fontFamily: "'Playfair Display', serif",
        fontWeight: 600,
        color: "#9b5a78",
        cursor: "pointer",
        boxShadow: "0 4px 20px rgba(220,130,170,0.2), inset 0 1px 0 rgba(255,255,255,0.6)",
        letterSpacing: "0.03em",
        transition: "box-shadow 0.3s",
      }}
    >
      {label}
    </motion.button>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════════════════════════════════
export default function CelebrationPage({ onNext }) {
  const [section, setSection] = useState("balloons");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff0f5, #fce4ec, #f3e5f5, #fff8f0, #fce4ec)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 10s ease infinite",
        fontFamily: "'Playfair Display', serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Dancing+Script:wght@400;600&family=Lato:wght@300;400&display=swap"
        rel="stylesheet"
      />

      {/* background sparkles */}
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          style={{
            position: "fixed",
            left: `${random(2, 98)}%`,
            top: `${random(2, 98)}%`,
            fontSize: `${random(8, 18)}px`,
            color: "#e8a0c0",
            pointerEvents: "none",
            zIndex: 0,
          }}
          animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.6, 1.3, 0.6] }}
          transition={{ duration: random(2, 5), repeat: Infinity, delay: random(0, 4) }}
        >
          {["✦", "✧", "⋆", "·"][i % 4]}
        </motion.span>
      ))}

      <AnimatePresence mode="wait">
        {section === "balloons" && (
          <motion.div
            key="balloons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.6 }}
            style={{ position: "relative", zIndex: 5 }}
          >
            <BalloonSection onAllPopped={() => setSection("cake")} />
          </motion.div>
        )}

        {section === "cake" && (
          <motion.div
            key="cake"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{ position: "relative", zIndex: 5 }}
          >
            <CakeSection onNext={onNext} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}