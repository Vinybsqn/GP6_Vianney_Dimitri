import { Link } from 'react-router-dom';
import './../styles/home.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Bienvenue sur Echec & Match</h1>
            <p>Trouvez votre partenaire de jeu idéal et connectez-vous avec des joueurs du monde entier.</p>
            <div className="feature-section">
                <h2>Découvrez de nouveaux jeux</h2>
                <p>Explorez une large sélection de jeux et trouvez des joueurs ayant des intérêts similaires.</p>
            </div>
            <div className="community-section">
                <h2>Rejoignez notre communauté</h2>
                <p>Partagez vos expériences, vos astuces et faites partie d'une communauté passionnée de jeux.</p>
            </div>
        </div>
    );
};

export default HomePage;
