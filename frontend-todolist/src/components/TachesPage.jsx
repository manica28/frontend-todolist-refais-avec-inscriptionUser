import React, { useEffect, useState } from "react";
import { getTaches, createTaches, updateTaches, deleteTaches,updateStatus,delegateTaches,getAllUsers, getCurrentUserId,getCurrentUser, getUserInfo } from "../api/Taches";
import TachesCard from "./TacheCard";
import TacheModal from "./TacheModal";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { usePagination } from "../hooks/usePagination";

const TachesPage = ({ user, onLogout }) => {
  const [taches, setTaches] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);

  const tasksPerPage = 6;

  const fetchTaches = async () => {
    try {
      const data = await getTaches();
      setTaches(data);
    } catch (err) {
      console.error('Erreur récupération tâches:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error('Erreur récupération utilisateurs:', err);
    }
  };

  useEffect(() => {
    const userId = getCurrentUserId();
    const userInfoFromToken = getCurrentUser();

    setCurrentUserId(userId);
    setCurrentUserInfo(userInfoFromToken);

    if (userId) {
      getUserInfo(userId).then((fullInfo) => setCurrentUserInfo(fullInfo))
      .catch((err) => console.error("Erreur récupération infos utilisateur:", err));
    }

    fetchTaches();
    fetchUsers();
  }, []);

  // Hook pagination
  const {currentPage,totalPages,indexOfFirstItem,indexOfLastItem,goToPage,nextPage,prevPage
} = usePagination(taches.length, tasksPerPage);

  const currentTasks = taches.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination boutons
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // Actions tâches
  const handleCreateTache = async (taskData) => {
    try {
      const newTask = await createTaches(taskData);
      setTaches([...taches, newTask]);
      setShowModal(false);

      const newTotalPages = Math.ceil((taches.length + 1) / tasksPerPage);
      if (newTotalPages > totalPages) goToPage(newTotalPages);
    } catch (err) {
      alert(`Erreur lors de la création: ${err.message}`);
    }
  };

  const handleEditTache = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleUpdateTache = async (taskData) => {
    try {
      const updatedTask = await updateTaches(editingTask.id, taskData);
      setTaches(taches.map(t => t.id === editingTask.id ? updatedTask : t));
      setShowModal(false);
      setEditingTask(null);
    } catch (err) {
      alert(`Erreur lors de la modification: ${err.message}`);
    }
  };

  const handleDeleteTache = async (taskId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) return;
    try {
      await deleteTaches(taskId);
      const newTaches = taches.filter(t => t.id !== taskId);
      setTaches(newTaches);

      const newTotalPages = Math.ceil(newTaches.length / tasksPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) goToPage(newTotalPages);
    } catch (err) {
      alert(`Erreur lors de la suppression: ${err.message}`);
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'TERMINEE' ? 'EN_COURS' : 'TERMINEE';
      const updatedTask = await updateStatus(task.id, newStatus);
      setTaches(taches.map(t => t.id === task.id ? { ...t, status: newStatus } : t));
    } catch (err) {
      alert(`Erreur lors du changement de statut: ${err.message}`);
    }
  };

  const handleDelegateTache = async (taskId, delegateUserId) => {
    try {
      await delegateTaches(taskId, delegateUserId);
      await fetchTaches();
    } catch (err) {
      alert(`Erreur lors de la délégation: ${err.message}`);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {currentUserInfo?.prenom?.[0] || currentUserInfo?.nom?.[0] || <User className="w-6 h-6" />}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Bienvenue {currentUserInfo?.prenom || currentUserInfo?.login || 'Utilisateur'} !
              </h1>
              <p className="text-gray-600">
                {currentUserInfo?.nom && currentUserInfo?.prenom 
                  ? `${currentUserInfo.prenom} ${currentUserInfo.nom}` 
                  : currentUserInfo?.login || `ID : ${currentUserId}`}
              </p>
            </div>
          </div>
          <button 
            onClick={onLogout} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors" >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Total des tâches</h3>
          <p className="text-3xl font-bold text-blue-600">{taches.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">En cours</h3>
          <p className="text-3xl font-bold text-orange-600">
            {taches.filter(t => t.status !== 'TERMINEE').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Terminées</h3>
          <p className="text-3xl font-bold text-green-600">
            {taches.filter(t => t.status === 'TERMINEE').length}
          </p>
        </div>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
      >
        + Ajouter une tâche
      </button>

      {/* Grille */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentTasks.map((tache) => (
          <TachesCard
            key={tache.id}
            task={tache}
            currentUserId={currentUserId}
            users={users}
            onEdit={() => handleEditTache(tache)}
            onDelete={() => handleDeleteTache(tache.id)}
            onToggleStatus={() => handleToggleStatus(tache)}
            onDelegate={(taskId, delegateId) => handleDelegateTache(taskId, delegateId)}
          />
        ))}
      </div>

      {taches.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Aucune tâche trouvée</h3>
          <p>Créez votre première tâche pour commencer !</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button onClick={prevPage} disabled={currentPage === 1} className={`p-2 rounded-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'}`}>
            <ChevronLeft className="w-5 h-5" />
          </button>

          {getPageNumbers().map(number => (
            <button
              key={number}
              onClick={() => goToPage(number)}
              className={`px-4 py-2 rounded-lg font-medium ${currentPage === number ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'}`}
            >
              {number}
            </button>
          ))}

          <button onClick={nextPage} disabled={currentPage === totalPages} className={`p-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'}`}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="text-center text-gray-500 mt-4">
          Page {currentPage} sur {totalPages} • 
          Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, taches.length)} sur {taches.length} tâches
        </div>
      )}

      {showModal && (
        <TacheModal
          task={editingTask}
          onClose={handleCloseModal}
          onSubmit={editingTask ? handleUpdateTache : handleCreateTache}
          users={users}
        />
      )}
    </div>
  );
};

export default TachesPage;
