import { motion } from "framer-motion";

export default function PageTransition({ children, id }) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      style={{ minHeight: "100vh" }}
    >
      {children}
    </motion.div>
  );
}