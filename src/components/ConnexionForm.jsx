// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import './../styles/ConnexionForm.css';
import logo from './../assets/LOGO.png';
import { getStorage, ref, getDownloadURL } from "firebase/storage";


const avatarPaths = [
    "avatars/Avatar femme (1).png",
    "avatars/Avatar femme.png",
    "avatars/Avatar utilisateur (1).png",
    "avatars/Avatar utilisateur (2).png",
    "avatars/Avatar utilisateur.png"
];


const ConnexionForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [genre, setGenre] = useState('');
    const [avatar, setAvatar] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [avatarOptions, setAvatarOptions] = useState([]);
    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore();
    const storage = getStorage();


    useEffect(() => {
        const fetchAvatars = async () => {
            const urls = await Promise.all(
                avatarPaths.map(async (path) => {
                    const url = await getDownloadURL(ref(storage, path));
                    return url;
                })
            );
            setAvatarOptions(urls);
            setAvatar(urls[0]); // Par défaut, le premier avatar
        };

        fetchAvatars();
    }, [storage]);

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
        setErrorMessage(''); // Clear previous error message
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (error) {
            let message = "Erreur de connexion: ";
            switch (error.code) {
                case 'auth/invalid-email':
                    message += "Adresse e-mail invalide.";
                    break;
                case 'auth/user-disabled':
                    message += "Cet utilisateur a été désactivé.";
                    break;
                case 'auth/user-not-found':
                    message += "Utilisateur non trouvé.";
                    break;
                case 'auth/wrong-password':
                    message += "Mot de passe incorrect.";
                    break;
                case 'auth/invalid-credential':
                    message += "Informations d'identification invalides.";
                    break;
                default:
                    message += error.message;
            }
            setErrorMessage(message);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error message

        // Password validation
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordPattern.test(password)) {
            setErrorMessage('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "utilisateurs", user.uid), {
                email,
                username,
                firstName,
                lastName,
                dob,
                genre,
                avatar,
            });
            navigate('/home');
        } catch (error) {
            let message = "Erreur d'inscription: ";
            switch (error.code) {
                case 'auth/email-already-in-use':
                    message += "L'adresse e-mail est déjà utilisée par un autre compte.";
                    break;
                case 'auth/invalid-email':
                    message += "Adresse e-mail invalide.";
                    break;
                case 'auth/operation-not-allowed':
                    message += "L'opération n'est pas autorisée.";
                    break;
                case 'auth/weak-password':
                    message += "Le mot de passe est trop faible.";
                    break;
                default:
                    message += error.message;
            }
            setErrorMessage(message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <img src={logo} alt="Logo" className="mb-6 w-72 h-auto"/>
            {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
            {isNewUser ? (
                <form onSubmit={handleSignup} className="w-full max-w-md p-8 space-y-4 shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold text-center">Inscription</h2>
                    <input
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Adresse e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Nom"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Prénom"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="date"
                        placeholder="Date de naissance"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Sélectionnez votre genre</option>
                        <option value="homme">Homme</option>
                        <option value="femme">Femme</option>
                        <option value="autre">Autre</option>
                    </select>
                    <div className="avatar-selection">
                        <p>Sélectionnez votre avatar:</p>
                        <div className="avatars">
                            {avatarOptions.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Avatar ${index + 1}`}
                                    className={`avatar ${avatar === url ? 'selected' : ''}`}
                                    onClick={() => setAvatar(url)}
                                    style={{
                                        cursor: 'pointer',
                                        width: '50px',
                                        height: '50px',
                                        margin: '5px',
                                        border: avatar === url ? '2px solid blue' : 'none'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    <button type="submit"
                            className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                        S'inscrire
                    </button>
                </form>
            ) : (
                <form onSubmit={handleLogin} className="w-full max-w-md p-8 space-y-4 shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold text-center">Connexion</h2>
                    <input
                        type="email"
                        placeholder="Adresse e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <button type="submit" className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                        Se connecter
                    </button>
                </form>
            )}
            <button
                onClick={() => setIsNewUser(!isNewUser)}
                className="mt-4 text-blue-500 hover:underline p-1"
            >
                {isNewUser ? 'Retour à la connexion' : "Je n'ai pas de compte"}
            </button>
        </div>
    );
};

export default ConnexionForm;
