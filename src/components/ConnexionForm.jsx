// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import '../styles/ConnexionForm.css';

const ConnexionForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [genre, setGenre] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);

    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('Utilisateur connecté');
            }
        });
        return () => unsubscribe();
    }, [auth, navigate]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/home');
            }
        });
        return () => unsubscribe();
    }, [auth, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (error) {
            console.error("Erreur de connexion: ", error.message);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "utilisateurs", user.uid), {
                username,
                firstName,
                lastName,
                dob,
                genre,
                // Remarque : Nous ne stockons pas le mot de passe dans Firestore
            });
            navigate('/home');
        } catch (error) {
            console.error("Erreur d'inscription: ", error.message);
        }
    };

    return (
        <div className="connexion-form">
            {isNewUser ? (
                // Formulaire d'inscription
                <form onSubmit={handleSignup} className="signup-form">
                    <h2>Inscription</h2>
                    <input type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="email" placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="text" placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type="text" placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="date" placeholder="Date de naissance" value={dob} onChange={(e) => setDob(e.target.value)} />
                    <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option value="">Sélectionnez votre genre</option>
                        <option value="homme">Homme</option>
                        <option value="femme">Femme</option>
                        <option value="autre">Autre</option>
                    </select>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <button type="submit">S'inscrire</button>
                </form>
            ) : (
                // Formulaire de connexion
                <form onSubmit={handleLogin} className="login-form">
                    <h2>Connexion</h2>
                    <input type="email" placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Se connecter</button>
                </form>
            )}
            <button onClick={() => setIsNewUser(!isNewUser)} className="toggle-form">
                {isNewUser ? 'Retour à la connexion' : "Je n'ai pas de compte"}
            </button>
        </div>
    );
};

export default ConnexionForm;

