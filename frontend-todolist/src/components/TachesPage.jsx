import React, { useEffect, useState } from "react";
import { 
  getTaches, 
  createTaches, 
  updateTaches,
  deleteTaches,
  updateStatus,
  delegateTaches,
  getAllUsers, 
  getCurrentUserId 
} from "../api/Taches";
import TachesCard from "./TacheCard";
import TacheModal from "./TacheModal";

const TachesPage = ({ user, onLogout }) => {
  const [taches, setTaches] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  const fetchTaches = async () => {
    try {
      const data = await getTaches();
      setTaches(data);
      console.log('Tâches récupérées:', data);
    } catch (err) {
      console.error('Erreur récupération tâches:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
      console.log('Utilisateurs récupérés:', data);
    } catch (err) {
      console.error('Erreur récupération utilisateurs:', err);
    }
  };

  useEffect(() => {
    const userId = getCurrentUserId();
    setCurrentUserId(userId);
    console.log('Current User ID récupéré:', userId);

    fetchTaches();
    fetchUsers();
  }, []);

  // Fonction pour créer une tâche
  const handleCreateTache = async (taskData) => {
    try {
      console.log('Création tâche avec données:', taskData);
      const newTask = await createTaches(taskData);
      console.log('Nouvelle tâche créée:', newTask);
      setTaches([...taches, newTask]);
      setShowModal(false);
    } catch (err) {
      console.error("Erreur création tâche:", err);
      alert(`Erreur lors de la création: ${err.message}`);
    }
  };

  // Fonction pour modifier une tâche
  const handleEditTache = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  // Fonction pour sauvegarder les modifications
  const handleUpdateTache = async (taskData) => {
    try {
      console.log('Modification tâche ID:', editingTask.id, 'avec données:', taskData);
      const updatedTask = await updateTaches(editingTask.id, taskData);
      console.log('Tâche modifiée:', updatedTask);
      
      // Mettre à jour la liste des tâches
      setTaches(taches.map(t => t.id === editingTask.id ? updatedTask : t));
      setShowModal(false);
      setEditingTask(null);
    } catch (err) {
      console.error("Erreur modification tâche:", err);
      alert(`Erreur lors de la modification: ${err.message}`);
    }
  };

  // Fonction pour supprimer une tâche
  const handleDeleteTache = async (taskId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      try {
        console.log('Suppression tâche ID:', taskId);
        await deleteTaches(taskId);
        console.log('Tâche supprimée avec succès');
        
        // Retirer la tâche de la liste
        setTaches(taches.filter(t => t.id !== taskId));
      } catch (err) {
        console.error("Erreur suppression tâche:", err);
        alert(`Erreur lors de la suppression: ${err.message}`);
      }
    }
  };

  // Fonction pour changer le statut d'une tâche
  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'TERMINEE' ? 'EN_COURS' : 'TERMINEE';
      console.log('Changement statut tâche ID:', task.id, 'vers:', newStatus);
      
      const updatedTask = await updateStatus(task.id, newStatus);
      console.log('Statut modifié:', updatedTask);
      
      // Mettre à jour la liste des tâches
      setTaches(taches.map(t => t.id === task.id ? { ...t, status: newStatus } : t));
    } catch (err) {
      console.error("Erreur changement statut:", err);
      alert(`Erreur lors du changement de statut: ${err.message}`);
    }
  };

  // Fonction pour déléguer une tâche
  const handleDelegateTache = async (taskId, delegateUserId) => {
    try {
      console.log('Délégation tâche ID:', taskId, 'à utilisateur:', delegateUserId);
      const updatedTask = await delegateTaches(taskId, delegateUserId);
      console.log('Tâche déléguée:', updatedTask);
      
      // Rafraîchir la liste des tâches
      await fetchTaches();
    } catch (err) {
      console.error("Erreur délégation tâche:", err);
      alert(`Erreur lors de la délégation: ${err.message}`);
    }
  };

  // Fonction pour fermer le modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes tâches</h1>
        <button onClick={onLogout} className="text-red-600 underline">
          Déconnexion
        </button>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="mb-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
      >
        Ajouter une tâche
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {taches.map((tache) => (
          <TachesCard
            key={tache.id}
            task={tache}
            currentUserId={currentUserId}
            onEdit={() => handleEditTache(tache)}
            onDelete={() => handleDeleteTache(tache.id)}
            onToggleStatus={() => handleToggleStatus(tache)}
            onDelegate={(taskId, delegateId) => handleDelegateTache(taskId, delegateId)}
          />
        ))}
      </div>

      {taches.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          Aucune tâche trouvée. Créez votre première tâche !
        </div>
      )}

      {showModal && (
        <TacheModal
          task={editingTask} // Passer la tâche à modifier ou null pour création
          onClose={handleCloseModal}
          onSubmit={editingTask ? handleUpdateTache : handleCreateTache}
          users={users}
        />
      )}
    </div>
  );
};

export default TachesPage;