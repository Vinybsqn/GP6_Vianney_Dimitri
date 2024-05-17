import React from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import logo from './../assets/LOGO.png';
import logo_lol from './../assets/logo_lol.jpeg';
import logo_fortnite from './../assets/logo_fortnite.avif';
import logo_minecraft from './../assets/logo_minecraft.avif';
import logo_rocket_league from './../assets/logo_rocket_league.jpg';
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const HomePage = () => {
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Nouveaux Membres',
                data: [30, 45, 60, 40, 80, 75, 90, 100, 110, 95, 120, 130],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fontColor: 'white',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: 'white',  // Make the chart legend text white
                },
            },
            title: {
                display: true,
                text: 'Croissance des Membres sur l\'Année',
                color: 'white',  // Make the chart title text white
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'white',  // Make the x-axis labels white
                },
            },
            y: {
                ticks: {
                    color: 'white',  // Make the y-axis labels white
                },
            },
        },
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-800 via-purple-800 to-gray-900 text-white p-6">
            <main className="flex flex-col items-center gap-12 flex-grow">

            <img src={logo} alt="Logo" className="mb-6 w-72 h-auto"/>

                <h1 className="text-6xl font-bold">Bienvenue sur Échec & Match</h1>
                <p className="text-lg text-center">Trouvez des partenaires de jeu, participez à des événements et améliorez vos compétences.</p>
            
                <section className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-4xl">
                    <h2 className="text-4xl font-bold mb-4 text-white">Découvrez les jeux du moment</h2>
                    <p className="text-lg mb-6 text-white">Explorez une large sélection de jeux et trouvez des joueurs ayant des intérêts similaires.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white/20 p-4 rounded-xl shadow-lg backdrop-blur-md border border-white/10">
                            <img src={logo_lol} alt="Jeu 1" className="w-full h-32 object-cover rounded-lg mb-4" />
                        </div>
                        <div className="bg-white/20 p-4 rounded-xl shadow-lg backdrop-blur-md border border-white/10">
                            <img src={logo_fortnite} alt="Jeu 2" className="w-full h-32 object-cover rounded-lg mb-4" />
                        </div>
                        <div className="bg-white/20 p-4 rounded-xl shadow-lg backdrop-blur-md border border-white/10">
                            <img src={logo_minecraft} alt="Jeu 3" className="w-full h-32 object-cover rounded-lg mb-4" />
                        </div>
                        <div className="bg-white/20 p-4 rounded-xl shadow-lg backdrop-blur-md border border-white/10">
                            <img src={logo_rocket_league} alt="Jeu 4" className="w-full h-32 object-cover rounded-lg mb-4" />
                        </div>
                    </div>
                </section>

                <section className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-4xl">
                    <h2 className="text-4xl font-bold mb-4">Rejoignez notre communauté</h2>
                    <p className="text-lg mb-6">Partagez vos expériences, vos astuces et faites partie d'une communauté passionnée de jeux.</p>
                    <Line className=""data={chartData} options={chartOptions} />
                </section>

                <section className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-4xl">
                    <h2 className="text-4xl font-bold mb-4">Participez à des événements</h2>
                    <p className="text-lg mb-6">Inscrivez-vous à des tournois et à des événements exclusifs organisés par la communauté.</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Tournoi de Printemps - 25 Avril</li>
                        <li>Festival des Jeux - 12 Juin</li>
                        <li>Championnat d'Été - 30 Août</li>
                    </ul>
                </section>

                <section className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-4xl">
                    <h2 className="text-4xl font-bold mb-4">Apprenez avec nos tutoriels</h2>
                    <p className="text-lg mb-6">Accédez à des tutoriels et des guides pour améliorer vos compétences et découvrir de nouvelles stratégies.</p>
                    <div className="flex flex-wrap gap-4">
                        <div className="w-full sm:w-1/2 bg-white/20 p-4 rounded-xl shadow-lg backdrop-blur-md border border-white/10">
                            <h3 className="text-2xl font-semibold mb-2">Tutoriel 1</h3>
                            <p>Guide complet pour les débutants. Apprenez les bases et commencez à jouer dès aujourd'hui.</p>
                        </div>
                        <div className="w-full sm:w-1/2 bg-white/20 p-4 rounded-xl shadow-lg backdrop-blur-md border border-white/10">
                            <h3 className="text-2xl font-semibold mb-2">Tutoriel 2</h3>
                            <p>Stratégies avancées pour les joueurs expérimentés. Améliorez vos compétences et dominez le jeu.</p>
                        </div>
                    </div>
                </section>

                <section className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-4xl">
                    <h2 className="text-4xl font-bold mb-4">Témoignages</h2>
                    <p className="text-lg mb-6">Lisez les témoignages de nos membres et découvrez comment Échec & Match a changé leur façon de jouer.</p>
                    <div className="flex flex-col gap-4">
                        <div className="bg-white/20 p-4 rounded-xl shadow-lg backdrop-blur-md border border-white/10">
                            <p className="text-xl italic">"Grâce à Échec & Match, j'ai trouvé des partenaires de jeu formidables et j'ai amélioré mes compétences."</p>
                            <p className="text-right mt-2">- Alex</p>
                        </div>
                        <div className="bg-white/20 p-4 rounded-xl shadow-lg backdrop-blur-md border border-white/10">
                            <p className="text-xl italic">"Une communauté incroyable et des événements bien organisés. Je recommande vivement !"</p>
                            <p className="text-right mt-2">- Marie</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
