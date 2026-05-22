import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const TRAIL_COUNT = 6;

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });
  const trailsRef = useRef([]);
  const sparkles = useRef([]);

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // spawn sparkle
      const id = Date.now() + Math.random();
      const el = document.createElement("span");
      el.innerText = ["✦","✧","·","⋆","✨"][Math.floor(Math.random()*5)];
      el.style.cssText = `
        position: fixed;
        left: ${e.clientX + (Math.random()-0.5)*16}px;
        top: ${e.clientY + (Math.random()-0.5)*16}px;
        font-size: ${8+Math.random()*10}px;
        color: #e8a0c0;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.6s ease;
        opacity: 1;
        transform: scale(1);
      `;
      document.body.appendChild(el);
      setTimeout(() => {
        el.style.opacity = "0";
        el.style.transform = "scale(0) translateY(-12px)";
      }, 30);
      setTimeout(() => el.remove(), 660);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* outer ring */}
      <motion.div
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 32, height: 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(220,130,170,0.6)",
          pointerEvents: "none",
          zIndex: 9998,
          translateX: springX,
          translateY: springY,
          marginLeft: -16,
          marginTop: -16,
        }}
      />
      {/* inner dot */}
      <motion.div
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: "50%",
          background: "rgba(220,130,170,0.8)",
          pointerEvents: "none",
          zIndex: 9999,
          translateX: mouseX,
          translateY: mouseY,
          marginLeft: -4,
          marginTop: -4,
        }}
      />
    </>
  );
}