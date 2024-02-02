// import {useState} from "react";
import './App.css'
import './styles/index.scss'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Nav from './components/nav'
import ErrorPage from './pages/errorPage'
import HomePage from './pages/home'
import AjouterUtilisateur from './components/AjouterUtilisateur';
import AfficherUtilisateurs from "./components/AfficherUtilisateur.jsx";
import AuthentificationGoogle from "./components/AuthentificationGoogle.jsx";
import ConnexionForm from "./components/ConnexionForm.jsx";

function App() {
 // const [count, setCount] = useState(0);


  return (
    <>

      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<ConnexionForm />} />
            <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
        {
            /*
                    <div className="App">
            <h1>Ajouter un utilisateur à Firestore</h1>
            <AjouterUtilisateur />
          <AfficherUtilisateurs />
        </div>

        <div>
      <h1>Bienvenue dans l'Application</h1>
      <AuthentificationGoogle />
    </div>
             */
        }

    </>
  )
}

export default App;
