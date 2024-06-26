// import {useState} from "react";
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Nav from './components/nav'
import ErrorPage from './pages/errorPage'
import HomePage from './pages/home'
import ProfilPage from './pages/profil'
import ChatPage from './pages/chat'
import MatchPage from './pages/match'
import ConnexionForm from "./components/ConnexionForm.jsx";
import Footer from "./components/footer.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { AuthProvider } from './components/AuthContext';
import Conversations from "./pages/Conversations.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
    return (
        <AuthProvider>
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
                            <ChatPage />
                        </PrivateRoute>
                    }
                />
                    <Route
                        path="/conversations"
                        element={
                        <PrivateRoute>
                            <Nav />
                        <Conversations />
                        </PrivateRoute>
                    }
                />
                    <Route
                        path="/chat/:conversationId"
                        element={
                            <ChatPage />
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
            </AuthProvider>
    );
}

export default App;