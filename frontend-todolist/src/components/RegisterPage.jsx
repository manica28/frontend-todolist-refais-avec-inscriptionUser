import React, { useState } from 'react';
import { ArrowLeft, User, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const RegisterPage = ({ onRegister, onBackToLogin, connectionStatus }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    login: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const API_URL = 'http://localhost:4000';

  // Fonction d'inscription
  const registerUser = async (userData) => {
    console.log("Données envoyées au backend:", userData);
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  // Validation des données
  const validateForm = () => {
    if (!formData.nom.trim()) return "Le nom est requis";
    if (!formData.prenom.trim()) return "Le prénom est requis";
    if (!formData.login.trim()) return "L'identifiant est requis";
    if (formData.login.length < 3) return "L'identifiant doit contenir au moins 3 caractères";
    if (!formData.password) return "Le mot de passe est requis";
    if (formData.password.length < 4) return "Le mot de passe doit contenir au moins 4 caractères";
    if (formData.password !== formData.confirmPassword) return "Les mots de passe ne correspondent pas";
    return null;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
   try {
  const userData = {
    nom: formData.nom.trim(),
    prenom: formData.prenom.trim(),
    login: formData.login.trim().toLowerCase(),
    password: formData.password
  };

  const result = await registerUser(userData);

  console.log('✅ Registration successful:', result);

  //  Ne pas connecter automatiquement : on ne fait pas onRegister(result)

  setSuccess('Compte créé avec succès ! Veuillez vous connecter.');

  // Rediriger vers la page de login après 1.5s
  
 setTimeout(() => {
  onBackToLogin(); // ← redirige vers la page de login
}, 1500);

} catch (err) {
  console.error(' Registration error:', err);
  setError(err.message);
} finally {
  setLoading(false);
}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Particules d'arrière-plan animées */}
      <div className="absolute inset-0">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
             style={{ animation: 'blob 7s infinite' }} />
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
             style={{ animation: 'blob 7s infinite', animationDelay: '2s' }} />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
             style={{ animation: 'blob 7s infinite', animationDelay: '4s' }} />
      </div>

      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
        {/* Bouton retour */}
        <button
          onClick={onBackToLogin}
          className="flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Retour à la connexion</span>
        </button>

        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">👤</div>
          <h1 className="text-3xl font-bold text-white mb-2">Créer un compte</h1>
          <p className="text-white/70 text-lg">Rejoignez YallaBakhna aujourd'hui</p>
        </div>

        {/* Indicateur de connexion serveur */}
        <div className={`inline-flex items-center justify-center w-full space-x-2 mb-6 px-3 py-2 rounded-full text-sm ${
          connectionStatus === 'connected'
            ? 'bg-green-500/20 text-green-200 border border-green-400/30'
            : 'bg-red-500/20 text-red-200 border border-red-400/30'
        }`}>
          {connectionStatus === 'connected' ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Serveur prêt</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4" />
              <span>Serveur non disponible</span>
            </>
          )}
        </div>

        {/* Formulaire */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Nom et Prénom */}
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Nom" value={formData.nom} onChange={(e) => setFormData({...formData, nom: e.target.value})}
                   className="w-full pl-4 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                   disabled={loading} required />
            <input type="text" placeholder="Prénom" value={formData.prenom} onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                   className="w-full pl-4 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                   disabled={loading} required />
          </div>

          {/* Identifiant */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-white/40" />
            </div>
            <input type="text" placeholder="Identifiant (login)" value={formData.login}
                   onChange={(e) => setFormData({...formData, login: e.target.value})}
                   className="w-full pl-10 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                   disabled={loading} required />
          </div>

          {/* Mot de passe */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-white/40" />
            </div>
            <input type={showPassword ? "text" : "password"} placeholder="Mot de passe" value={formData.password}
                   onChange={(e) => setFormData({...formData, password: e.target.value})}
                   className="w-full pl-10 pr-12 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                   disabled={loading} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/60 transition-colors">
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Confirmation */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-white/40" />
            </div>
            <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirmer le mot de passe" value={formData.confirmPassword}
                   onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                   className="w-full pl-10 pr-12 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                   disabled={loading} required />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/60 transition-colors">
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Messages */}
          {error && <div className="flex items-center space-x-2 bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-3 rounded-2xl text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> <span>{error}</span>
          </div>}

          {success && <div className="flex items-center space-x-2 bg-green-500/20 border border-green-400/30 text-green-200 px-4 py-3 rounded-2xl text-sm">
            <CheckCircle className="w-4 h-4 flex-shrink-0" /> <span>{success}</span>
          </div>}

          {/* Bouton */}
          <button type="submit"
                  disabled={loading || connectionStatus !== 'connected'}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 px-6 rounded-2xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl">
            <div className="flex items-center justify-center space-x-2">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Création en cours...</span>
                </>
              ) : (
                <>
                  <User className="w-5 h-5" />
                  <span>Créer mon compte</span>
                </>
              )}
            </div>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm mb-4">
            Déjà un compte ?{' '}
            <button onClick={onBackToLogin} className="text-red-300 hover:text-red-200 font-medium transition-colors underline">
              Se connecter
            </button>
          </p>
          <p className="text-white/40 text-xs">
            En créant un compte, vous acceptez nos conditions d'utilisation.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
