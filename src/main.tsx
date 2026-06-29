import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouterProvider } from "./app/app-router-provider";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouterProvider />
  </StrictMode>,
);
