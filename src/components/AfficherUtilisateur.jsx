// afficher les informations d'un utilisateur
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from './../../firebase-config';

const AfficherUtilisateurs = () => {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const db = getFirestore(app);

    useEffect(() => {
        const recupererUtilisateurs = async () => {
            const querySnapshot = await getDocs(collection(db, "utilisateurs"));
            let utilisateursTemp = [];
            querySnapshot.forEach((doc) => {
                utilisateursTemp.push(doc.data());
            });
            setUtilisateurs(utilisateursTemp);
        };
        recupererUtilisateurs();
    }, [db]);

    return (
        <div>
            <h1>Utilisateurs</h1>
            <ul>
                {utilisateurs.map((utilisateur, index) => (
                    <li key={index}>
                        {utilisateur.lastName} - {utilisateur.firstName} - {utilisateur.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AfficherUtilisateurs;