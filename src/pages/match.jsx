import React, { useState, useEffect, useRef } from 'react';
import {getFirestore, collection, getDocs, doc, setDoc, serverTimestamp, getDoc} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from './../../firebase-config';
import TinderCard from 'react-tinder-card';
import { useNavigate } from 'react-router-dom';

const MatchSystem = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [utilisateurActuelIndex, setUtilisateurActuelIndex] = useState(0);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const recupererUtilisateurs = async () => {
      const querySnapshot = await getDocs(collection(db, 'utilisateurs'));
      let utilisateursTemp = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== currentUser.uid) {  // Filter out the current user from the list
          utilisateursTemp.push({ id: doc.id, ...doc.data() });
        }
      });
      setUtilisateurs(utilisateursTemp);
    };
    recupererUtilisateurs();
  }, [db]);

  const handleSwipe = async (direction, swipedUserId) => {
    console.log(`${utilisateurs[utilisateurActuelIndex]?.firstName} was swiped ${direction}`);
    if (direction === 'right') {
      try {
        // Check if there's already a 'like' from the other user
        const docRef = doc(db, "matches", `${swipedUserId}_${currentUser.uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Match exists, create conversation
          const conversationId = `${currentUser.uid}_${swipedUserId}`;
          await setDoc(doc(db, "conversations", conversationId), {
            participants: [currentUser.uid, swipedUserId],
            timestamp: serverTimestamp(),
          });
          await setDoc(doc(db, `conversations/${conversationId}/messages`, "1"), {
            text: "You've matched! Say hi!",
            timestamp: serverTimestamp(),
            sender: "system"
          });

          // Navigate to the chat page of the newly created conversation
          navigate(`/chat/${conversationId}`);
        } else {
          // No match yet, save the like
          await setDoc(doc(db, "matches", `${currentUser.uid}_${swipedUserId}`), {
            liked: true
          });
        }
      } catch (error) {
        console.error('Error handling swipe:', error);
      }
    }
    // Move to the next user regardless of whether there was a match or not
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
              onSwipe={(dir) => handleSwipe(dir, utilisateurActuel.id)}
              preventSwipe={['up', 'down']}
          >
            <div className="card" style={{ backgroundImage: `url(${utilisateurActuel.imageUrl || defaultImageUrl})` }}>
              <h3>{utilisateurActuel.firstName} {utilisateurActuel.lastName}</h3>
            </div>
          </TinderCard>
        </div>
        <div className="actions">
          <button onClick={() => handleSwipe('left', utilisateurActuel.id)} className="swipeButton passButton">
            <i className="fas fa-times"></i> Pass
          </button>
          <button onClick={() => handleSwipe('right', utilisateurActuel.id)} className="swipeButton likeButton">
            <i className="fas fa-heart"></i> Like
          </button>
        </div>
      </div>
  );
};

export default MatchSystem;
