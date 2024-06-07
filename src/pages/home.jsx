import React from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import Slider from "react-slick";
import logo from './../assets/LOGO.png';
import logo_lol from './../assets/logo_lol.jpeg';
import logo_fortnite from './../assets/logo_fortnite.avif';
import logo_minecraft from './../assets/logo_minecraft.avif';
import logo_rocket_league from './../assets/logo_rocket_league.jpg';
import joueur_lol from './../assets/ambassadeurs/joueur_lol.webp';
import joueur_minecraft from './../assets/ambassadeurs/joueur_minecraft.webp';
import joueuse_rocket_league from './../assets/ambassadeurs/joueur_rocket.webp';


ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const HomePage = () => {
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
            {
                label: 'Nouveaux Membres',
                data: [30, 45, 60, 40, 80, 75, 90, 100],
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

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        swipe: true,
        touchMove: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-gray-500 text-white p-6">
            <main className="flex flex-col items-center gap-12 flex-grow">

                <img src={logo} alt="Logo" className="mb-6 w-72 h-auto"/>

                <h1 className="text-6xl font-bold">Bienvenue sur Échec&Match</h1>
                <p className="text-lg text-center">Trouvez des partenaires de jeu, participez à des événements et
                    améliorez vos compétences.</p>

                <section
                    className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-4xl">
                    <h2 className="text-4xl font-bold mb-4 text-white">Découvrez les jeux du moment</h2>
                    <p className="text-lg mb-6 text-white">Explorez une large sélection de jeux et trouvez des joueurs
                        ayant des intérêts similaires.</p>
                    <Slider {...sliderSettings}>
                        <div className="p-4">
                            <a href="https://play.euw.leagueoflegends.com" target="_blank" rel="noopener noreferrer">
                                <img src={logo_lol} alt="Jeu 1" className="w-full h-32 object-cover rounded-lg mb-4"/>
                            </a>
                        </div>
                        <div className="p-4">
                            <a href="https://www.epicgames.com/fortnite" target="_blank" rel="noopener noreferrer">
                                <img src={logo_fortnite} alt="Jeu 2"
                                     className="w-full h-32 object-cover rounded-lg mb-4"/>
                            </a>
                        </div>
                        <div className="p-4">
                            <a href="https://www.minecraft.net" target="_blank" rel="noopener noreferrer">
                                <img src={logo_minecraft} alt="Jeu 3"
                                     className="w-full h-32 object-cover rounded-lg mb-4"/>
                            </a>
                        </div>
                        <div className="p-4">
                            <a href="https://www.rocketleague.com" target="_blank" rel="noopener noreferrer">
                                <img src={logo_rocket_league} alt="Jeu 4"
                                     className="w-full h-32 object-cover rounded-lg mb-4"/>
                            </a>
                        </div>
                    </Slider>
                </section>

                <section
                    className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-4xl">
                    <h2 className="text-4xl font-bold mb-4">Rejoignez notre communauté</h2>
                    <p className="text-lg mb-6">Partagez vos expériences, vos astuces et faites partie d'une communauté
                        passionnée de jeux.</p>
                    <Line className="" data={chartData} options={chartOptions}/>
                </section>

                <section
                    className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-4xl">
                    <h2 className="text-4xl font-bold mb-4">Participez à des événements</h2>
                    <p className="text-lg mb-6">Inscrivez-vous à des tournois et à des événements exclusifs organisés
                        par la communauté.</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Tournoi de Printemps - 25 Avril</li>
                        <li>Festival des Jeux - 12 Juin</li>
                        <li>Championnat d'Été - 30 Août</li>
                    </ul>
                </section>

                <section
                    className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-4">Nos ambassadeurs</h2>
                    <p className="text-lg mb-6">Accédez à des tutoriels et des guides pour améliorer vos compétences et
                        découvrir de nouvelles stratégies.</p>
                    <Slider {...sliderSettings}>
                        <div className="p-4">
                            <Link to="/ambassadors">
                                <div className="relative h-56 w-full rounded-lg overflow-hidden mb-4">
                                    <img src={joueur_lol} alt="Alex"
                                         className="absolute inset-0 w-full h-full object-cover"/>
                                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                                        <h3 className="text-2xl font-bold text-white mb-2">Alex</h3>
                                        <p className="text-lg text-white">Joueur de League of Legends</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="p-4">
                            <Link to="/ambassadors">
                                <div className="relative h-56 w-full rounded-lg overflow-hidden mb-4">
                                    <img src={joueur_minecraft} alt="Lucas"
                                         className="absolute inset-0 w-full h-full object-cover"/>
                                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                                        <h3 className="text-2xl font-bold text-white mb-2">Lucas</h3>
                                        <p className="text-lg text-white">Joueur de Minecraft</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="p-4">
                            <Link to="/ambassadors">
                                <div className="relative h-56 w-full rounded-lg overflow-hidden mb-4">
                                    <img src={joueuse_rocket_league} alt="Sarah"
                                         className="absolute inset-0 w-full h-full object-cover"/>
                                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                                        <h3 className="text-2xl font-bold text-white mb-2">Sarah</h3>
                                        <p className="text-lg text-white">Joueuse de Rocket League</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Slider>
                </section>

                <section
                    className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-4xl">
                    <h2 className="text-4xl font-bold mb-4">Témoignages</h2>
                    <p className="text-lg mb-6">Lisez les témoignages de nos membres et découvrez comment É
                        chec & Match a changé leur expérience de jeu.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/20 p-4 rounded-xl shadow-lg backdrop-blur-md border border-white/10">
                            <h3 className="text-2xl font-bold mb-2">"J'ai trouvé des amis pour jouer à Fortnite"</h3>
                            <p className="text-lg">- Marie</p>
                        </div>
                        <div className="bg-white/20 p-4 rounded-xl shadow-lg backdrop-blur-md border border-white/10">
                            <h3 className="text-2xl font-bold mb-2">"J'ai amélioré mes compétences grâce à Échec &
                                Match"</h3>
                            <p className="text-lg">- Lucas</p>
                        </div>
                    </div>
                </section>

                <section
                    className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-4xl">
                    <h2 className="text-4xl font-bold mb-4">Qui sommes-nous</h2>
                    <p className="text-lg mb-6">Bienvenue sur Echec&Match, notre site de rencontre dédié aux gamer idéal pour trouver
                        des partenaires de jeu et éviter de jouer seul. Que vous soyez passionné de jeux de tir, de MMORPG, de stratégie
                        ou tout autre genre, notre application de rencontre gamer vous aide à rencontrer des joueurs partageant vos intérêts
                        et votre passion pour le gaming.<br></br><br></br>
                        Echec&Match, vous permet de rencontrer des gamers et gameuses de tous horizons. Grâce à notre système de matchmaking gaming,
                        vous pouvez facilement trouver des partenaires pour jouer en équipe. Que vous cherchiez des coéquipiers pour des parties compétitives
                        ou des amis pour des sessions de jeu décontractées, notre plateforme est conçue pour répondre à vos besoins.<br></br><br></br>
                        En jouant en équipe, vous pouvez améliorer vos compétences, élaborer des stratégies plus efficaces et vivre une expérience de jeu
                        plus enrichissante. Sur notre application de rencontre gamer, Echec&Match, vous pouvez créer un profil détaillé, spécifier vos jeux préférés,
                        votre niveau de compétence et vos disponibilités. Cela permet à notre système de matchmaking gaming de vous mettre en relation avec
                        des joueurs qui correspondent à votre style de jeu et à vos préférences.<br></br><br></br>
                        La diversité de notre communauté est l'un de nos plus grands atouts. Echec&Match, vous offre la possibilité d'élargir
                        votre cercle de connaissances et de créer des souvenirs inoubliables avec d'autres passionnés de jeux vidéo.<br></br>
                        Notre application offre une expérience utilisateur intuitive et agréable. Avec des fonctionnalités avancées de recherche et de filtrage,
                        trouver des partenaires de jeu n'a jamais été aussi simple. Rejoignez notre communauté aujourd'hui et commencez à profiter
                        de tous les avantages de jouer en équipe.<br></br><br></br>
                        N'attendez plus pour découvrir tous les avantages. Que vous souhaitiez améliorer vos compétences, trouver des amis
                        ou simplement éviter de jouer seul, notre plateforme est là pour vous. Rejoignez-nous dès maintenant et vivez des aventures
                        avec d'autres gamers passionnés grâce à Echec&Match.</p>

                </section>
            </main>
        </div>
    );
}

export default HomePage;