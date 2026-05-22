import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LandingPage from "./LandingPage";
import CelebrationPage from "./CelebrationPage";
import TimelinePage from "./TimelinePage";
import Preloader from "./Preloader";
import MusicToggle from "./MusicToggle";
import CustomCursor from "./CustomCursor";
import PageTransition from "./PageTransition";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("landing");

  return (
    <>
      <CustomCursor />
      <MusicToggle />

      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" onDone={() => setLoading(false)} />
        ) : (
          <PageTransition key={page} id={page}>
            {page === "timeline" && (
              <TimelinePage onRestart={() => setPage("landing")} />
            )}
            {page === "celebration" && (
              <CelebrationPage onNext={() => setPage("timeline")} />
            )}
            {page === "landing" && (
              <LandingPage onEnter={() => setPage("celebration")} />
            )}
          </PageTransition>
        )}
      </AnimatePresence>
    </>
  );
}