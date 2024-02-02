import { Link } from 'react-router-dom';
import '../styles/_errorPage.scss'

const HomePage = () => {
  return (
    <div className="error-page">
      <h1>Erreur 404</h1>
      <h2>Page non trouvé !</h2>
      <p>Pas de bol ! Mauvais lien tu t'es totalement perdu !!</p>
      <Link to="/">Revenir à la page d'accueil</Link>
    </div>
  );
};

export default HomePage;