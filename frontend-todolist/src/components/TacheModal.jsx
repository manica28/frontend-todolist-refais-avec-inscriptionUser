import React, { useState, useEffect } from 'react';
import { X, UserPlus, Users } from 'lucide-react';

const TacheModal = ({ task, onClose, onSubmit, users = [] }) => {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    user_id: 1,
    delegue_id: null,
    imageUrl: ''
  });

  useEffect(() => {
    if (task) {
      setFormData({
        nom: task.nom || '',
        description: task.description || '',
        user_id: task.user_id || 1,
        delegue_id: task.delegue_id || null,
        imageUrl: task.imageUrl || ''
      });
    }
  }, [task]);

  const handleDelegateChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData, 
      delegue_id: value === '' || value === 'null' ? null : Number(value)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('DEBUG TacheModal - formData original:', formData);

    if (!formData.nom.trim() || formData.description.trim().length < 4) {
      alert('Le nom et la description doivent être remplis correctement (description ≥ 4 caractères)');
      return;
    }

    // Ne pas envoyer delegue_id si pas de délégation
    const submitData = {
      nom: formData.nom.trim(),
      description: formData.description.trim(),
      imageUrl: formData.imageUrl?.trim() || ''
    };

    // N'ajouter delegue_id que s'il y a vraiment une délégation
    if (formData.delegue_id && formData.delegue_id !== '' && formData.delegue_id !== 'null' && formData.delegue_id !== null) {
      submitData.delegue_id = Number(formData.delegue_id);
    }

    console.log('DEBUG TacheModal - submitData final:', submitData);
    console.log('DEBUG TacheModal - submitData JSON:', JSON.stringify(submitData));
    
    onSubmit(submitData);  // onSubmit est passé en props
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {task ? 'Modifier la tâche' : 'Nouvelle tâche'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nom de la tâche *</label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({...formData, nom: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Nom de la tâche"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              rows={3}
              placeholder="Description détaillée"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Déléguer à (optionnel)</span>
              </div>
            </label>
            
            <select
              value={formData.delegue_id || ''}
              onChange={handleDelegateChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Pas de délégation (je garde la tâche)</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.prenom} {user.nom} ({user.login})
                </option>
              ))}
            </select>

            {formData.delegue_id && (
              <div className="mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <div className="flex items-center text-blue-700">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Cette tâche sera déléguée</span>
                </div>
                <p className="text-blue-600 text-xs mt-1">
                  La personne déléguée pourra modifier, supprimer et changer le statut de cette tâche.
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">URL de l'image (optionnel)</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://example.com/image.jpg"
            />
            {formData.imageUrl && (
              <div className="mt-2">
                <img
                  src={formData.imageUrl}
                  alt="Aperçu"
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </div>
            )}
          </div>

          {/* Debug temporaire */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-xs">
            <strong>Debug Modal:</strong><br/>
            delegue_id: {String(formData.delegue_id)} (type: {typeof formData.delegue_id})
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all"
            >
              {task ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TacheModal;