// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { FiMenu, FiX, FiHome, FiMessageSquare, FiUser, FiLogOut } from 'react-icons/fi';

const Nav = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
    const closeSidebar = () => setIsSidebarOpen(false);


    const handleLogout = async () => {
        console.log('Déconnexion en cours...');
        try {
            await signOut(auth);
            console.log('Déconnexion réussie');
            navigate('/');
        } catch (error) {
            console.error('Erreur lors de la déconnexion', error);
        }
    };

    return (
        <>
            {/* Overlay */}
            <div className={`fixed inset-0 z-40 ${isSidebarOpen ? '' : 'hidden'} bg-black bg-opacity-30 backdrop-blur-sm`} onClick={() => setIsSidebarOpen(false)} />

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 w-64 h-full bg-white/10 backdrop-blur-lg  border-gray-200 p-4 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`} onClick={(e) => e.stopPropagation()}>

                {/* Close Button */}
                <FiX className="text-3xl text-white cursor-pointer" onClick={() => setIsSidebarOpen(false)} />

                {/* Navigation */}
                <nav className="mt-8 flex flex-col justify-between h-full">
                    <div>
                        <NavLink to="/home" className="flex items-center space-x-2 p-2 hover:bg-white/50 rounded" onClick={closeSidebar}>
                            <FiHome className="text-xl"/><span>Accueil</span>
                        </NavLink>
                        <NavLink to="/match" className="flex items-center space-x-2 p-2 hover:bg-white/50 rounded" onClick={closeSidebar}>
                            <FiMessageSquare className="text-xl"/><span>Matchs</span>
                        </NavLink>
                        <NavLink to="/chat" className="flex items-center space-x-2 p-2 hover:bg-white/50 rounded" onClick={closeSidebar}>
                            <FiMessageSquare className="text-xl"/><span>Chats</span>
                        </NavLink>
                        <NavLink to="/profil" className="flex items-center space-x-2 p-2 hover:bg-white/50 rounded" onClick={closeSidebar}>
                            <FiUser className="text-xl"/><span>Profil</span>
                        </NavLink>
                        <button type="button" onClick={handleLogout} className="flex items-center space-x-2 p-2 hover:bg-white/50 rounded">
                            <FiLogOut className="text-xl"/><span>Déconnexion</span>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Hamburger Menu Icon */}
            {!isSidebarOpen && (
                <FiMenu className="text-3xl text-white cursor-pointer fixed top-4 left-4 z-50" onClick={() => setIsSidebarOpen(true)}/>
            )}
        </>
    );
};

export default Nav;
