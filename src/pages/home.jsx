import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importation de Link

const Home = () => {
  const [articles, setArticle] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/article/getAllArticles');
        const data = await response.json();
        console.log('Données récupérées:', data); // Vérifiez la structure ici
        setArticle(data.articles); // Accédez à la clé 'articles'
      } catch (error) {
        setError(error.message);
      }
    };
    fetchArticle();
  }, []);    

  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Bienvenue sur ma page d'accueil</h1>
      {articles.length === 0 ? (
        <p>Aucun article trouvé</p>
      ) : (
        articles.map((item) => (
          <div key={item._id}>
            <p>{item.name}</p>
            {/* Envelopper l'image avec le composant Link pour rediriger vers la page de détail */}
            <Link to={`/article/${item._id}`}>
              {item.picture && item.picture.img ? (
                <img src={item.picture.img} width={200} alt={item.name} />
              ) : (
                <p>Image non disponible</p>
              )}
            </Link>
            <p>{item.price} €</p>
          </div>
        ))
      )}
    </>
  );
};

export default Home;

