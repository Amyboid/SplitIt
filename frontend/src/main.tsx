import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LogtoProvider, LogtoConfig } from "@logto/react";
import { LogtoAppId, LogtoEndpoint } from "./lib/const.ts";

const config: LogtoConfig = {
  endpoint: LogtoEndpoint,
  appId: LogtoAppId,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LogtoProvider config={config}>
      <App />
    </LogtoProvider>
  </React.StrictMode>
);
