import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container as Element);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);