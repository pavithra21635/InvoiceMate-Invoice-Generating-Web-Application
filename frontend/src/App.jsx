// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Router>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}
