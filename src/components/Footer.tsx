const Footer = () => {
  return (
    <footer className="app-footer glass-footer">
      <div>
        <p className="footer-title">MediChat</p>
        <small className="footer-copy">Trustworthy healthcare answers powered by AI.</small>
      </div>
      <div className="footer-links">
        <a href="https://is.gd/f5I7lE" target="_blank" rel="noreferrer">School</a>
        <a href="https://github.com/medichat-ai" target="_blank" rel="noreferrer">GitHub</a>
      </div>
      <small className="footer-copy">© {new Date().getFullYear()} MediChat</small>
    </footer>
  );
};

export default Footer;
