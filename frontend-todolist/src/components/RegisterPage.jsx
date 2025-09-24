import React, { useState } from 'react';
import { User, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import InputField from './InputField';
import { register } from '../api/Taches';
import { validateField, validateForm, sanitizeFormData } from '../utils/validation';
import * as classes from '../styles/tailwindRegisterPage';

const RegisterPage = ({ onRegister, onBackToLogin, connectionStatus }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    login: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  
  const handleFieldValidation = (field, value) => {
    const newErrors = { ...errors };
    const fieldError = validateField(field, value, formData);
    if (fieldError) newErrors[field] = fieldError;
    else delete newErrors[field];

    if (field === 'password' && formData.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword, {
        ...formData,
        password: value
      });
      if (confirmError) newErrors.confirmPassword = confirmError;
      else delete newErrors.confirmPassword;
    }

    if (field === 'confirmPassword') 
    {
      const confirmError = validateField('confirmPassword', value, formData);
      if (confirmError) newErrors.confirmPassword = confirmError;
      else delete newErrors.confirmPassword;
    }

    setErrors(newErrors);
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    handleFieldValidation(field, value);

    if (errors.general) {
      const newErrors = { ...errors };
      delete newErrors.general;
      setErrors(newErrors);
    }

    if (success) setSuccess('');
  };

  const validateCompleteForm = () => {
    const validation = validateForm(formData, 'REGISTER');
    setErrors(validation.errors);
    return validation.isValid;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrors({});
    setSuccess('');

    try {
      if (!validateCompleteForm()) {
        setErrors(prev => ({ 
          ...prev, 
          general: 'Veuillez remplir correctement tous les champs requis' 
        }));
        return;
      }

      const cleanData = sanitizeFormData(formData);
      const userData = {
        nom: cleanData.nom,
        prenom: cleanData.prenom,
        login: cleanData.login,
        password: cleanData.password
      };

      await register(userData);
      setSuccess('Compte créé avec succès ! Redirection vers la connexion...');
      if (onRegister) onRegister();
      setTimeout(() => { if (onBackToLogin) onBackToLogin(); }, 2000);

    } catch (error) {
      setErrors({ general: error.message || 'Une erreur inattendue s\'est produite' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.backgroundBlobs}></div>

      <div className={classes.card}>
        <div className={classes.header}>
          <div className="text-6xl mb-4">👤</div>
          <h1 className={classes.title}>Créer un compte</h1>
          <p className={classes.subtitle}>Rejoignez YallaBakhna aujourd'hui</p>
        </div>

        <div className={classes.formWrapper}>
          <InputField
            placeholder="Nom*"
            value={formData.nom}
            onChange={(val) => handleFieldChange('nom', val)}
            error={errors.nom}
            disabled={loading}
            maxLength={50}
          />
          <InputField
            placeholder="Prénom*"
            value={formData.prenom}
            onChange={(val) => handleFieldChange('prenom', val)}
            error={errors.prenom}
            disabled={loading}
            maxLength={50}
          />
          <InputField
            placeholder="Identifiant (login)*"
            value={formData.login}
            onChange={(val) => handleFieldChange('login', val)}
            error={errors.login}
            disabled={loading}
            maxLength={20}
            icon={User}
            autoComplete="username"
          />
          <InputField
            placeholder="Mot de passe*"
            value={formData.password}
            onChange={(val) => handleFieldChange('password', val)}
            error={errors.password}
            disabled={loading}
            maxLength={50}
            icon={Lock}
            showToggle
            showValue={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
            autoComplete="new-password"
          />
          <InputField
            placeholder="Confirmer le mot de passe*"
            value={formData.confirmPassword}
            onChange={(val) => handleFieldChange('confirmPassword', val)}
            error={errors.confirmPassword}
            disabled={loading}
            maxLength={50}
            icon={Lock}
            showToggle
            showValue={showConfirmPassword}
            onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
            autoComplete="new-password"
          />

          {errors.general && (
            <div className={classes.error}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}
          {success && (
            <div className={classes.success}>
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <button 
            type="button"
            onClick={handleSubmit}
            disabled={loading || connectionStatus !== 'connected'}
            className={classes.submitButton}
          >
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
        </div>

        <div className={classes.loginText}>
          <p>
            Déjà un compte ?{' '}
            <button 
              onClick={() => navigate("/login")} 
              className={classes.loginLink}
              disabled={loading}
            >
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
