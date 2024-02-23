// import {useState} from "react";
import './App.css'
import './index.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Nav from './components/nav'
import ErrorPage from './pages/errorPage'
import HomePage from './pages/home'
import AjouterUtilisateur from './components/AjouterUtilisateur';
import AfficherUtilisateurs from "./components/AfficherUtilisateur.jsx";
import AuthentificationGoogle from "./components/AuthentificationGoogle.jsx";
import ConnexionForm from "./components/ConnexionForm.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConnexionForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;