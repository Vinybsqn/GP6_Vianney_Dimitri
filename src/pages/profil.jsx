import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import '../styles/ProfilPage.css'; // Assurez-vous d'ajouter le CSS correspondant

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

  return (
    <div className="profil-page">
      <h1>Profil de {userData.username}</h1>
      <p>Email: {userData.email}</p>
      <p>Nom: {userData.lastName}</p>
      <p>Prénom: {userData.firstName}</p>
      <p>Genre: {userData.genre}</p>
      <p>Date de naissance: {userData.dob}</p>
    </div>
  );
};

export default ProfilPage;
