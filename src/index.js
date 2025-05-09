import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"; // Importa el componente principal

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App /> {/* Renderiza el componente principal */}
  </React.StrictMode>
);