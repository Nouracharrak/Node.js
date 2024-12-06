import React, { useState } from "react";
import axios from "axios";
import '../styles/add.css'

const AddArticle = () => {
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    category: "",
    brand: "",
    price: 0,
    avis: [],
    picture: { 
      img: "",   
      img1: "",  
      img2: "",  
      img3: "", 
      img4: "",  
    },
    status: true,
    stock: 0,
  });

  const [message, setMessage] = useState("");

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    // Si le champ appartient à picture, mettez à jour l'objet picture
    if (name.startsWith("picture.")) {
      // Extraction de la clé à mettre à jour dans l'objet picture
      const pictureField = name.split('.')[1];  // Ex: "img" ou "img1" etc.

      setFormData({
        ...formData,
        picture: {
          ...formData.picture,
          [pictureField]: value,  // Met à jour la clé correspondante dans picture
        },
      });
    } else {
      // Mise à jour des autres champs normalement
      setFormData({ ...formData, [name]: value });
    }
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assurez-vous que l'image principale (img) est bien remplie
    if (!formData.picture.img) {
      setMessage("L'image principale est obligatoire.");
      return;
    }

    try {
      // Envoi des données au backend
      await axios.post("http://localhost:8000/api/article/addArticle", formData);
      setMessage("Article ajouté avec succès !");

      // Réinitialisation du formulaire après ajout
      setFormData({
        name: "",
        content: "",
        category: "",
        brand: "",
        price: 0,
        avis: [],
        picture: {  // Réinitialisation des images sous picture
          img: "",
          img1: "",
          img2: "",
          img3: "",
          img4: "",
        },
        status: true,
        stock: 0,
      });
    } catch (error) {
      console.error("Erreur :", error.response?.data || error.message);
      setMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="add-article-page">
      <h1>Ajouter un Article</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom de l'article :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Description de l'article :</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="category">Catégorie :</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="brand">Marque :</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Prix :</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="picture.img">Image principale (URL) :</label>
          <input
            type="url"
            id="img"
            name="picture.img"  // Remarque : ici, on a picture.img au lieu de juste img
            value={formData.picture.img}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="picture.img1">Image 1 (URL) :</label>
          <input
            type="url"
            id="img1"
            name="picture.img1"
            value={formData.picture.img1}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="picture.img2">Image 2 (URL) :</label>
          <input
            type="url"
            id="img2"
            name="picture.img2"
            value={formData.picture.img2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="picture.img3">Image 3 (URL) :</label>
          <input
            type="url"
            id="img3"
            name="picture.img3"
            value={formData.picture.img3}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="picture.img4">Image 4 (URL) :</label>
          <input
            type="url"
            id="img4"
            name="picture.img4"
            value={formData.picture.img4}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="status">Statut :</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value={true}>Actif</option>
            <option value={false}>Inactif</option>
          </select>
        </div>
        <div>
          <label htmlFor="stock">Stock :</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Ajouter l'article</button>
      </form>
    </div>
  );
};

export default AddArticle;
