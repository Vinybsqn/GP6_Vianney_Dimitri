import React, { useState, useEffect, useRef } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from './../../firebase-config';
import TinderCard from 'react-tinder-card';
import '../styles/matchPage.css';

const MatchSystem = () => {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [utilisateurActuelIndex, setUtilisateurActuelIndex] = useState(null);
    const db = getFirestore(app);
    const tinderCardRef = useRef(null);

    useEffect(() => {
        const recupererUtilisateurs = async () => {
            const querySnapshot = await getDocs(collection(db, "utilisateurs"));
            let utilisateursTemp = [];
            querySnapshot.forEach((doc) => {
                utilisateursTemp.push({ id: doc.id, ...doc.data() });
            });
            setUtilisateurs(utilisateursTemp);
            setUtilisateurActuelIndex(utilisateursTemp.length > 0 ? 0 : null);
        };
        recupererUtilisateurs();
    }, [db]);

    const handleSwipe = (direction) => {
        console.log(`${utilisateurs[utilisateurActuelIndex].firstName} was swiped ${direction}`);
        setUtilisateurActuelIndex(prevIndex => (prevIndex + 1) % utilisateurs.length);
    };

    const swipe = (dir) => {
        if (tinderCardRef.current && tinderCardRef.current.swipe) {
            tinderCardRef.current.swipe(dir);
        }
    };

    const defaultImageUrl = "https://i.ibb.co/SBsB8h1/IMG-1611.jpg";

    if (utilisateurActuelIndex === null) return <div className="flex justify-center items-center h-screen">Chargement...</div>;

    const utilisateurActuel = utilisateurs[utilisateurActuelIndex];

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-8">Echec&Match</h1>
            <div className="cardContainer">
                <TinderCard
                    ref={tinderCardRef}
                    className="swipe"
                    key={utilisateurActuel.id}
                    onSwipe={(dir) => handleSwipe(dir)}
                    preventSwipe={["up", "down"]}
                >
                    <div className="card" style={{ backgroundImage: `url(${utilisateurActuel.imageUrl || defaultImageUrl})` }}>
                        <h3>{utilisateurActuel.firstName} {utilisateurActuel.lastName}</h3>
                    </div>
                </TinderCard>
            </div>
            <div className="actions">
                <button onClick={() => swipe('left')} className="swipeButton passButton">
                    <i className="fas fa-times"></i> Pass
                </button>
                <button onClick={() => swipe('right')} className="swipeButton likeButton">
                    <i className="fas fa-heart"></i> Like
                </button>
            </div>
        </div>
    );
}

export default MatchSystem;
