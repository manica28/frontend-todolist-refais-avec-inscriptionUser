import React, { useState } from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as api from '../api/Taches';
import * as classes from '../styles/tailwindLoginPage';

export default function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ login: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await api.login(formData.login, formData.password);
      console.log("Résultat login:", result);
      onLoginSuccess(result);
      navigate("/taches");
    } catch (err) {
      console.error("Erreur connexion:", err);
      setError(err.message || "Erreur serveur");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <h2 className={classes.title}>Connexion</h2>

        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <label htmlFor="login" className={classes.label}>Login</label>
            <input
              type="text"
              id="login"
              value={formData.login}
              onChange={(e) => setFormData({ ...formData, login: e.target.value })}
              placeholder="Nom d'utilisateur"
              required
              className={classes.input}
            />
          </div>

          <div>
            <label htmlFor="password" className={classes.label}>Password</label>
            <div className={classes.inputWrapper}>
              <Lock className={classes.icon} />
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="********"
                required
                className={classes.inputField}
              />
            </div>
          </div>

          {error && <div className={classes.error}>{error}</div>}

          <button type="submit" className={classes.submitButton}>
            Se connecter
          </button>
        </form>

        <p className={classes.registerText}>
          Pas encore de compte ?{" "}
          <button onClick={() => navigate("/register")} className={classes.registerLink}>
            S’inscrire
          </button>
        </p>

        <p className={classes.backText}>
          <button onClick={() => navigate("/")} className={classes.backLink}>
            ← Retour à l’accueil
          </button>
        </p>
      </div>
    </div>
  );
}
