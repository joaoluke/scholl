import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Students } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Students />} />
      </Routes>
    </div>
  );
}

export default App;
