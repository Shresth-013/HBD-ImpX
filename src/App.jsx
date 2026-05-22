import { useState } from "react";
import LandingPage from "./LandingPage";
import CelebrationPage from "./CelebrationPage";
import TimelinePage from "./TimelinePage";

export default function App() {
  const [page, setPage] = useState("landing");

  if (page === "timeline") return <TimelinePage onRestart={() => setPage("landing")} />;
  if (page === "celebration") return <CelebrationPage onNext={() => setPage("timeline")} />;
  return <LandingPage onEnter={() => setPage("celebration")} />;
}