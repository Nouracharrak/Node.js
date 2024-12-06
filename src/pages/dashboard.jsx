import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { auth } = useContext(AuthContext); // Accéder au contexte Auth
  const [users, setUsers] = useState([]); // Stocker les utilisateurs
  const [isLoading, setIsLoading] = useState(false); // Chargement des données
  const [newUser, setNewUser] = useState({
    prenom: "",
    avatar: "",
    email: "",
    password: "",
    role: "user", // Rôle par défaut
  }); // Formulaire pour ajouter un utilisateur
  const [editUser, setEditUser] = useState(null); // Utilisateur en cours de modification
  const [editForm, setEditForm] = useState({}); // Données du formulaire d’édition
  const [selectedUser, setSelectedUser] = useState(null);

  // Récupérer les utilisateurs depuis l'API
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/user/get", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (error) {
      alert(
        "Erreur lors de la récupération des utilisateurs : " + error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer les changements dans le formulaire d’ajout
  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  // Gérer les changements dans le formulaire d'édition
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Ajouter un utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Données envoyées : ", newUser);
    try {
      await axios.post("http://localhost:8000/api/user/signup", newUser, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      fetchUsers(); // Recharger les utilisateurs
      alert("Utilisateur ajouté avec succès !");
      setNewUser({
        prenom: "",
        avatar: "",
        email: "",
        password: "",
        role: "user",
      }); // Réinitialiser le formulaire
    } catch (error) {
      alert("Erreur lors de l'ajout de l'utilisateur : " + error.message);
    }
  };

  // Modifier un utilisateur
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/user/update/${editUser}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );
      setEditUser(null); // Fermer le formulaire d’édition
      fetchUsers();
      alert("Utilisateur modifié avec succès !");
    } catch (error) {
      alert(
        "Erreur lors de la mise à jour de l'utilisateur : " + error.message
      );
    }
  };

  // Supprimer un utilisateur
  const handleDelete = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      try {
        await axios.delete(`http://localhost:8000/api/user/delete/${id}`, {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        setUsers((prev) => prev.filter((user) => user._id !== id)); // Supprimer localement
        alert("Utilisateur supprimé avec succès !");
      } catch (error) {
        alert("Erreur lors de la suppression : " + error.message);
      }
    }
  };

  // Désactiver un utilisateur
  const handleDeactivate = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/user/desactivateAccount/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );
      fetchUsers();
      alert("Utilisateur désactivé avec succès !");
    } catch (error) {
      alert("Erreur lors de la désactivation : " + error.message);
    }
  };

  // Réactiver un utilisateur
  const handleActivate = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/user/activateAccount/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );
      fetchUsers();
      alert("Utilisateur réactivé avec succès !");
    } catch (error) {
      alert("Erreur lors de la réactivation : " + error.message);
    }
  };

  //Afficher les details
  const handleDetail = (user) => {
    setSelectedUser(user); // Stocke les détails de l'utilisateur sélectionné
  };

  // Ouvrir le formulaire d'édition
  const handleEdit = (user) => {
    setEditUser(user._id);
    setEditForm(user);
  };

  useEffect(() => {
    fetchUsers(); // Charger les utilisateurs au montage
  }, []);

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="dashboard">
      <h1>Bienvenue {auth?.prenom} !</h1>
      <p>Gérez les utilisateurs ici :</p>

      {/* Formulaire d'ajout */}
      <h3>Ajouter un utilisateur</h3>
      <form onSubmit={handleSubmit} className="add-user-form">
        <input
          type="text"
          name="prenom"
          value={newUser.prenom}
          onChange={handleNewUserChange}
          placeholder="Prénom"
          required
        />
        <input
          type="text"
          name="avatar"
          value={newUser.avatar}
          onChange={handleNewUserChange}
          placeholder="Avatar URL"
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleNewUserChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleNewUserChange}
          placeholder="Mot de passe"
          required
        />
        <label>
          Rôle :
          <select
            name="role"
            value={newUser.role}
            onChange={handleNewUserChange}
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </label>
        <button type="submit">Ajouter</button>
      </form>

      {/* Liste des utilisateurs */}
      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.prenom}</td>
              <td>{user.email}</td>
              <td>
                {user.role === "admin" ? "Administrateur" : "Utilisateur"}
              </td>
              <td>
                <button onClick={() => handleEdit(user)}>Modifier</button>
                <button onClick={() => handleDelete(user._id)}>
                  Supprimer
                </button>
                {user.status === "inactive" ? (
                  <button onClick={() => handleActivate(user._id)}>
                    Réactiver
                  </button>
                ) : (
                  <button onClick={() => handleDeactivate(user._id)}>
                    Désactiver
                  </button>
                )}
                <button onClick={() => handleDetail(user)}>Détail</button>{" "}
                {/* Nouveau bouton */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tableau details */}

      {selectedUser && (
        <div className="user-details">
          <h3>Détails de l'utilisateur</h3>
          <p>
            <strong>Prénom :</strong> {selectedUser.prenom}
          </p>
          <p>
            <strong>Email :</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Avatar :</strong>
          </p>
          <img
            src={selectedUser.avatar}
            alt={`${selectedUser.prenom}'s avatar`}
            width="150"
          />
          <p>
            <strong>Rôle :</strong> {selectedUser.role}
          </p>
          <p>
            <strong>Statut :</strong> {selectedUser.status}
          </p>
          <button onClick={() => setSelectedUser(null)}>Fermer</button>
        </div>
      )}

      {/* Formulaire d'édition */}
      {editUser && (
        <form onSubmit={handleUpdate} className="edit-user-form">
          <h3>Modifier l'utilisateur</h3>
          <input
            type="text"
            name="prenom"
            value={editForm.prenom || ""}
            onChange={handleEditChange}
            placeholder="Prénom"
          />
          <input
            type="email"
            name="email"
            value={editForm.email || ""}
            onChange={handleEditChange}
            placeholder="Email"
          />
          <input
          type="text"
          name="avatar"
          value={newUser.avatar}
          onChange={handleNewUserChange}
          placeholder="Avatar URL"
        />
          <input
            type="text"
            name="role"
            value={editForm.role || ""}
            onChange={handleEditChange}
            placeholder="Rôle"
          />
          <button type="submit">Enregistrer</button>
          <button type="button" onClick={() => setEditUser(null)}>
            Annuler
          </button>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
