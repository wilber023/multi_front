  import { Link } from "react-router-dom";
import "./notfound.css";

  const NotFound = () => {
    return (
      <div className="notfound-container">
        <header className="top-header"></header>
        
        <div>
          <div className="starsec"></div>
          <div className="starthird"></div>
          <div className="starfourth"></div>
          <div className="starfifth"></div>
        </div>
        
        <div className="lamp__wrap">
          <div className="lamp">
            <div className="cable"></div>
            <div className="cover"></div>
            <div className="in-cover">
              <div className="bulb"></div>
            </div>
            <div className="light"></div>
          </div>
        </div>
        
        <section className="error">
          <div className="error__content">
            <div className="error__message message">
              <h1 className="message__title">Page Not Found</h1>
              <Link to={"/"}>
              <p className="return">Volver al inicio</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  };

  export default NotFound;