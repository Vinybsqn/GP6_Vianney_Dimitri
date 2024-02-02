// import {useState} from "react";
import './App.css'
import './styles/index.scss'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Nav from './components/nav'
import ErrorPage from './pages/errorPage'
import HomePage from './pages/home'
import AjouterUtilisateur from './components/AjouterUtilisateur';
import logo from '../public/logo.png'
import AfficherUtilisateurs from "./components/AfficherUtilisateur.jsx";
import AuthentificationGoogle from "./components/AuthentificationGoogle.jsx";

function App() {
 
  return (
    <>
      <img src={logo} alt="EchecEtMatch" style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '50%',
              
          }}/>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <div className="App">
            <h1>Ajouter un utilisateur à Firestore</h1>
            <AjouterUtilisateur />
          <AfficherUtilisateurs />
        </div>

        <div>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <h1>Bienvenue dans l'Application</h1>
            <AuthentificationGoogle />
        </div>
    </>
  )
}

export default App
