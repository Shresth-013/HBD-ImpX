import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import confetti from "canvas-confetti";

function random(min, max) { return Math.random() * (max - min) + min; }

const PETALS = ["🌸", "🌷", "✿", "❀", "🌺"];
const SPARKS  = ["✦", "✧", "⋆", "·", "★"];

// ─── background petals ────────────────────────────────────────────
function FloatingPetals() {
  const [petals, setPetals] = useState([]);
  useEffect(() => {
    setPetals(Array.from({ length: 16 }, (_, i) => ({
      id: i,
      emoji: PETALS[i % PETALS.length],
      left: `${random(0, 100)}%`,
      fontSize: `${random(11, 22)}px`,
      duration: `${random(12, 22)}s`,
      delay: `${random(0, 10)}s`,
      opacity: random(0.35, 0.75),
    })));
  }, []);
  return (
    <>
      {petals.map((p) => (
        <span key={p.id} className="animate-float-petal select-none"
          style={{ left: p.left, top: "-5%", fontSize: p.fontSize,
            animationDuration: p.duration, animationDelay: p.delay, opacity: p.opacity }}>
          {p.emoji}
        </span>
      ))}
    </>
  );
}

// ─── background sparkles ──────────────────────────────────────────
function BgSparkles() {
  const [sparks, setSparks] = useState([]);
  useEffect(() => {
    setSparks(Array.from({ length: 14 }, (_, i) => ({
      id: i, char: SPARKS[i % SPARKS.length],
      left: `${random(2, 98)}%`, top: `${random(2, 98)}%`,
      fontSize: `${random(8, 18)}px`,
      duration: random(2, 5), delay: random(0, 4),
    })));
  }, []);
  return (
    <>
      {sparks.map((s) => (
        <motion.span key={s.id} style={{ position: "fixed", left: s.left, top: s.top,
            fontSize: s.fontSize, color: "#e8a0c0", pointerEvents: "none", zIndex: 0, userSelect: "none" }}
          animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.6, 1.3, 0.6] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}>
          {s.char}
        </motion.span>
      ))}
    </>
  );
}

// ─── scroll reveal wrapper ────────────────────────────────────────
function RevealOnScroll({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const from = direction === "left" ? { x: -60, opacity: 0 }
             : direction === "right" ? { x: 60, opacity: 0 }
             : { y: 50, opacity: 0 };
  return (
    <motion.div ref={ref}
      initial={from}
      animate={inView ? { x: 0, y: 0, opacity: 1 } : from}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

// ─── SECTION 1 — intro quote card ─────────────────────────────────
function IntroHero() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "60px 20px 40px", textAlign: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        animate2={{ y: [0, -10, 0] }}
        style={{ maxWidth: 540, width: "90%" }}>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.88), rgba(255,228,240,0.82))",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1.5px solid rgba(255,182,210,0.45)",
            borderRadius: "24px",
            padding: "40px 36px",
            boxShadow: "0 16px 48px rgba(220,130,170,0.15), 0 2px 12px rgba(200,150,230,0.1)",
          }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>💗</div>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(17px, 2.8vw, 22px)",
            color: "#8b4567",
            lineHeight: 1.7,
            marginBottom: 14,
            fontStyle: "italic",
          }}>
            "Some memories don't fade, they just become warmer with time 💗"
          </p>
          <p style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(15px, 2.2vw, 18px)",
            color: "#c8889a",
          }}>
            A few little moments I never want to forget.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── SECTION 2 — timeline cards ───────────────────────────────────
const MEMORIES = [
  { title: "Our Childhood Chaos 🌈", text: "From silly fights to random laughter, childhood with you was never boring.", emoji: "🌈", tilt: -3, color: "#fce4ec" },
  { title: "The Protective One 💛",  text: "You always looked out for me, even when I didn't realize it.",              emoji: "💛", tilt:  4, color: "#fff9e6" },
  { title: "Little Wins, Big Smiles ✨", text: "Celebrating tiny victories together made them feel huge.",              emoji: "🏆", tilt: -2, color: "#f3e5f5" },
  { title: "The Silent Support 🌸",  text: "Even in difficult times, your support always stayed.",                     emoji: "🌸", tilt:  3, color: "#fce4ec" },
  { title: "Still My Safe Place 💌", text: "No matter how much life changes, you'll always be family, comfort, and home.", emoji: "🏠", tilt: -4, color: "#e8f5e9" },
];

function MemoryCard({ memory, index }) {
  const isLeft = index % 2 === 0;
  return (
    <div style={{
      display: "flex",
      justifyContent: isLeft ? "flex-start" : "flex-end",
      padding: "0 20px",
      position: "relative",
      zIndex: 2,
    }}>
      <RevealOnScroll delay={index * 0.1} direction={isLeft ? "left" : "right"}>
        <motion.div
          whileHover={{ scale: 1.04, y: -8, rotate: 0 }}
          style={{
            rotate: memory.tilt,
            background: "#fff",
            borderRadius: "6px",
            padding: "14px 14px 36px 14px",
            width: "clamp(220px, 36vw, 300px)",
            boxShadow: "0 10px 36px rgba(220,130,170,0.18), 0 2px 8px rgba(180,120,160,0.1)",
            border: "1.5px solid #f5d6e0",
            cursor: "default",
            position: "relative",
          }}>

          {/* tape corners */}
          {[[-10,-10, 30], [null,-10, -30]].map(([l, t, rot], i) => (
            <div key={i} style={{
              position: "absolute",
              top: t, left: i===0 ? l : undefined, right: i===1 ? -10 : undefined,
              width: 32, height: 14,
              background: "rgba(255,182,210,0.45)",
              borderRadius: 3,
              transform: `rotate(${rot}deg)`,
              backdropFilter: "blur(2px)",
            }}/>
          ))}

          {/* photo placeholder */}
          <div style={{
            width: "100%",
            height: "clamp(120px, 22vw, 160px)",
            background: `linear-gradient(135deg, ${memory.color}, #f8d7f0, #ede7f6)`,
            borderRadius: "3px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "clamp(36px, 7vw, 52px)",
            marginBottom: 14,
          }}>
            {memory.emoji}
          </div>

          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(13px, 2vw, 16px)",
            color: "#8b4567",
            marginBottom: 8,
            fontWeight: 700,
          }}>
            {memory.title}
          </h3>
          <p style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: "#b07890",
            lineHeight: 1.6,
          }}>
            {memory.text}
          </p>
        </motion.div>
      </RevealOnScroll>
    </div>
  );
}

function Timeline() {
  return (
    <div style={{ padding: "20px 0 60px", position: "relative" }}>
      <RevealOnScroll>
        <h2 style={{
          textAlign: "center",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(22px, 4vw, 36px)",
          color: "#8b4567",
          marginBottom: 8,
        }}>
          Our Little Story 📖
        </h2>
        <p style={{
          textAlign: "center",
          fontFamily: "'Dancing Script', cursive",
          fontSize: 18,
          color: "#c8889a",
          marginBottom: 48,
        }}>
          Moments I carry with me, always ✨
        </p>
      </RevealOnScroll>

      {/* vertical line */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: 120,
        bottom: 0,
        width: 2,
        transform: "translateX(-50%)",
        background: "linear-gradient(to bottom, rgba(255,182,210,0.6), rgba(216,180,255,0.4), rgba(255,218,190,0.3))",
        borderRadius: 2,
        zIndex: 1,
      }}/>

      <div style={{ display: "flex", flexDirection: "column", gap: 48, position: "relative" }}>
        {MEMORIES.map((memory, i) => (
          <div key={i} style={{ position: "relative" }}>
            {/* glowing dot */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ffb3c6, #d4b3ff)",
                boxShadow: "0 0 12px rgba(220,130,170,0.6)",
                zIndex: 3,
              }}/>
            <MemoryCard memory={memory} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SECTION 3 — admire grid ──────────────────────────────────────
const ADMIRE = [
  { label: "Your strength", emoji: "💪", color: "#fce4ec", glow: "rgba(255,182,210,0.4)" },
  { label: "Your kindness", emoji: "🌷", color: "#f3e5f5", glow: "rgba(216,180,255,0.4)" },
  { label: "Your patience", emoji: "✨", color: "#fff9e6", glow: "rgba(255,218,190,0.4)" },
  { label: "Your chaos",    emoji: "😆", color: "#fce4ec", glow: "rgba(255,182,210,0.4)" },
];

function AdmireGrid() {
  return (
    <div style={{ padding: "40px 20px 60px" }}>
      <RevealOnScroll>
        <h2 style={{
          textAlign: "center",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(20px, 3.5vw, 32px)",
          color: "#8b4567",
          marginBottom: 8,
        }}>
          Things I Admire About You 🌸
        </h2>
        <p style={{
          textAlign: "center",
          fontFamily: "'Dancing Script', cursive",
          fontSize: 17,
          color: "#c8889a",
          marginBottom: 36,
        }}>
          Just a few of many, many things ✨
        </p>
      </RevealOnScroll>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 20,
        maxWidth: 600,
        margin: "0 auto",
        padding: "0 10px",
      }}>
        {ADMIRE.map((item, i) => (
          <RevealOnScroll key={i} delay={i * 0.1}>
            <motion.div
              whileHover={{ scale: 1.08, y: -8, boxShadow: `0 12px 36px ${item.glow}` }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: `linear-gradient(135deg, ${item.color}, rgba(255,255,255,0.9))`,
                border: "1.5px solid rgba(255,182,210,0.35)",
                borderRadius: 20,
                padding: "28px 16px",
                textAlign: "center",
                cursor: "default",
                boxShadow: `0 4px 16px ${item.glow}`,
                transition: "box-shadow 0.3s",
              }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{item.emoji}</div>
              <p style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 16,
                color: "#8b4567",
                fontWeight: 600,
              }}>
                {item.label}
              </p>
            </motion.div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}

// ─── SECTION 4 — emotional closing ───────────────────────────────
function ClosingSection() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      emoji: ["💕","💗","💖","💝","💓","🌸","✨","💌"][i],
      left: `${10 + i * 11}%`,
      delay: i * 0.3,
      duration: random(3, 5),
    }));
    setHearts(items);
  }, []);

  return (
    <div style={{ padding: "40px 20px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      {/* floating hearts */}
      {hearts.map((h) => (
        <motion.span key={h.id}
          style={{ position: "absolute", left: h.left, bottom: "0%",
            fontSize: random(18, 32), pointerEvents: "none", userSelect: "none", zIndex: 0 }}
          animate={{ y: [0, -200, -400], opacity: [0, 1, 0] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "easeOut" }}>
          {h.emoji}
        </motion.span>
      ))}

      <RevealOnScroll>
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>💗</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(22px, 4vw, 36px)",
            color: "#8b4567",
            marginBottom: 16,
            fontStyle: "italic",
          }}>
            Thank you for being more than a sister. 💗
          </h2>
          <p style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(16px, 2.5vw, 20px)",
            color: "#b07890",
            maxWidth: 480,
            margin: "0 auto",
            lineHeight: 1.8,
          }}>
            You've been a guide, support system, and forever chaos partner.
          </p>
        </div>
      </RevealOnScroll>
    </div>
  );
}

function CTASection({ onRestart }) {
  const [showPopup, setShowPopup] = useState(false);

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ffb3c6", "#d4b3ff", "#ffd6b3", "#b3e0ff", "#ffd6e0"],
    });
  };

  return (
    <div style={{ padding: "20px 20px 80px", textAlign: "center" }}>
      <RevealOnScroll>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", marginBottom: 32 }}>

          <motion.button
            whileHover={{ y: -6, scale: 1.05, boxShadow: "0 12px 36px rgba(220,130,170,0.45)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setShowPopup(true); fireConfetti(); }}
            style={{
              background: "linear-gradient(135deg, rgba(255,182,210,0.65), rgba(255,218,190,0.55))",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1.5px solid rgba(255,182,210,0.55)",
              borderRadius: 999,
              padding: "14px 36px",
              fontSize: "clamp(14px, 2vw, 17px)",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              color: "#9b5a78",
              cursor: "none",
              boxShadow: "0 4px 20px rgba(220,130,170,0.2)",
              letterSpacing: "0.02em",
            }}>
            Now Give Me Party 🎉
          </motion.button>

          <motion.button
            whileHover={{ y: -6, scale: 1.05, boxShadow: "0 12px 36px rgba(216,180,255,0.45)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onRestart}
            style={{
              background: "linear-gradient(135deg, rgba(216,180,255,0.55), rgba(255,182,210,0.45))",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1.5px solid rgba(216,180,255,0.55)",
              borderRadius: 999,
              padding: "14px 36px",
              fontSize: "clamp(14px, 2vw, 17px)",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              color: "#7b5a9b",
              cursor: "none",
              boxShadow: "0 4px 20px rgba(216,180,255,0.2)",
              letterSpacing: "0.02em",
            }}>
            Revisit From Start ↺
          </motion.button>
        </div>

        <p style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 15,
          color: "#d4a0b5",
          letterSpacing: 1,
        }}>
          made with 💗 just for you, Didi
        </p>
      </RevealOnScroll>

      {/* Upgraded Party Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, zIndex: 100,
              background: "rgba(255,240,248,0.88)",
              backdropFilter: "blur(14px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.4, rotate: -8, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 16 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,228,240,0.92))",
                border: "1.5px solid rgba(255,182,210,0.5)",
                borderRadius: 28,
                padding: "44px 36px",
                maxWidth: 400,
                width: "90%",
                textAlign: "center",
                boxShadow: "0 24px 64px rgba(220,130,170,0.22), 0 4px 16px rgba(200,150,230,0.12)",
              }}
            >
              <motion.div
                animate={{ rotate: [0, -15, 15, -8, 8, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 1.2, delay: 0.3 }}
                style={{ fontSize: 60, marginBottom: 16 }}
              >
                🎉
              </motion.div>

              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                color: "#8b4567",
                fontSize: "clamp(18px, 3vw, 24px)",
                marginBottom: 10,
                fontWeight: 700,
              }}>
                Official Birthday Tax Collected 😌
              </h2>

              <p style={{
                fontFamily: "'Dancing Script', cursive",
                color: "#b07890",
                fontSize: 18,
                marginBottom: 16,
                lineHeight: 1.6,
              }}>
                Payment accepted in:
              </p>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                marginBottom: 28,
                fontFamily: "'Dancing Script', cursive",
                fontSize: 17,
                color: "#a07090",
                lineHeight: 1.9,
              }}>
                <span>🍰 Cake</span>
                <span>🍕 Food</span>
                <span>🎁 Treats</span>
                <span>💗 One Happy Smile</span>
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <motion.button
                  whileHover={{ scale: 1.06, y: -3, boxShadow: "0 8px 28px rgba(220,130,170,0.4)" }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setShowPopup(false)}
                  style={{
                    background: "linear-gradient(135deg, rgba(255,182,210,0.7), rgba(255,218,190,0.6))",
                    border: "1.5px solid rgba(255,182,210,0.55)",
                    borderRadius: 999,
                    padding: "11px 30px",
                    color: "#9b5a78",
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "none",
                    boxShadow: "0 4px 16px rgba(220,130,170,0.2)",
                  }}
                >
                  Deal 🤝
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.06, y: -3, boxShadow: "0 8px 28px rgba(216,180,255,0.4)" }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setShowPopup(false)}
                  style={{
                    background: "linear-gradient(135deg, rgba(216,180,255,0.55), rgba(255,182,210,0.4))",
                    border: "1.5px solid rgba(216,180,255,0.5)",
                    borderRadius: 999,
                    padding: "11px 30px",
                    color: "#7b5a9b",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 15,
                    cursor: "none",
                    boxShadow: "0 4px 16px rgba(216,180,255,0.2)",
                  }}
                >
                  Maybe Later 😆
                </motion.button>
              </div>

              {/* easter egg */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                style={{
                  marginTop: 22,
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: 13,
                  color: "#d4b0c0",
                  opacity: 0.75,
                }}
              >
                "I'll be there for you 💛"
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
// ─── MAIN EXPORT ──────────────────────────────────────────────────
export default function TimelinePage({ onRestart }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fff0f5, #fce4ec, #f3e5f5, #fff8f0, #fce4ec)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 10s ease infinite",
      fontFamily: "'Playfair Display', serif",
      position: "relative",
      overflowX: "hidden",
    }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Dancing+Script:wght@400;600&family=Lato:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <FloatingPetals />
      <BgSparkles />

      <div style={{ position: "relative", zIndex: 5 }}>
        <IntroHero />
        <Timeline />
        <AdmireGrid />
        <ClosingSection />
        <CTASection onRestart={onRestart} />
      </div>
    </div>
  );
}