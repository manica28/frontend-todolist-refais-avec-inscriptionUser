import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import TachesPage from "./components/TachesPage";

export default function App() {
  const [user, setUser] = useState(null); // utilisateur connecté

  const handleLogin = (userData) => {
    console.log("📋 Connexion utilisateur:", userData);
    setUser(userData);
  };

  const handleRegisterSuccess = () => {
    console.log(" Inscription réussie - redirection vers login");
  };

  const handleLogout = () => {
    console.log(" Déconnexion utilisateur");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            <LoginPage
              onLoginSuccess={handleLogin}
            />
          }
        />

        <Route
          path="/register"
          element={
            <RegisterPage
              onRegister={handleRegisterSuccess}
            />
          }
        />

        <Route
          path="/taches"
          element={user ? <TachesPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />

        {/* Rediriger toutes les autres routes vers home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
