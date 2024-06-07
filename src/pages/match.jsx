import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import app from './../../firebase-config';
import TinderCard from 'react-tinder-card';
import { useNavigate } from 'react-router-dom';

const MatchSystem = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [utilisateurActuelIndex, setUtilisateurActuelIndex] = useState(0);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);
  const navigate = useNavigate();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchAvatars = async (users) => {
      const usersWithAvatars = await Promise.all(
          users.map(async (user) => {
            if (user.avatar) {
              const avatarRef = ref(storage, user.avatar);
              const avatar = await getDownloadURL(avatarRef).catch(() => defaultImageUrl);
              return { ...user, avatar };
            }
            return { ...user, avatar: defaultImageUrl };
          })
      );
      setUtilisateurs(usersWithAvatars);
    };

    const recupererUtilisateurs = async () => {
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
  }, [db, currentUser, storage]);

  const handleSwipe = async (direction, swipedUserId) => {
    console.log(`${utilisateurs[utilisateurActuelIndex]?.firstName} was swiped ${direction}`);
    if (direction === 'right') {
      try {
        // Vérifiez s'il y a déjà un 'like' de l'autre utilisateur
        const docRef = doc(db, "matches", `${swipedUserId}_${currentUser.uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Le match existe, créez une conversation
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

          // Naviguer vers la page de chat de la conversation nouvellement créée
          navigate(`/chat/${conversationId}`);
        } else {
          // Pas encore de match, enregistrez le like
          await setDoc(doc(db, "matches", `${currentUser.uid}_${swipedUserId}`), {
            liked: true
          });
        }
      } catch (error) {
        console.error('Erreur lors du swipe :', error);
      }
    }
    // Passer à l'utilisateur suivant qu'il y ait un match ou non
    setUtilisateurActuelIndex((prevIndex) => (prevIndex + 1) % utilisateurs.length);
  };

  const defaultImageUrl = 'https://i.ibb.co/SBsB8h1/IMG-1611.jpg';

  if (utilisateurs.length === 0) return <div className="flex justify-center items-center h-screen">Chargement...</div>;

  const utilisateurActuel = utilisateurs[utilisateurActuelIndex];

  return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-8">Echec&Match</h1>
        <div className="relative w-11/12 max-w-xs h-96">
          <TinderCard
              className="absolute w-full h-full"
              key={utilisateurActuel.id}
              onSwipe={(dir) => handleSwipe(dir, utilisateurActuel.id)}
              preventSwipe={['up', 'down']}
          >
            <div
                className="relative w-full h-full bg-cover bg-center rounded-xl shadow-lg flex items-end justify-center p-4 text-white text-lg font-bold"
                style={{ backgroundImage: `url(${utilisateurActuel.avatar || defaultImageUrl})` }}>
              <h3>{utilisateurActuel.firstName} {utilisateurActuel.lastName}</h3>
            </div>
          </TinderCard>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <button onClick={() => handleSwipe('left', utilisateurActuel.id)} className="swipeButton passButton p-3 bg-white text-red-500 rounded-full shadow-md hover:scale-110 transition-transform">
            <i className="fas fa-times text-xl"></i>
          </button>
          <button onClick={() => handleSwipe('right', utilisateurActuel.id)} className="swipeButton likeButton p-3 bg-white text-green-500 rounded-full shadow-md hover:scale-110 transition-transform">
            <i className="fas fa-heart text-xl"></i>
          </button>
        </div>
      </div>
  );
};

export default MatchSystem;