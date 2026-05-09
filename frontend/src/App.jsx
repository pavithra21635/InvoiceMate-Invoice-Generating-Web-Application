// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import InvoicePage from "./pages/InvoicePage";
// import DraftsPage from "./pages/DraftsPage";

export default function App() {
  return (
    <Router>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/invoices" element={<InvoicePage />} />
          {/* <Route path="/drafts" element={<DraftsPage />} />  */}
        </Routes>
      </div>
    </Router>
  );
}
