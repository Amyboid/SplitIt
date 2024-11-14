import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LogtoProvider, LogtoConfig } from "@logto/react";

const config: LogtoConfig = {
  endpoint: "https://7wyo02.logto.app/",
  appId: "5g5383xkm0aacfs62bn7g",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LogtoProvider config={config}>
      <App />
    </LogtoProvider>
  </React.StrictMode>
);
