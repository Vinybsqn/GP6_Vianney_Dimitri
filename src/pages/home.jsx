import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        // Utilisez flex et flex-col pour structurer la page dans une direction de colonne
        // min-h-screen assure que le conteneur remplit au moins la hauteur de l'écran
        <div className="flex flex-col min-h-screen justify-between bg-gradient-to-b from-bleu to-violet p-5 text-blanc">
            <header className="text-4xl font-bold mb-4 text-center">
                <h1>Bienvenue sur Echec & Match</h1>
            </header>
            <main className="flex flex-col items-center gap-5 flex-grow">
                <p className="text-center max-w-2xl mb-6">Trouvez votre partenaire de jeu idéal et connectez-vous avec des joueurs du monde entier.</p>
                <div className="feature-section bg-blanc/30 p-5 rounded-lg shadow-md backdrop-blur-lg border border-blanc/10">
                    <h2 className="text-3xl font-bold mb-2">Découvrez de nouveaux jeux</h2>
                    <p>Explorez une large sélection de jeux et trouvez des joueurs ayant des intérêts similaires.</p>
                </div>
                <div className="community-section bg-blanc/30 p-5 rounded-lg shadow-md backdrop-blur-lg border border-blanc/10">
                    <h2 className="text-3xl font-bold mb-2">Rejoignez notre communauté</h2>
                    <p>Partagez vos expériences, vos astuces et faites partie d'une communauté passionnée de jeux.</p>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
