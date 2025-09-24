// utils/validation.js - Fonctions de validation centralisées

/**
 * Valide un nom ou prénom
 * @param {string} value - La valeur à valider
 * @param {string} fieldName - Le nom du champ (pour les messages d'erreur)
 * @returns {string|null} - Message d'erreur ou null si valide
 */
export const validateName = (value, fieldName = 'nom') => {
  if (!value || !value.trim()) {
    return `Le ${fieldName} est obligatoire`;
  }
  
  if (value.trim().length < 2) {
    return `Le ${fieldName} doit contenir au moins 2 caractères`;
  }
  
  if (!/^[a-zA-ZÀ-ÿ\s-']+$/.test(value.trim())) {
    return `Le ${fieldName} ne peut contenir que des lettres, espaces, tirets et apostrophes`;
  }
  
  return null;
};

/**
 * Valide un identifiant de connexion
 * @param {string} value - La valeur à valider
 * @returns {string|null} - Message d'erreur ou null si valide
 */
export const validateLogin = (value) => {
  if (!value || !value.trim()) {
    return 'L\'identifiant est obligatoire';
  }
  
  if (value.trim().length < 3) {
    return 'L\'identifiant doit contenir au moins 3 caractères';
  }
  
  if (value.trim().length > 20) {
    return 'L\'identifiant ne peut pas dépasser 20 caractères';
  }
  
  if (!/^[a-zA-Z0-9_.-]+$/.test(value.trim())) {
    return 'L\'identifiant ne peut contenir que des lettres, chiffres, tirets, points et underscores';
  }
  
  return null;
};

/**
 * Valide un mot de passe
 * @param {string} value - La valeur à valider
 * @returns {string|null} - Message d'erreur ou null si valide
 */
export const validatePassword = (value) => {
  if (!value) {
    return 'Le mot de passe est obligatoire';
  }
  
  if (value.length < 4) {
    return 'Le mot de passe doit contenir au moins 4 caractères';
  }
  
  if (value.length > 50) {
    return 'Le mot de passe ne peut pas dépasser 50 caractères';
  }
  
  return null;
};

/**
 * Valide la confirmation de mot de passe
 * @param {string} value - La valeur à valider
 * @param {string} originalPassword - Le mot de passe original
 * @returns {string|null} - Message d'erreur ou null si valide
 */
export const validateConfirmPassword = (value, originalPassword) => {
  if (!value) {
    return 'La confirmation est obligatoire';
  }
  
  if (value !== originalPassword) {
    return 'Les mots de passe doivent être identiques';
  }
  
  return null;
};

/**
 * Valide un email
 * @param {string} value - La valeur à valider
 * @returns {string|null} - Message d'erreur ou null si valide
 */
export const validateEmail = (value) => {
  if (!value || !value.trim()) {
    return 'L\'email est obligatoire';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value.trim())) {
    return 'Format d\'email invalide';
  }
  
  return null;
};

/**
 * Valide un champ de formulaire selon son type
 * @param {string} field - Le nom du champ
 * @param {string} value - La valeur à valider
 * @param {Object} formData - Les données complètes du formulaire (pour la validation croisée)
 * @returns {string|null} - Message d'erreur ou null si valide
 */
export const validateField = (field, value, formData = {}) => {
  switch (field) {
    case 'nom':
      return validateName(value, 'nom');
      
    case 'prenom':
      return validateName(value, 'prénom');
      
    case 'login':
      return validateLogin(value);
      
    case 'password':
      return validatePassword(value);
      
    case 'confirmPassword':
      return validateConfirmPassword(value, formData.password);
      
    case 'email':
      return validateEmail(value);
      
    default:
      return null;
  }
};

/**
 * Valide un objet de données complet
 * @param {Object} formData - Les données du formulaire à valider
 * @param {Array} requiredFields - Les champs obligatoires
 * @returns {Object} - Objet contenant les erreurs trouvées
 */
export const validateFormData = (formData, requiredFields = []) => {
  const errors = {};
  
  // Valider chaque champ
  Object.keys(formData).forEach(field => {
    const error = validateField(field, formData[field], formData);
    if (error) {
      errors[field] = error;
    }
  });
  
  // Vérifier les champs manquants
  const missingFields = requiredFields.filter(field => 
    !formData[field] || (typeof formData[field] === 'string' && !formData[field].trim())
  );
  
  if (missingFields.length > 0) {
    missingFields.forEach(field => {
      if (!errors[field]) {
        errors[field] = `Le champ ${field} est obligatoire`;
      }
    });
  }
  
  return errors;
};

/**
 * Vérifie si un formulaire est valide
 * @param {Object} formData - Les données du formulaire
 * @param {Array} requiredFields - Les champs obligatoires
 * @returns {boolean} - true si le formulaire est valide, false sinon
 */
export const isFormValid = (formData, requiredFields = []) => {
  const errors = validateFormData(formData, requiredFields);
  return Object.keys(errors).length === 0;
};

/**
 * Nettoie les données d'un formulaire
 * @param {Object} formData - Les données du formulaire à nettoyer
 * @returns {Object} - Les données nettoyées
 */
export const sanitizeFormData = (formData) => {
  const sanitized = {};
  
  Object.keys(formData).forEach(key => {
    if (typeof formData[key] === 'string') {
      // Nettoyer les chaînes de caractères
      if (['nom', 'prenom', 'login', 'email'].includes(key)) {
        sanitized[key] = formData[key].trim();
      } else {
        // Pour les mots de passe, on ne fait pas de trim automatique
        sanitized[key] = formData[key];
      }
    } else {
      sanitized[key] = formData[key];
    }
  });
  
  // Convertir le login en minuscules
  if (sanitized.login) {
    sanitized.login = sanitized.login.toLowerCase();
  }
  
  return sanitized;
};

/**
 * Règles de validation prédéfinies pour différents types de formulaires
 */
export const VALIDATION_RULES = {
  REGISTER: {
    requiredFields: ['nom', 'prenom', 'login', 'password', 'confirmPassword'],
    fieldTypes: ['nom', 'prenom', 'login', 'password', 'confirmPassword']
  },
  
  LOGIN: {
    requiredFields: ['login', 'password'],
    fieldTypes: ['login', 'password']
  },
  
  PROFILE: {
    requiredFields: ['nom', 'prenom', 'email'],
    fieldTypes: ['nom', 'prenom', 'email']
  },
  
  TASK: {
    requiredFields: ['nom', 'description'],
    fieldTypes: ['nom', 'description']
  }
};

/**
 * Valide un formulaire selon un type prédéfini
 * @param {Object} formData - Les données du formulaire
 * @param {string} formType - Le type de formulaire (REGISTER, LOGIN, etc.)
 * @returns {Object} - Objet contenant isValid et errors
 */
export const validateForm = (formData, formType) => {
  const rules = VALIDATION_RULES[formType];
  if (!rules) {
    throw new Error(`Type de formulaire non reconnu: ${formType}`);
  }
  
  const errors = validateFormData(formData, rules.requiredFields);
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};