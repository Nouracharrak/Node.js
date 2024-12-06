import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/update.css'
const UpdateArticle = () => {
  const { id } = useParams(); // Récupérer l'ID de l'article depuis l'URL
  const navigate = useNavigate(); // Pour rediriger après modification
  const [article, setArticle] = useState(null); // Stocke les données de l'article
  const [error, setError] = useState(null); // Stocke les erreurs éventuelles
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    category: "",
    brand: "",
    price: "",
    picture: {
      img: "",
      img1: "",
      img2: "",
      img3: "",
      img4: "",
    },
    stock: "",
  });

  // Charger les données de l'article
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/article/getArticle/${id}`);
        if (!response.ok) {
          throw new Error("Article non trouvé");
        }
        const data = await response.json();
        setArticle(data.articles);
        setFormData({
          name: data.articles.name || "",
          content: data.articles.content || "",
          category: data.articles.category || "",
          brand: data.articles.brand || "",
          price: data.articles.price || "",
          picture: {
            img: data.articles.picture?.img || "",
            img1: data.articles.picture?.img1 || "",
            img2: data.articles.picture?.img2 || "",
            img3: data.articles.picture?.img3 || "",
            img4: data.articles.picture?.img4 || "",
          },
          stock: data.articles.stock || "",
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchArticle();
  }, [id]);

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("picture")) {
      setFormData({
        ...formData,
        picture: {
          ...formData.picture,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Soumettre les modifications
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/article/updateArticle/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'article");
      }

      alert("Article mis à jour avec succès !");
      navigate('/'); // Rediriger vers la page des détails
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  };

  if (error) return <p>Erreur : {error}</p>;
  if (!article) return <p>Chargement...</p>;

  return (
    <div className="update-container">
      <h1>Modifier l'article</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Contenu</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Catégorie</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Marque</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Prix</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Image principale (URL)</label>
          <input
            type="text"
            name="img"
            value={formData.picture.img}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Image 1 (URL)</label>
          <input
            type="text"
            name="img1"
            value={formData.picture.img1}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Image 2 (URL)</label>
          <input
            type="text"
            name="img2"
            value={formData.picture.img2}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Image 3 (URL)</label>
          <input
            type="text"
            name="img3"
            value={formData.picture.img3}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Image 4 (URL)</label>
          <input
            type="text"
            name="img4"
            value={formData.picture.img4}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  );
};

export default UpdateArticle;

