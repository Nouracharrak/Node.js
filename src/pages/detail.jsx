
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/detail.css'

const Detail = () => {
  const [article, setArticle] = useState(null); // Valeur initiale null
  const [error, setError] = useState(null);
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const navigate = useNavigate(); // Hook pour rediriger après la suppression
  console.log("ID de l'article:", id);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/article/getArticle/${id}`);
        
        // Vérifier si la réponse est valide
        if (!response.ok) {
          throw new Error("Article non trouvé");
        }
        
        const data = await response.json();
        console.log("Données de l'article dans l'API:", data);
        
        setArticle(data); // Mettre à jour l'état avec les données de l'article
      } catch (error) {
        console.error("Erreur lors de la récupération de l'article : ", error);
        setError(error.message); // Gérer les erreurs
      }
    };

    fetchArticle(); // Appeler la fonction pour récupérer les données de l'article
  }, [id]); // Déclenche la récupération des données dès que l'ID change

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/article/deleteArticle/${id}`, {
        method: "DELETE", // Requête DELETE pour supprimer l'article
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'article");
      }

      alert("Article supprimé avec succès!");
      navigate.push("/"); // Rediriger vers la page d'accueil après suppression
    } catch (error) {
      alert("Erreur lors de la suppression de l'article : " + error.message);
    }
  };

  if (error) {
    return <p>Erreur: {error}</p>;
  }

  if (!article) {
    console.log("Article est en attente de chargement...");
    return <p>Chargement...</p>;
  }

  console.log("Article dans le rendu : ", article); // Vérifiez que l'objet est bien présent
  return (
    <div className="article-detail">
  <h1 className="article-detail-title">Détails de l'article</h1>
  <h2 className="article-name">{article.articles.name}</h2>

  {/* Vérification si l'image existe */}
  {article.articles.picture && article.articles.picture.img ? (
    <img
      src={article.articles.picture.img}
      alt={article.articles.name}
      className="article-detail-image"
    />
  ) : (
    <p className="no-image">Image non disponible</p>
  )}

  <p className="article-price">Prix: {article.articles.price}€</p>
  <p className="article-stock">Stock: {article.articles.stock}</p>
  {/* Bouton de suppression avec utilisation de handleDelete */}
      <button
        onClick={handleDelete} // Appel de la fonction handleDelete lors du clic
        className="delete-button"
      >
        Supprimer l'article
      </button>
  {/* Bouton pour rediriger vers la page de mise à jour */}
      <button className="update-button " onClick={() => navigate(`/updateArticle/${id}`)} style={{ marginTop: "20px" }}>
        Modifier cet article
      </button>
</div>

  );
};

export default Detail;
