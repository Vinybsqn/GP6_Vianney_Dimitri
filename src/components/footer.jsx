// Footer.jsx
import React from 'react';
import '../styles/footer.css'; // Assurez-vous que le chemin d'accès est correct

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Rejoignez-nous sur nos réseaux sociaux</p>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
