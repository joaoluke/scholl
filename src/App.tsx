import { Routes, Route } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

import { Header, Alert } from "./components";
import { Students, Courses } from "./pages";
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

      <Header />
      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </div>
  );
}

export default App;
