
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const [article, setArticle] = useState(null); // Valeur initiale null
  const [error, setError] = useState(null);
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
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

  if (error) {
    return <p>Erreur: {error}</p>;
  }

  if (!article) {
    console.log("Article est en attente de chargement...");
    return <p>Chargement...</p>;
  }

  console.log("Article dans le rendu : ", article); // Vérifiez que l'objet est bien présent
  return (
    <div>
    <h1>Détails de l'article</h1>
    <h2>{article.articles.name}</h2>
    {article.articles.picture && article.articles.picture.img ? (
      <img src={article.articles.picture.img} alt={article.articles.name} width={200} />
    ) : (
      <p>Image non disponible</p>
    )}
    <p>Prix: {article.articles.price}€</p>
    <p>Stock: {article.articles.stock}</p>
    </div>
  );
};

export default Detail;
