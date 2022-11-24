import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StudentContextProvider from "./contexts/Student";
import { BrowserRouter } from "react-router-dom";

import 'remixicon/fonts/remixicon.css'


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StudentContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StudentContextProvider>
  </React.StrictMode>
);
