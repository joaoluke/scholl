import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components";
import { Students } from "./pages";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Students />} />
      </Routes>
    </div>
  );
}

export default App;
