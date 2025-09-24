import React, { useState, useEffect, useRef } from 'react';
import { X, UserPlus, Users, Mic, StopCircle } from 'lucide-react';
import {modalContainer, modalContent, inputClass, textareaClass, selectClass, buttonPrimary, buttonSecondary, labelClass, delegateInfo, imagePreview} from '../styles/tailwindModal';

const TacheModal = ({ task, onClose, onSubmit, users = [] }) => {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    user_id: 1,
    delegue_id: null,
    imageUrl: ''
  });

  // --- Vocaux ---
  const [isRecording, setIsRecording] = useState(false);
  const [audioFiles, setAudioFiles] = useState([]); // {url, blob}
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    if (task) {
      setFormData({
        nom: task.nom || '',
        description: task.description || '',
        user_id: task.user_id || 1,
        delegue_id: task.delegue_id || null,
        imageUrl: task.imageUrl || ''
      });
      setAudioFiles(task.vocaux || []);
    }
  }, [task]);

  // --- Enregistrement vocal ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioFiles(prev => [...prev, { url, blob }]);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Erreur micro:', err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  // --- Suppression vocal ---
  const removeAudio = (index) => {
    setAudioFiles(prev => prev.filter((_, i) => i !== index));
  };

  // --- Submit ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nom.trim() || formData.description.trim().length < 4) {
      alert('Le nom et la description doivent être remplis correctement (description ≥ 4 caractères)');
      return;
    }

    const submitData = {
      nom: formData.nom.trim(),
      description: formData.description.trim(),
      imageUrl: formData.imageUrl?.trim() || '',
      vocaux: audioFiles.map(a => a.blob) // envoyer les blobs
    };

    if (formData.delegue_id) submitData.delegue_id = Number(formData.delegue_id);

    onSubmit(submitData);
  };

  return (
    <div className={modalContainer}>
      <div className={modalContent}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{task ? 'Modifier la tâche' : 'Nouvelle tâche'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
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
              onChange={(e) => setFormData({ ...formData, delegue_id: e.target.value === '' ? null : Number(e.target.value) })}
              className={selectClass}
            >
              <option value="">Pas de délégation</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.prenom} {u.nom}</option>)}
            </select>
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
            {formData.imageUrl && <img src={formData.imageUrl} alt="Aperçu" className={imagePreview} onError={(e) => (e.target.style.display='none')} />}
          </div>

          {/* Vocaux */}
          <div>
            <label className={labelClass}>Vocaux</label>
            <div className="flex space-x-2 mb-2">
              {!isRecording ? (
                <button type="button" onClick={startRecording} className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1 rounded">
                  <Mic className="w-4 h-4"/> <span>Enregistrer</span>
                </button>
              ) : (
                <button type="button" onClick={stopRecording} className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded">
                  <StopCircle className="w-4 h-4"/> <span>Arrêter</span>
                </button>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              {audioFiles.map((a, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <audio controls src={a.url}></audio>
                  <button type="button" className="text-red-500" onClick={() => removeAudio(i)}>Supprimer</button>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-6">
            <button type="button" onClick={onClose} className={buttonSecondary}>Annuler</button>
            <button type="submit" className={buttonPrimary}>{task ? 'Modifier' : 'Créer'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TacheModal;
