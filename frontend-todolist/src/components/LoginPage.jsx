import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";
import * as api from '../api/Taches';

export default function LoginPage({ onBackToHome, onNavigateToRegister,  onLoginSuccess  }) 
{
  // const [login, setLogin] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({login: '', password :''})

  const handleSubmit = async  (e) => {
    e.preventDefault();
    console.log("Login:", formData.login);
    console.log("Password:", formData.password);
    // Ici tu peux ajouter ta logique de connexion
    try {
      const result = await api.login(formData.login, formData.password);
        onLoginSuccess(result)
    }
     catch (error) 
     {
      setError(error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Connexion
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Connecte-toi à ton compte pour continuer 
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="login" className="block text-sm font-medium text-gray-700">
              Login
            </label>
            <div className="mt-1 flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-red-500">
              <input
                type="text"
                id="email"
                value={formData.login}
                onChange={(e) => setFormData({...formData, login: e.target.value}) }
                placeholder="aminata"
                required
                className="flex-1 outline-none text-gray-900"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 flex items-center border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-red-500">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value}) }
                placeholder="********"
                required
                className="flex-1 outline-none text-gray-900"
              />
            </div>
          </div>
          
          { error && (
              <div className ="bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-[1.02] shadow-lg"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
            Pas encore de compte ?{" "}
            <button
              onClick={onNavigateToRegister}
              className="text-red-600 hover:underline"
            >
              S’inscrire
            </button>
        </p>

        <p className="mt-2 text-center">
          <button
            onClick={onBackToHome}
            className="text-gray-500 hover:text-red-600 transition-colors text-sm"
          >
            ← Retour à l’accueil
          </button>
        </p>
      </div>
    </div>
  );
}
