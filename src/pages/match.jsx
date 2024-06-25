import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from './../../firebase-config';
import TinderCard from 'react-tinder-card';
import { useNavigate } from 'react-router-dom';

const MatchSystem = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [utilisateurActuelIndex, setUtilisateurActuelIndex] = useState(0);
  const [isMatching, setIsMatching] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const defaultImageUrl = '/image.png';

  useEffect(() => {
    const fetchAvatars = (users) => {
      const usersWithAvatars = users.map((user) => {
        return { ...user, avatar: user.avatar || defaultImageUrl };
      });
      setUtilisateurs(usersWithAvatars);
    };

    const recupererUtilisateurs = async () => {
      if (!currentUser) return;
      const querySnapshot = await getDocs(collection(db, 'utilisateurs'));
      let utilisateursTemp = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== currentUser.uid) {  // Exclure l'utilisateur actuel de la liste
          utilisateursTemp.push({ id: doc.id, ...doc.data() });
        }
      });
      fetchAvatars(utilisateursTemp);
    };

    recupererUtilisateurs();
  }, [db, currentUser]);

  const handleSwipe = async (direction, swipedUserId) => {
    console.log(`${utilisateurs[utilisateurActuelIndex]?.username} was swiped ${direction}`);
    if (direction === 'right') {
      try {
        // Vérifiez s'il y a déjà un 'like' de l'autre utilisateur
        const docRef = doc(db, "matches", `${swipedUserId}_${currentUser.uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Le match existe, créez une conversation
          setMatchedUser(utilisateurs[utilisateurActuelIndex]);
          setIsMatching(true);
          const conversationId = `${currentUser.uid}_${swipedUserId}`;
          await setDoc(doc(db, "conversations", conversationId), {
            participants: [currentUser.uid, swipedUserId],
            timestamp: serverTimestamp(),
          });
          await setDoc(doc(db, `conversations/${conversationId}/messages`, "1"), {
            text: "Vous avez un match ! Dites bonjour !",
            timestamp: serverTimestamp(),
            sender: "system"
          });

          // Animation de 5-6 secondes avant de naviguer vers la page de chat
          setTimeout(() => {
            navigate(`/chat/${conversationId}`);
          }, 5000);
        } else {
          // Pas encore de match, enregistrez le like
          await setDoc(doc(db, "matches", `${currentUser.uid}_${swipedUserId}`), {
            liked: true
          });
          setUtilisateurActuelIndex((prevIndex) => (prevIndex + 1) % utilisateurs.length);
        }
      } catch (error) {
        console.error('Erreur lors du swipe :', error);
      }
    } else {
      // Passer à l'utilisateur suivant en cas de swipe left
      setUtilisateurActuelIndex((prevIndex) => (prevIndex + 1) % utilisateurs.length);
    }
  };

  if (utilisateurs.length === 0) return <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-gray-500">Chargement...</div>;

  const utilisateurActuel = utilisateurs[utilisateurActuelIndex];

  return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-gray-500">
        <h1 className="text-2xl font-bold mb-8">Echec&Match</h1>
        {isMatching && matchedUser && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-black bg-opacity-75 z-50">
              <div className="flex items-center justify-center space-x-4">
                <img src={currentUser.photoURL || defaultImageUrl} alt="Your Avatar" className="w-24 h-24 rounded-full border-4 border-white" />
                <img src={matchedUser.avatar} alt="Matched User Avatar" className="w-24 h-24 rounded-full border-4 border-white" />
              </div>
              <h2 className="text-4xl text-white mt-4">Vous avez matché avec {matchedUser.username}!</h2>
            </div>
        )}
        <div className="relative w-11/12 max-w-xs h-96">
          {utilisateurActuel && (
              <TinderCard
                  className="absolute w-full h-full"
                  key={utilisateurActuel.id}
                  onSwipe={(dir) => handleSwipe(dir, utilisateurActuel.id)}
                  preventSwipe={['up', 'down']}
              >
                <div
                    className="relative w-full h-full bg-cover bg-center rounded-xl shadow-lg flex items-end justify-center p-4 text-white text-lg font-bold"
                    style={{ backgroundImage: `url(${utilisateurActuel.avatar || defaultImageUrl})` }}>
                  <h3>{utilisateurActuel.username}</h3>
                </div>
              </TinderCard>
          )}
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <button onClick={() => handleSwipe('left', utilisateurActuel.id)} className="swipeButton passButton p-3">
            <img src="/x-button.png" alt="Pass" className="w-12 h-12" />
          </button>
          <button onClick={() => handleSwipe('right', utilisateurActuel.id)} className="swipeButton likeButton p-3">
            <img src="/v-button.png" alt="Like" className="w-12 h-12" />
          </button>
        </div>
      </div>
  );
};

export default MatchSystem;
