import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StudentContextProvider from "./contexts/Student";
import AlertsContextProvider from "./contexts/Alerts";
import CoursesContextProvider from "./contexts/Courses";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { BrowserRouter } from "react-router-dom";

import "remixicon/fonts/remixicon.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CoursesContextProvider>
      <AlertsContextProvider>
        <StudentContextProvider>
          <BrowserRouter>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <App />
            </LocalizationProvider>
          </BrowserRouter>
        </StudentContextProvider>
      </AlertsContextProvider>
    </CoursesContextProvider>
  </React.StrictMode>
);
