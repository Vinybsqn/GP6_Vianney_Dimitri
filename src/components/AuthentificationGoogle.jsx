// eslint-disable-next-line no-unused-vars
import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const AuthentificationGoogle = () => {
    const auth = getAuth();
    const db = getFirestore();

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then(async (result) => {
                // Les informations de l'utilisateur connecté
                const user = result.user;

                // Référence au document de l'utilisateur dans Firestore
                const userRef = doc(db, "utilisateurs", user.uid);

                // Données à enregistrer ou à mettre à jour
                const userProfile = {
                    nom: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    lastLogin: new Date()
                };

                // Créer ou mettre à jour le document de l'utilisateur
                await setDoc(userRef, userProfile, { merge: true });
            })
            .catch((error) => {
                // Gérer les erreurs ici
                console.error("Erreur lors de l'authentification :", error.code, error.message);
            });
    };

    return (
        <button onClick={signInWithGoogle}>Se connecter avec Google</button>
    );
};

export default AuthentificationGoogle;
