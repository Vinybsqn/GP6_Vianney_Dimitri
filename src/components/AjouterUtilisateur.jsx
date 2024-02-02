// eslint-disable-next-line no-unused-vars
import React from 'react';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from '../../firebase-config'; // Assurez-vous que le chemin d'accès est correct


const AjouterUtilisateur = () => {
    const db = getFirestore(app);

    const ajouterUtilisateur = async () => {
        try {
            const docRef = await addDoc(collection(db, "utilisateurs"), {
                nom: "Durand",
                prenom: "Jean",
                email: "jeandurand@example.com"
            });
            console.log("Document écrit avec l'ID : ", docRef.id);
        } catch (e) {
            console.error("Erreur d'ajout de document : ", e);
        }
    };

    return (
        <div>
            <button onClick={ajouterUtilisateur}>Ajouter Utilisateur</button>
        </div>
    );
};

export default AjouterUtilisateur;
