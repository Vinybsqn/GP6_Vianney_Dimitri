// import {useState} from "react";
import './App.css'
import './styles/index.scss'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Nav from './components/nav'
import ErrorPage from './pages/errorPage'
import HomePage from './pages/home'
import AjouterUtilisateur from './components/AjouterUtilisateur';
import logo from '../public/logo.png'

function App() {
 // const [count, setCount] = useState(0);


  return (
    <>
      <img src={logo} alt="Pendax Game" style={{
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
        </div>
    </>
  )
}

export default App
