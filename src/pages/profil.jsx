import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const ProfilPage = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "utilisateurs", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.log("Aucune donnée utilisateur trouvée!");
        }
      } else {
        navigate("/connexion");
      }
    });

    return () => unsubscribe();
  }, [auth, db, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Déconnexion réussie');
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-bleu to-violet">
        <div className="p-10 backdrop-blur-lg bg-blanc/30 rounded-xl shadow-xl text-center space-y-4">
          <h1 className="text-4xl font-bold text-blanc">Profil de {userData.username}</h1>
          <p className="text-blanc">Email: {userData.email}</p>
          <p className="text-blanc">Nom: {userData.lastName}</p>
          <p className="text-blanc">Prénom: {userData.firstName}</p>
          <p className="text-blanc">Genre: {userData.genre}</p>
          <p className="text-blanc">Date de naissance: {userData.dob}</p>
          <button onClick={handleSignOut} className="mt-4 px-4 py-2 bg-violet text-blanc font-semibold rounded hover:bg-violet-700 transition-colors">
            Déconnexion
          </button>
        </div>
      </div>
  );
};

export default ProfilPage;
