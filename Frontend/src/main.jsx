import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastWrapper } from "./Toast";
import './index.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastWrapper />
    <App />
  </BrowserRouter>
);
