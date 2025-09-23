import { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import TachesPage from './components/TachesPage';

export default function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null); // utilisateur connecté

  const handleLogin = (userData) => {
    setUser(userData);
    setPage('taches');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('home');
    localStorage.removeItem('token');
  };

  return (
    <div>
      {page === 'home' && <LandingPage onNavigateToLogin={() => setPage('login')} />}
      {page === 'login' && (
        <LoginPage
          onBackToHome={() => setPage('home')}
          onLoginSuccess={handleLogin}
          onNavigateToRegister={() => setPage('register')}
        />
      )}
      {page === 'register' && (
        <RegisterPage
          onBackToLogin={() => setPage('login')}
          onRegister={handleLogin}
          connectionStatus="connected" // ou dynamique selon ton backend
        />
       )}

      {page === 'taches' && <TachesPage user={user} onLogout={handleLogout} />}
    </div>
  );
}
