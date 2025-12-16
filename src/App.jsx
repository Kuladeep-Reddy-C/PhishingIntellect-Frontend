import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import DetectPage from "./pages/DetectPage";
import ReportPage from "./pages/ReportPage";
import AboutPage from "./pages/AboutPage";
import Login from "./pages/Login";
import Auth from "./pages/Auth/Auth";
function App() {
  return (
    <Router>
      <Routes>
        {/* Auth gate */}
        <Route path="/" element={<Auth />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/detect"
          element={
            <MainLayout>
              <DetectPage />
            </MainLayout>
          }
        />
        <Route
          path="/report"
          element={
            <MainLayout>
              <ReportPage />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
