// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { FiEdit2 } from "react-icons/fi";

const ProfilPage = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [editField, setEditField] = useState("");

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

  const updateUserField = async (fieldName, value) => {
    try {
      const userRef = doc(db, "utilisateurs", auth.currentUser.uid);
      await updateDoc(userRef, { [fieldName]: value });
      setEditField("");
      setUserData({ ...userData, [fieldName]: value });
    } catch (error) {
      console.error("Erreur lors de la mise à jour", error);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-bleu to-violet">
        <div className="p-10 backdrop-blur-lg bg-blanc/30 rounded-xl shadow-xl text-center space-y-4">
          <h1 className="text-4xl font-bold text-blanc">Profil de {userData.username}</h1>
          <div className="flex items-center justify-center space-x-2">
            <img src={userData.avatar} alt="Avatar" className="rounded-full w-24 h-24 object-cover" />
          </div>
          <div className="flex items-center justify-center space-x-2">
            {editField === "email" ? (
                <input
                    className="text-center"
                    type="text"
                    defaultValue={userData.email}
                    onBlur={(e) => updateUserField("email", e.target.value)}
                    autoFocus
                />
            ) : (
                <span className="text-blanc">{`E-Mail: ${userData.email}`}</span>
            )}
            <FiEdit2 onClick={() => setEditField("email")}
                     className="cursor-pointer text-xl text-blanc hover:text-gray-300" />
          </div>
          <div className="flex items-center justify-center space-x-2">
            {editField === "lastName" ? (
                <input
                    className="text-center"
                    type="text"
                    defaultValue={userData.lastName}
                    onBlur={(e) => updateUserField("lastName", e.target.value)}
                    autoFocus
                />
            ) : (
                <span className="text-blanc">{`Nom: ${userData.lastName}`}</span>
            )}
            <FiEdit2 onClick={() => setEditField("lastName")}
                     className="cursor-pointer text-xl text-blanc hover:text-gray-300" />
          </div>
          <div className="flex items-center justify-center space-x-2">
            {editField === "firstName" ? (
                <input
                    className="text-center"
                    type="text"
                    defaultValue={userData.firstName}
                    onBlur={(e) => updateUserField("firstName", e.target.value)}
                    autoFocus
                />
            ) : (
                <span className="text-blanc">{`Prénom: ${userData.firstName}`}</span>
            )}
            <FiEdit2 onClick={() => setEditField("firstName")}
                     className="cursor-pointer text-xl text-blanc hover:text-gray-300" />
          </div>
          <div className="flex items-center justify-center space-x-2">
            {editField === "genre" ? (
                <input
                    className="text-center"
                    type="text"
                    defaultValue={userData.genre}
                    onBlur={(e) => updateUserField("genre", e.target.value)}
                    autoFocus
                />
            ) : (
                <span className="text-blanc">{`Genre: ${userData.genre}`}</span>
            )}
            <FiEdit2 onClick={() => setEditField("genre")}
                     className="cursor-pointer text-xl text-blanc hover:text-gray-300" />
          </div>
          <div className="flex items-center justify-center space-x-2">
            {editField === "dob" ? (
                <input
                    className="text-center"
                    type="text"
                    defaultValue={userData.dob}
                    onBlur={(e) => updateUserField("dob", e.target.value)}
                    autoFocus
                />
            ) : (
                <span className="text-blanc">{`Date de naissance: ${userData.dob}`}</span>
            )}
            <FiEdit2 onClick={() => setEditField("dob")}
                     className="cursor-pointer text-xl text-blanc hover:text-gray-300" />
          </div>
          <button onClick={handleSignOut}
                  className="mt-4 px-4 py-2 bg-violet text-blanc font-semibold rounded hover:bg-blue-600 transition-colors">
            Déconnexion
          </button>
        </div>
      </div>
  );
};

export default ProfilPage;
