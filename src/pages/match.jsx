import React, { useState, useEffect, useRef } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from './../../firebase-config'; // Assurez-vous que ce chemin est correct
import TinderCard from 'react-tinder-card';
import { useNavigate } from 'react-router-dom'; // Pour React Router v6
import '../styles/matchPage.css'; // Assurez-vous que ce chemin est correct

const MatchSystem = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [utilisateurActuelIndex, setUtilisateurActuelIndex] = useState(0);
  const db = getFirestore(app);
  const navigate = useNavigate(); // useNavigate pour la redirection

  useEffect(() => {
    const recupererUtilisateurs = async () => {
      const querySnapshot = await getDocs(collection(db, 'utilisateurs'));
      let utilisateursTemp = [];
      querySnapshot.forEach((doc) => {
        utilisateursTemp.push({ id: doc.id, ...doc.data() });
      });
      setUtilisateurs(utilisateursTemp);
    };
    recupererUtilisateurs();
  }, [db]);

  const handleSwipe = (direction) => {
    console.log(`${utilisateurs[utilisateurActuelIndex]?.firstName} was swiped ${direction}`);
    if (direction === 'right') {
      // Redirection vers la page de conversation si l'utilisateur "like" en swipant à droite
      navigate('/conversation'); // Modifiez ce chemin selon votre route de conversation
    }
    // Passer à l'utilisateur suivant
    setUtilisateurActuelIndex((prevIndex) => (prevIndex + 1) % utilisateurs.length);
  };

  const defaultImageUrl = 'https://i.ibb.co/SBsB8h1/IMG-1611.jpg';

  if (utilisateurs.length === 0) return <div className="flex justify-center items-center h-screen">Chargement...</div>;

  const utilisateurActuel = utilisateurs[utilisateurActuelIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-8">Echec&Match</h1>
      <div className="cardContainer">
        <TinderCard
          className="swipe"
          key={utilisateurActuel.id}
          onSwipe={handleSwipe}
          preventSwipe={['up', 'down']}
        >
          <div className="card" style={{ backgroundImage: `url(${utilisateurActuel.imageUrl || defaultImageUrl})` }}>
            <h3>{utilisateurActuel.firstName} {utilisateurActuel.lastName}</h3>
          </div>
        </TinderCard>
      </div>
      <div className="actions">
        <button onClick={() => handleSwipe('left')} className="swipeButton passButton">
          <i className="fas fa-times"></i> Pass
        </button>
        <button onClick={() => handleSwipe('right')} className="swipeButton likeButton">
          <i className="fas fa-heart"></i> Like
        </button>
      </div>
    </div>
  );
};

export default MatchSystem;
