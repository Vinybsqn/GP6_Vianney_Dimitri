import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from './../../firebase-config';
import '../styles/matchPage.css';

const MatchSystem = () => {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const db = getFirestore(app);

    useEffect(() => {
        const recupererUtilisateurs = async () => {
            const querySnapshot = await getDocs(collection(db, "utilisateurs"));
            let utilisateursTemp = [];
            querySnapshot.forEach((doc) => {
                utilisateursTemp.push({ id: doc.id, ...doc.data() });
            });
            setUtilisateurs(utilisateursTemp);
        };
        recupererUtilisateurs();
    }, [db]);

    const handleLike = () => {
        console.log(`Liked: ${utilisateurs[currentIndex].firstName} ${utilisateurs[currentIndex].lastName}`);
        moveToNextUser();
    };

    const handlePass = () => {
        console.log(`Passed: ${utilisateurs[currentIndex].firstName} ${utilisateurs[currentIndex].lastName}`);
        moveToNextUser();
    };

    const moveToNextUser = () => {
        setCurrentIndex(currentIndex < utilisateurs.length - 1 ? currentIndex + 1 : 0);
    };

    if (utilisateurs.length === 0) return <div className="flex justify-center items-center h-screen">Chargement...</div>;

    const { lastName, firstName, email } = utilisateurs[currentIndex];

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-8">Echec&Match</h1>
            <div className="mb-4">
                <p>Nom : <span className="font-semibold">{lastName}</span></p>
                <p>Prénom : <span className="font-semibold">{firstName}</span></p>
            </div>
            <div className="flex space-x-4">
                <button onClick={handleLike} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">Like</button>
                <button onClick={handlePass} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">Pass</button>
            </div>
        </div>
    );
}

export default MatchSystem;
