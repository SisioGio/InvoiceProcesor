import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { useBeforeunload } from "react-beforeunload";
import Header from "./components/header";

import Home from "./components/home/home";
import Invoice from "./components/invoice/invoice";
function App() {
  useBeforeunload(() => "Are you sure to close this tab?");

  const alertUser = () => {
    alert("Hello!");
  };

  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invoice/:id" element={<Invoice />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
