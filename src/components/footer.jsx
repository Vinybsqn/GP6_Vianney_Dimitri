import React from 'react';

const Footer = () => {
  return (
      <footer className="footer bg-transparent/20 backdrop-blur-md py-4 px-6 text-center text-blanc fixed inset-x-0 bottom-0">
        <div className="footer-content">
          <p>Rejoignez-nous sur nos réseaux sociaux</p>
          <div className="social-links flex justify-center space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-bleu">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-bleu">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-bleu">Instagram</a>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
