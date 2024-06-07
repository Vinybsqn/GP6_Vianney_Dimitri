import { Link } from 'react-router-dom';
import './../styles/errorPage.css'

const ErrorPage = () => {
  return (
    <div className="error-page bg-gradient-to-r from-blue-500 via-purple-500 to-gray-500">
      <h1>Erreur 404</h1>
      <h2>Page non trouvé !</h2>
      <p>Pas de bol ! Mauvais lien tu t'es totalement perdu !!</p>
      <Link to="/">Revenir à la page d'accueil</Link>
    </div>
  );
};

export default ErrorPage;