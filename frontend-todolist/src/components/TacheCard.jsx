import React, { useState } from 'react';
import { Edit2, Trash2, Check, Clock, User, UserPlus, Crown, MoreVertical } from 'lucide-react';

const TachesCard = ({ task, onEdit, onDelete, onToggleStatus, onDelegate, currentUserId }) => {
  const [showDelegateInput, setShowDelegateInput] = useState(false);
  const [delegateUserId, setDelegateUserId] = useState('');
  const [showActions, setShowActions] = useState(false);

  const isCompleted = task.status === 'TERMINEE';
  const isCreator = task.user_id === currentUserId;
  const isDelegatedToMe = task.delegue_id === currentUserId;
  const canModify = (!task.delegue_id && isCreator) || (task.delegue_id && isDelegatedToMe);

  const handleDelegate = () => {
    if (delegateUserId) {
      onDelegate(task.id, Number(delegateUserId));
      setShowDelegateInput(false);
      setDelegateUserId('');
    }
  };

  return (
    <div className={`group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
      isCompleted ? 'ring-2 ring-green-200' : isDelegatedToMe ? 'ring-2 ring-blue-200' : ''
    }`}>
      
      {/* Image avec overlay gradient */}
      {task.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={task.imageUrl}
            alt={task.nom}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => (e.target.style.display = 'none')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Status badge sur l'image */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
              isCompleted 
                ? 'bg-green-500/90 text-white' 
                : 'bg-orange-500/90 text-white'
            }`}>
              {isCompleted ? '✓ Terminée' : '⏳ En cours'}
            </span>
          </div>

          {/* Badges créateur/délégué sur l'image */}
          <div className="absolute top-4 left-4 flex space-x-2">
            {isCreator && (
              <div className="flex items-center bg-yellow-500/90 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                <Crown className="w-3 h-3 mr-1" />
                Créateur
              </div>
            )}
            {isDelegatedToMe && (
              <div className="flex items-center bg-blue-500/90 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                <UserPlus className="w-3 h-3 mr-1" />
                Délégué
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="p-6">
        {/* Header sans image */}
        {!task.imageUrl && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {isCreator && (
                <div className="flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                  <Crown className="w-3 h-3 mr-1" />
                  Créateur
                </div>
              )}
              {isDelegatedToMe && (
                <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                  <UserPlus className="w-3 h-3 mr-1" />
                  Délégué
                </div>
              )}
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isCompleted 
                ? 'bg-green-100 text-green-700' 
                : 'bg-orange-100 text-orange-700'
            }`}>
              {isCompleted ? '✓ Terminée' : '⏳ En cours'}
            </span>
          </div>
        )}

        {/* Titre et description */}
        <div className="mb-4">
          <h3 className={`font-bold text-xl mb-2 transition-colors ${
            isCompleted 
              ? 'text-green-700 line-through' 
              : 'text-gray-800 group-hover:text-gray-900'
          }`}>
            {task.nom}
          </h3>
          <p className={`text-gray-600 leading-relaxed ${
            isCompleted ? 'line-through opacity-75' : ''
          }`}>
            {task.description}
          </p>
        </div>

        {/* Informations utilisateurs avec avatars simulés */}
        <div className="space-y-3 mb-6">
          {task.user && (
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-3">
                {task.user.prenom?.[0]}{task.user.nom?.[0]}
              </div>
              <span>Créé par <strong>{task.user.prenom} {task.user.nom}</strong></span>
            </div>
          )}
          {task.delegue && (
            <div className="flex items-center text-sm text-blue-600">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-semibold text-xs mr-3">
                {task.delegue.prenom?.[0]}{task.delegue.nom?.[0]}
              </div>
              <span>Délégué à <strong>{task.delegue.prenom} {task.delegue.nom}</strong>
                {isDelegatedToMe && <span className="ml-1 text-xs italic">(Vous)</span>}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        {canModify && (
          <div className="space-y-3">
            {/* Actions principales */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onToggleStatus(task)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                }`}
              >
                {isCompleted ? <Clock className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                <span>{isCompleted ? 'Reprendre' : 'Terminer'}</span>
              </button>

              <button
                onClick={() => onEdit(task)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
              >
                <Edit2 className="w-4 h-4" />
                Modifier
              </button>

              <button
                onClick={() => onDelete(task.id)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
            </div>

            {/* Action de délégation */}
            {isCreator && !task.delegue_id && (
              <div>
                {!showDelegateInput ? (
                  <button
                    onClick={() => setShowDelegateInput(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
                  >
                    <UserPlus className="w-4 h-4" />
                    Déléguer la tâche
                  </button>
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                    <input
                      type="number"
                      placeholder="ID utilisateur"
                      value={delegateUserId}
                      onChange={(e) => setDelegateUserId(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleDelegate}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                    >
                      Valider
                    </button>
                    <button
                      onClick={() => {
                        setShowDelegateInput(false);
                        setDelegateUserId('');
                      }}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Message si pas de permissions */}
        {!canModify && (
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500 italic">
              {task.delegue_id 
                ? "🔒 Tâche déléguée - seul le délégué peut modifier"
                : "🔒 Vous n'êtes pas le propriétaire de cette tâche"
              }
            </p>
          </div>
        )}
      </div>

      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none transform -translate-x-full group-hover:translate-x-full" />
    </div>
  );
};

export default TachesCard;