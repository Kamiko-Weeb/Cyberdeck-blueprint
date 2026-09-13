import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DeckApp } from "@/components/deck-app";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DeckApp />
  </StrictMode>,
);
