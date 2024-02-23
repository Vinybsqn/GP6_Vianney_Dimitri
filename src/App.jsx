// import {useState} from "react";
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Nav from './components/nav'
import ErrorPage from './pages/errorPage'
import HomePage from './pages/home'
import ProfilPage from './pages/profil'
import ChatPage from './pages/chat'
import MatchPage from './pages/match'
import AjouterUtilisateur from './components/AjouterUtilisateur';
import AfficherUtilisateurs from "./components/AfficherUtilisateur.jsx";
import AuthentificationGoogle from "./components/AuthentificationGoogle.jsx";
import ConnexionForm from "./components/ConnexionForm.jsx";
import Footer from "./components/footer.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ConnexionForm />} />
                
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Nav />
                            <HomePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profil"
                    element={
                        <PrivateRoute>
                            <Nav />
                            <ProfilPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/chat"
                    element={
                        <PrivateRoute>
                            <Nav />
                            <ChatPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/match"
                    element={
                        <PrivateRoute>
                            <Nav />
                            <MatchPage />
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;