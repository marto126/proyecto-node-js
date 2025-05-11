const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <p>© {year} Catálogo de Películas - Desarrollado con MERN Stack</p>
      </div>
    </footer>
  );
};

export default Footer;