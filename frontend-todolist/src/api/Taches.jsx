// cette page contient les fonctions pour interagir avec l'API backend

const APIURL = 'http://localhost:4000';

// Fonction pour décoder le JWT et obtenir l'ID utilisateur
export const getCurrentUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.warn('Pas de token trouvé');
        return null;
    }
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Payload JWT:', payload);
        return payload.id || payload.userId || payload.user_id;
    } catch (error) {
        console.error('Erreur décodage JWT:', error);
        return null;
    }
};

// /src/utils/auth.js
export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    // le payload est la 2ème partie du JWT (header.payload.signature)
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId || payload.id || null; // dépend de ton backend
  } catch (error) {
    console.error("Erreur lors du décodage du token", error);
    return null;
  }
};

// Fonction pour obtenir les en-têtes avec le token d'authentification
const getHeaders = () => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };
    console.log('Headers définis:', headers);
    return headers;
};

// Fonction pour gérer les réponses de l'API
const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMessage = `Erreur Http: ${response.status}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (error) {
            console.error('Erreur lors de la récupération des données d\'erreur:', error);
        }
        throw new Error(errorMessage);
    }
    if (response.status === 204) {
        return null;
    }
    return response.json();
};

// Fonction d'inscription
export const register = async (userData) => {
    try {
        const response = await fetch(`${APIURL}/users`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const responseText = await response.text();
        let responseData;
        
        try {
            responseData = responseText.trim() === '' ? {} : JSON.parse(responseText);
        } catch (parseError) {
            throw new Error(`Réponse serveur non-JSON (${response.status}): ${responseText.substring(0, 100)}`);
        }

        if (!response.ok) {
            let errorMessage = 'Erreur lors de la création du compte';
            
            if (responseData.error) {
                errorMessage = responseData.error;
            } else if (responseData.message) {
                errorMessage = responseData.message;
            } else if (typeof responseData === 'string') {
                errorMessage = responseData;
            } else if (responseText && responseText !== '{}') {
                errorMessage = responseText;
            }

            switch (response.status) {
                case 400:
                    errorMessage = `Données invalides: ${errorMessage}`;
                    break;
                case 409:
                    errorMessage = 'Cet identifiant existe déjà';
                    break;
                case 500:
                    errorMessage = `Erreur serveur interne: ${errorMessage}`;
                    break;
                default:
                    errorMessage = `Erreur HTTP ${response.status}: ${errorMessage}`;
            }

            throw new Error(errorMessage);
        }

        return responseData;
        
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Impossible de se connecter au serveur. Vérifiez que le serveur est démarré sur le port 4000.');
        }
        throw error;
    }
};

// Fonction de connexion
export const login = async (login, password) => {
    try {
        const response = await fetch(`${APIURL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password })
        });

        const data = await handleResponse(response);
        console.log('Connexion réussie:', data);

        if (data.token) {
            localStorage.setItem('token', data.token);
        }
        return data;
    } catch (error) {
        console.error('Erreur connexion:', error);
        throw error;
    }
};

// Fonction qui récupère toutes les tâches
export const getTaches = async () => {
    try {
        const response = await fetch(`${APIURL}/taches`, {
            method: 'GET',
            headers: getHeaders()
        });
        const data = await handleResponse(response);
        console.log('Tâches récupérées:', data);
        return data;
    } catch (error) {
        console.error('Erreur récupération tâches:', error);
        throw error;
    }
};

export const createTaches = async (taskData) => {
    console.log('=== DEBUG createTaches START ===');
    console.log('Données reçues:', taskData);
    
    try {
        // Essayer le format le plus simple possible d'abord
        const simpleData = {
            nom: taskData.nom,
            description: taskData.description
        };

        // Ajouter imageUrl seulement si fournie
        if (taskData.imageUrl && taskData.imageUrl.trim() !== '') {
            simpleData.imageUrl = taskData.imageUrl.trim();
        }

        // Ajouter delegue_id seulement si fournie et valide
        if (taskData.delegue_id && taskData.delegue_id !== null && !isNaN(Number(taskData.delegue_id))) {
            simpleData.delegue_id = Number(taskData.delegue_id);
        }

        console.log('Données simplifiées à envoyer:', simpleData);
        console.log('JSON string:', JSON.stringify(simpleData));

        const token = localStorage.getItem('token');
        console.log('Token présent:', !!token);
        console.log('Token value:', token?.substring(0, 20) + '...');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        console.log('Headers:', headers);

        const url = `${APIURL}/taches`;
        console.log('URL complète:', url);

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(simpleData)
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        // Lire la réponse
        const responseText = await response.text();
        console.log('Response body (raw):', responseText);

        if (!response.ok) {
            console.error('Erreur HTTP:', response.status);
            
            // Essayer de parser la réponse d'erreur
            let errorData;
            try {
                errorData = JSON.parse(responseText);
                console.error('Erreur JSON parsed:', errorData);
            } catch {
                console.error('Erreur non-JSON:', responseText);
            }
            
            throw new Error(`HTTP ${response.status}: ${responseText}`);
        }

        // Parser la réponse de succès
        let data;
        try {
            data = JSON.parse(responseText);
            console.log('Success data parsed:', data);
        } catch (e) {
            console.error('Erreur parsing success response:', e);
            throw new Error('Réponse invalide du serveur');
        }

        console.log('=== DEBUG createTaches SUCCESS ===');
        return data;
        
    } catch (error) {
        console.error('=== DEBUG createTaches ERROR ===');
        console.error('Error type:', error.constructor.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.log('=== DEBUG createTaches END ===');
        throw error;
    }
};

// Fonction qui met à jour une tâche
export const updateTaches = async (id, taskData) => {
    try {
        const response = await fetch(`${APIURL}/taches/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(taskData)
        });

        const data = await handleResponse(response);
        console.log('Tâche mise à jour avec succès:', data);
        return data;
    } catch (error) {
        console.error('Erreur mise à jour tâche:', error);
        throw error;
    }
};

// Fonction qui supprime une tâche
export const deleteTaches = async (id) => {
    try {
        const response = await fetch(`${APIURL}/taches/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        await handleResponse(response);
        console.log('Tâche supprimée avec succès');
        return true;
    } catch (error) {
        console.error('Erreur suppression tâche:', error);
        throw error;
    }
};

// Fonction qui met à jour le statut de la tâche
export const updateStatus = async (id, status) => {
    try {
        const response = await fetch(`${APIURL}/taches/${id}/status`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify({ status })
        });
        const data = await handleResponse(response);
        console.log('Statut mis à jour avec succès:', data);
        return data;
    } catch (error) {
        console.error('Erreur mise à jour statut:', error);
        throw error;
    }
};

// Fonction qui récupère tous les utilisateurs
export const getAllUsers = async () => {
    try {
        const response = await fetch(`${APIURL}/users`, {
            method: 'GET',
            headers: getHeaders()
        });
        const data = await handleResponse(response);
        console.log('Utilisateurs récupérés:', data);
        return data;
    } catch (error) {
        console.error('Erreur récupération utilisateurs:', error);
        throw error;
    }
};

// Fonction qui gère la délégation de tâches
export const delegateTaches = async (taskId, delegateId) => {
    try {
        const response = await fetch(`${APIURL}/taches/${taskId}`, {
            method: 'GET',
            headers: getHeaders()
        });
        
        if (!response.ok) {
            throw new Error("Impossible de récupérer la tâche");
        }

        const existingTache = await response.json();

        const updateResponse = await fetch(`${APIURL}/taches/${taskId}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({
                nom: existingTache.nom,
                description: existingTache.description,
                user_id: existingTache.user_id,
                delegue_id: delegateId,
                imageUrl: existingTache.imageUrl || ''
            })
        });
        
        const data = await handleResponse(updateResponse);
        console.log('Tâche déléguée avec succès:', data);
        return data;
    } catch (error) {
        console.error('Erreur délégation tâche:', error);
        throw error;
    }
};

// Fonction pour récupérer les informations complètes de l'utilisateur connecté
export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.warn('Pas de token trouvé');
        return null;
    }
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Payload JWT complet:', payload);
        
        // Retourner toutes les infos disponibles
        return {
            id: payload.id || payload.userId || payload.user_id,
            nom: payload.nom || payload.lastname,
            prenom: payload.prenom || payload.firstname,
            login: payload.login || payload.username,
            email: payload.email
        };
    } catch (error) {
        console.error('Erreur décodage JWT:', error);
        return null;
    }
};

// Alternative : Récupérer les infos utilisateur depuis l'API
export const getUserInfo = async (userId) => {
    try {
        const response = await fetch(`${APIURL}/users/${userId}`, {
            method: 'GET',
            headers: getHeaders()
        });
        
        const data = await handleResponse(response);
        console.log('Infos utilisateur récupérées:', data);
        return data;
    } catch (error) {
        console.error('Erreur récupération infos utilisateur:', error);
        throw error;
    }
};