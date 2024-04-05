import React from 'react';
// Assurez-vous d'avoir installé `react-icons` pour utiliser les icônes sociales
import { FaTwitter, FaInstagram ,FaTiktok} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="fixed inset-x-0 bottom-0 w-full bg-[#ffffff20] backdrop-blur-md border-t border-[#ffffff50] text-white py-6 px-4 text-center">
      <p className="text-sm mb-4">Suivez-nous sur les réseaux sociaux</p>
      <div className="flex justify-center space-x-6">
        <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="text-xl hover:text-blue-400">
          <FaTiktok />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-xl hover:text-blue-400">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-xl hover:text-blue-400">
          <FaInstagram />
        </a>
      </div>
      <p className="text-xs mt-6">© 2024 Echec&Match. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
