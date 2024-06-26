import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, getDocs } from "firebase/firestore";
import './../styles/ConnexionForm.css';
import logo from './../assets/LOGO.png';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Pour les icônes d'affichage/maskage du mot de passe

const avatarPaths = [
    "avatars/image1.png",
    "avatars/image2.png",
    "avatars/image3.png",
    "avatars/image4.png",
    "avatars/image5.png",
    "avatars/image.png"
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
    const [successMessage, setSuccessMessage] = useState(''); // Pour les messages de succès
    const [avatarOptions, setAvatarOptions] = useState([]);
    const [games, setGames] = useState([]);
    const [selectedGames, setSelectedGames] = useState([]);
    const [showPassword, setShowPassword] = useState(false); // Pour afficher/masquer le mot de passe
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

        const fetchGames = async () => {
            const gamesSnapshot = await getDocs(collection(db, 'games'));
            const gamesList = gamesSnapshot.docs.map(doc => doc.data().name);
            setGames(gamesList);
        };

        fetchAvatars();
        fetchGames();
    }, [storage, db]);

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
        setSuccessMessage('');
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
        setSuccessMessage('');

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
                games: selectedGames,
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

    const handleGameSelection = (e) => {
        const value = e.target.value;
        if (selectedGames.includes(value)) {
            setSelectedGames(selectedGames.filter(game => game !== value));
        } else if (selectedGames.length < 4) {
            setSelectedGames([...selectedGames, value]);
        }
    };

    const handleResetPassword = async () => {
        setErrorMessage('');
        setSuccessMessage('');
        if (!email) {
            setErrorMessage('Veuillez entrer votre adresse e-mail pour réinitialiser le mot de passe.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccessMessage('E-mail de réinitialisation du mot de passe envoyé.');
        } catch (error) {
            setErrorMessage(`Erreur lors de l'envoi de l'e-mail de réinitialisation : ${error.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-gray-500">
            <img src={logo} alt="Logo" className="mb-6 w-72 h-auto"/>
            {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
            {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}
            {isNewUser ? (
                <form onSubmit={handleSignup} className="w-full max-w-md p-8 space-y-4 shadow-md rounded-lg bg-white">
                    <h2 className="text-2xl font-bold text-center text-black">Inscription</h2>
                    <input
                        type="text"
                        placeholder="Nom d'utilisateur *"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Adresse e-mail *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                        required
                    />
                    <div className="relative w-full p-2 border border-gray-300 rounded mb-1">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mot de passe *"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-10 mb-0 text-black"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <p className='text-xs text-gray-500 mt-0'>au moins 8 caractères, une majuscule, une minuscule et un chiffre</p>
                    </div>
                    <input
                        type="text"
                        placeholder="Nom *"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Prénom *"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                        required
                    />
                    <input
                        type="date"
                        placeholder="Date de naissance *"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                        required
                    />
                    <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-gray-500"
                        required
                    >
                        <option value="" className="text-black">Sélectionnez votre genre *</option>
                        <option value="homme" className="text-black">Homme</option>
                        <option value="femme" className="text-black">Femme</option>
                        <option value="autre" className="text-black">Autre</option>
                    </select>
                    <div className="avatar-selection">
                        <p className="text-black">Sélectionnez votre avatar : *</p>
                        <div className="avatars flex flex-wrap">
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
                    <div className="games-selection">
                        <p>Sélectionnez jusqu'à 4 jeux : *</p>
                        <div className="grid grid-cols-2 gap-2">
                            {games.map((game, index) => (
                                <div
                                    key={index}
                                    className={`p-2 border rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
                                        selectedGames.includes(game) ? 'bg-purple-500 text-white border-transparent' : 'bg-gray-300 text-black border-gray-400'
                                    }`}
                                    onClick={() => handleGameSelection({ target: { value: game } })}
                                >
                                    {game}
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className='text-xs text-gray-500 mt-0'>* champs obligatoires</p>
                    <button type="submit" className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                        S'inscrire
                    </button>
                </form>
            ) : (
                <form onSubmit={handleLogin} className="w-full max-w-md p-8 space-y-4 shadow-md rounded-lg bg-white">
                    <h2 className="text-2xl font-bold text-center text-black">Connexion</h2>
                    <input
                        type="email"
                        placeholder="Adresse e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                        required
                    />
                    <div className="relative w-full p-2 border border-gray-300 rounded mb-1">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-10 mb-0 text-black"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button type="submit" className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                        Se connecter
                    </button>
                </form>
            )}
            <div className="flex justify-center space-x-4 mt-4">
                <button
                    onClick={() => setIsNewUser(!isNewUser)}
                    className="px-4 py-2 mb-6 bg-purple-700 text-white rounded hover:bg-purple-800"
                >
                    {isNewUser ? 'Retour à la connexion' : "Je n'ai pas de compte"}
                </button>
                <button
                    type="button"
                    onClick={handleResetPassword}
                    className="px-4 py-2 mb-6 bg-purple-700 text-white rounded hover:bg-purple-800"
                >
                    Réinitialiser le mot de passe
                </button>
            </div>
        </div>
    );
};

export default ConnexionForm;
