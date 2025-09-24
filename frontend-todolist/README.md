# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
Arrivée sur l’application – LandingPage

Page d’accueil (LandingPage) avec un bouton pour se connecter.

L’utilisateur peut cliquer pour aller sur la page de Login (LoginPage).

2️⃣ Création d’un utilisateur – RegisterPage

L’utilisateur clique sur “S’inscrire” depuis la page de login.

La RegisterPage s’affiche :

Formulaire avec login, prénom, nom, mot de passe, etc.

Après validation, le callback onRegister (dans App) est appelé.

handleLogin(userData) est exécuté :

Stocke l’utilisateur dans le state user.

Change la page affichée à TachesPage.

L’utilisateur est connecté automatiquement après son inscription.

3️⃣ Connexion d’un utilisateur existant – LoginPage

L’utilisateur remplit son login et mot de passe.

Après validation réussie :

handleLogin(userData) est exécuté depuis App.

L’utilisateur connecté est stocké dans user.

La page change vers TachesPage.

4️⃣ Accueil des tâches – TachesPage

Affichage des statistiques rapides : total, en cours, terminées.

Liste des tâches paginée (6 par page).

L’utilisateur peut :

Créer une tâche → ouvre TacheModal.

Remplir : nom, description, image, optionnellement déléguer à un autre utilisateur.

Submit → handleCreateTache :

Appelle createTaches (API), ajoute la tâche à la liste.

Met à jour la pagination.

Modifier une tâche → ouvre TacheModal pré-rempli.

Submit → handleUpdateTache : met à jour la tâche via l’API.

Supprimer une tâche → handleDeleteTache.

Changer le statut (En cours ↔ Terminée) → handleToggleStatus.

Déléguer une tâche (si créateur et tâche non déléguée) → handleDelegateTache.

TachesCard : affiche chaque tâche avec badges (créateur, délégué), image et boutons d’action.

5️⃣ Délégation de tâche

Lors de la création ou modification : possibilité de choisir un utilisateur dans la liste (select dans TacheModal).

L’utilisateur sélectionné devient délégué et peut modifier/supprimer cette tâche.

Sur la carte de la tâche : badges indiquent si la tâche est terminée, déléguée à moi, ou si je suis le créateur.

6️⃣ Déconnexion

Sur la page TachesPage, bouton Déconnexion :

handleLogout() est appelé depuis App.

user devient null.

La page revient sur LandingPage.

Le token est supprimé de localStorage pour la sécurité.

✅ Résumé du flux complet

LandingPage → l’utilisateur arrive et clique sur “Login” ou “Register”.

RegisterPage → crée un compte → handleLogin → page des tâches.

LoginPage → utilisateur existant se connecte → handleLogin → page des tâches.

TachesPage → utilisateur :

Crée une tâche → TacheModal → API → affichage dans la grille.

Modifie, supprime, change le statut ou délègue.

Les tâches sont paginées et filtrées par utilisateur si besoin.

Déconnexion → handleLogout → retour sur LandingPage + suppression du token.

# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

# Application de Gestion de Tâches (React)

Une application React permettant à un utilisateur de **s’inscrire, se connecter, créer et gérer ses tâches**, avec délégation possible à d’autres utilisateurs.

---

## Table des matières

1. [Technologies utilisées](#technologies-utilisées)  
2. [Structure du projet](#structure-du-projet)  
3. [Flux utilisateur](#flux-utilisateur)  
   - [LandingPage](#1-landingpage)  
   - [Inscription (RegisterPage)](#2-inscription-registerpage)  
   - [Connexion (LoginPage)](#3-connexion-loginpage)  
   - [Gestion des tâches (TachesPage)](#4-gestion-des-tâches-tachespag)  
   - [Délégation de tâche](#5-délégation-de-tâche)  
   - [Déconnexion](#6-déconnexion)  
4. [Fonctionnalités principales](#fonctionnalités-principales)  
5. [Installation et lancement](#installation-et-lancement)  

---

## Technologies utilisées

- **React** (Hooks : `useState`, `useEffect`)  
- **TailwindCSS** pour le style  
- **Lucide Icons** pour les icônes  
- Gestion d’état locale via `useState`  
- API fictive / locale pour la gestion des utilisateurs et tâches  

---

## Structure du projet

src/
├─ components/
│ ├─ LandingPage.jsx
│ ├─ LoginPage.jsx
│ ├─ RegisterPage.jsx
│ ├─ TachesPage.jsx
│ ├─ TacheModal.jsx
│ └─ TacheCard.jsx
├─ api/
│ └─ Taches.js # fonctions API : create, read, update, delete, délégation
├─ App.jsx
└─ main.jsx

---

## Flux utilisateur

### 1️⃣ LandingPage

- Page d’accueil visible par défaut (`page = 'home'`).  
- Bouton pour se **connecter** → redirige vers `LoginPage`.  
- Possibilité de naviguer vers l’inscription depuis le login.

---

### 2️⃣ Inscription (RegisterPage)

- Formulaire pour créer un utilisateur (login, prénom, nom, mot de passe).  
- Après validation :  
  - L’utilisateur est connecté automatiquement.  
  - Appel de `handleLogin(userData)` depuis `App.jsx` :  
    - Stocke les infos de l’utilisateur dans le state `user`.  
    - Change la page active vers `TachesPage`.

---

### 3️⃣ Connexion (LoginPage)

- Formulaire login/mot de passe.  
- Après validation réussie :  
  - `handleLogin(userData)` est exécuté.  
  - `user` est mis à jour dans le state.  
  - Redirection vers `TachesPage`.  

---

### 4️⃣ Gestion des tâches (TachesPage)

- Affiche **les statistiques** : total, en cours, terminées.  
- Affiche une **grille de tâches** paginée (6 tâches par page).  

#### Actions possibles sur chaque tâche (`TacheCard`)

1. **Créer une tâche**  
   - Ouvre **TacheModal**  
   - Remplir : nom, description, image (optionnelle), délégation (optionnelle)  
   - Validation → `createTaches(taskData)` → ajout à la liste  
2. **Modifier une tâche**  
   - Ouvre `TacheModal` pré-rempli avec les données existantes  
   - Validation → `updateTaches(taskId, taskData)` → mise à jour dans la liste  
3. **Supprimer une tâche**  
   - Confirmation → `deleteTaches(taskId)` → suppression  
4. **Changer le statut** (En cours ↔ Terminée)  
   - Appel `updateStatus(taskId, newStatus)` → mise à jour du badge  
5. **Déléguer une tâche** (si créateur et tâche non déléguée)  
   - Sélection d’un utilisateur via un `select` dans `TacheModal`  
   - Appel `delegateTaches(taskId, delegateUserId)` → tâche mise à jour  

- **Badges visuels** dans `TacheCard` :  
  - Créateur (crown)  
  - Délégué à moi (user plus)  
  - Statut (en cours / terminée)  

---

### 5️⃣ Délégation de tâche

- Lors de la **création ou modification** : possibilité de choisir un utilisateur dans la liste `users`.  
- La personne sélectionnée devient **déléguée** et peut modifier, supprimer ou changer le statut de la tâche.  
- Affichage visuel dans la tâche avec badge bleu.

---

### 6️⃣ Déconnexion

- Bouton **Déconnexion** dans `TachesPage`.  
- `handleLogout()` :  
  - Supprime `user` du state → page redirigée vers `LandingPage`.  
  - Supprime le `token` du `localStorage` pour sécuriser la session.

---

## Fonctionnalités principales

- Gestion complète des utilisateurs : inscription, connexion, affichage des infos.  
- Gestion complète des tâches : création, modification, suppression, changement de statut.  
- Délégation des tâches à d’autres utilisateurs.  
- Pagination des tâches.  
- Affichage clair des badges pour créateur et délégué.  
- Modal responsive pour créer/éditer les tâches.  
- Déconnexion sécurisée.

---

## Installation et lancement

1. Cloner le dépôt :  
   ```bash
   git clone <votre-repo>
   cd frontend-todolist


2. Installer les dépendances :
npm install


3. Lancer le projet :
npm run dev


4. L’application sera disponible sur :
http://localhost:5173

Cette application peut être connectée à un backend ou API pour gérer les utilisateurs et tâches de manière persistante.