import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

import { Header, Alert } from "./components";
import { Students } from "./pages";
import { useAlertsContext } from "./contexts/Alerts";

function App() {
  const { openAlertSuccess, messageAlertSuccess, handleCloseAlertSuccess, typeAlert } =
    useAlertsContext();

  console.log(openAlertSuccess)

  return (
    <div className="App">
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openAlertSuccess}
        autoHideDuration={6000}
        onClose={handleCloseAlertSuccess}
      >
        <Alert onClose={handleCloseAlertSuccess} severity={typeAlert} sx={{ width: "100%" }}>
          {messageAlertSuccess}
        </Alert>
      </Snackbar>

      <Header></Header>
      <Routes>
        <Route path="/" element={<Students />} />
      </Routes>
    </div>
  );
}

export default App;
