import React, { useState, useEffect } from 'react';
import { X, UserPlus, Users } from 'lucide-react';
import {modalContainer,modalContent,inputClass,textareaClass,selectClass,buttonPrimary,buttonSecondary,labelClass, delegateInfo,imagePreview} from '../styles/tailwindModal';

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

    if (!formData.nom.trim() || formData.description.trim().length < 4) {
      alert('Le nom et la description doivent être remplis correctement (description ≥ 4 caractères)');
      return;
    }

    const submitData = {
      nom: formData.nom.trim(),
      description: formData.description.trim(),
      imageUrl: formData.imageUrl?.trim() || ''
    };

    if (formData.delegue_id) {
      submitData.delegue_id = Number(formData.delegue_id);
    }

    onSubmit(submitData);
  };

  return (
    <div className={modalContainer}>
      <div className={modalContent}>
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
          {/* Nom */}
          <div>
            <label className={labelClass}>Nom de la tâche *</label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className={inputClass}
              placeholder="Nom de la tâche"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={textareaClass}
              rows={3}
              placeholder="Description détaillée"
              required
            />
          </div>

          {/* Délégation */}
          <div>
            <label className={labelClass}>
              <div className="flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Déléguer à (optionnel)</span>
              </div>
            </label>
            <select
              value={formData.delegue_id || ''}
              onChange={handleDelegateChange}
              className={selectClass}
            >
              <option value="">Pas de délégation (je garde la tâche)</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.prenom} {user.nom} ({user.login})
                </option>
              ))}
            </select>

            {formData.delegue_id && (
              <div className={delegateInfo}>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="font-medium">Cette tâche sera déléguée</span>
                </div>
                <p className="text-xs mt-1">
                  La personne déléguée pourra modifier, supprimer et changer le statut de cette tâche.
                </p>
              </div>
            )}
          </div>

          {/* Image */}
          <div>
            <label className={labelClass}>URL de l'image (optionnel)</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className={inputClass}
              placeholder="https://example.com/image.jpg"
            />
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Aperçu"
                className={imagePreview}
                onError={(e) => (e.target.style.display = 'none')}
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-6">
            <button type="button" onClick={onClose} className={buttonSecondary}>
              Annuler
            </button>
            <button type="submit" className={buttonPrimary}>
              {task ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TacheModal;
