import React, { useState } from 'react';
import { Edit2, Trash2, Check, Clock, UserPlus, Crown } from 'lucide-react';
import * as classes from '../styles/tailwindTacheCard';

const TachesCard = ({ task, users, onEdit, onDelete, onToggleStatus, onDelegate, currentUserId }) => {
  const [showDelegateInput, setShowDelegateInput] = useState(false);
  const [delegateUserId, setDelegateUserId] = useState('');

  const isCompleted = task.status === 'TERMINEE';
  const isCreator = task.user_id === currentUserId;
  const isDelegatedToMe = task.delegue_id === currentUserId;
  const canModify = (!task.delegue_id && isCreator) || (task.delegue_id && isDelegatedToMe);

  const createur = users?.find(u => u.id === task.user_id);
  const delegue = users?.find(u => u.id === task.delegue_id);

  const handleDelegate = () => {
    if (delegateUserId) {
      onDelegate(task.id, Number(delegateUserId));
      setShowDelegateInput(false);
      setDelegateUserId('');
    }
  };

  return (
    <div className={`${classes.card} ${isCompleted ? 'ring-2 ring-green-200' : isDelegatedToMe ? 'ring-2 ring-blue-200' : ''}`}>
      
      {task.imageUrl && (
        <div className={classes.imageWrapper}>
          <img
            src={task.imageUrl}
            alt={task.nom}
            className={classes.image}
            onError={(e) => (e.target.style.display = 'none')}
          />
          <div className={classes.imageOverlay} />
          <div className={classes.statusBadge}>
            <span className={isCompleted ? classes.statusDone : classes.statusPending}>
              {isCompleted ? '✓ Terminée' : '⏳ En cours'}
            </span>
          </div>

          <div className={classes.creatorBadgeWrapper}>
            {isCreator && <div className={classes.creatorBadge}><Crown className="w-3 h-3 mr-1" />Créateur</div>}
            {isDelegatedToMe && <div className={classes.delegateBadge}><UserPlus className="w-3 h-3 mr-1" />Délégué</div>}
          </div>
        </div>
      )}

      <div className={classes.content}>
        <div className={classes.titleWrapper}>
          <h3 className={`${classes.title} ${isCompleted ? 'text-green-700 line-through' : ''}`}>{task.nom}</h3>
          <p className={`${classes.description} ${isCompleted ? 'line-through opacity-75' : ''}`}>{task.description}</p>
        </div>

        <div className={classes.usersInfo}>
          {createur && (
            <div className={classes.userItem}>
              <div className={classes.userAvatar}>{createur.prenom?.[0]}{createur.nom?.[0]}</div>
              <span>Créé par <strong>{createur.prenom} {createur.nom}</strong></span>
            </div>
          )}
          {delegue && (
            <div className={classes.userItemDelegue}>
              <div className={classes.userAvatarDelegue}>{delegue.prenom?.[0]}{delegue.nom?.[0]}</div>
              <span>Délégué à <strong>{delegue.prenom} {delegue.nom}</strong>{isDelegatedToMe && <span className="ml-1 text-xs italic">(Vous)</span>}</span>
            </div>
          )}
        </div>

        {canModify && (
          <div className={classes.actionsWrapper}>
            <div className={classes.buttonGroup}>
              <button onClick={() => onToggleStatus(task)} className={isCompleted ? classes.btnRestart : classes.btnComplete}>
                {isCompleted ? <Clock className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                <span>{isCompleted ? 'Reprendre' : 'Terminer'}</span>
              </button>

              <button onClick={() => onEdit(task)} className={classes.btnEdit}><Edit2 className="w-4 h-4" />Modifier</button>
              <button onClick={() => onDelete(task.id)} className={classes.btnDelete}><Trash2 className="w-4 h-4" />Supprimer</button>
            </div>

            {isCreator && !task.delegue_id && (
              !showDelegateInput ? (
                <button onClick={() => setShowDelegateInput(true)} className={classes.btnDelegate}><UserPlus className="w-4 h-4" />Déléguer la tâche</button>
              ) : (
                <div className={classes.delegateInputWrapper}>
                  <input type="number" placeholder="ID utilisateur" value={delegateUserId} onChange={(e) => setDelegateUserId(e.target.value)} className={classes.delegateInput} />
                  <button onClick={handleDelegate} className={classes.delegateBtnConfirm}>Valider</button>
                  <button onClick={() => { setShowDelegateInput(false); setDelegateUserId(''); }} className={classes.delegateBtnCancel}>Annuler</button>
                </div>
              )
            )}
          </div>
        )}

        {!canModify && (
          <div className={classes.noPermission}>
            <p className="text-sm text-gray-500 italic">
              {task.delegue_id ? '🔒 Tâche déléguée - seul le délégué peut modifier' : "🔒 Vous n'êtes pas le propriétaire de cette tâche"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TachesCard;
