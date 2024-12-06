import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importation de Link
import '../styles/home.css'
import { useDispatch, useSelector } from "react-redux";

// importation des actions redux
import * as ACTION from '../redux/reducers/article.reducer'


const Home = () => {
  // utilisation du hook useDispatch pour gérer les actions de Redux
  const dispatch = useDispatch()
  const store = useSelector (state => state.article.data.articles)
  console.log(store)
  // hook UseEffect pour gerer les actions de Redux
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      // Dispatch de l'action de demarrage
      dispatch(ACTION.FETCH_ARTICLE_START())
      try {
        const response = await fetch('http://localhost:8000/api/article/getAllArticles');
        const data = await response.json();
        dispatch(ACTION.FETCH_ARTICLE_SUCCESS(data))
      } catch (error) {
        setError(error.message);
      }
    };
    fetchArticle();
  }, []);    

  if (error) return <p>{error}</p>;

  return (
    <>
  <h1 className="page-title">Élevez Votre Allure : Talons Hauts, Confort Assuré</h1>
  {store && Array.isArray(store) && store.length === 0 ? (
    <p className="no-articles">Aucun article trouvé</p>
  ) : (
    <div className="articles-container"> {/* Ajout de la div contenant tous les articles */}

      {store && Array.isArray(store) && store.map (item => (
        <div className="article" key={item._id}> {/* Article individuel */}
          {/* Nom de l'article */}
          <p className="article-name">{item.name}</p>

          {/* Envelopper l'image avec le composant Link */}
          <Link to={`/article/${item._id}`}>
            {item.picture && item.picture.img ? (
              <img
                src={item.picture.img}
                alt={item.name}
                className="article-image"
              />
            ) : (
              <p className="no-image">Image non disponible</p>
            )}
          </Link>

          {/* Prix de l'article */}
          <p className="article-price">{item.price} €</p>
        </div>
      ))}
    </div>
  )}
</>
  );
};

export default Home;

