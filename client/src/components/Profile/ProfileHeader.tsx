import "./Profile.css";
import { useState } from "react";

import logo from "../Room/logo1.png";

const ProfileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="profile-header">
      <div className="header-content">
        <div className="header-logo">
          <div className="logo">
            <img src={logo} alt="Site Logo" />
          </div>
        </div>
        <div className="header-links">
          <div className="header-menu" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`header-links-a ${menuOpen ? "open" : "closed"}`}>
            <div className="header-link">
              <a href="/waiting">Oczekujące</a>
            </div>
            <div className="header-link">
              <a href="/lessons">Lekcje</a>
            </div>
            <div className="header-link">
              <a href="#">Pomóż</a>
            </div>
            <div className="header-link">
              <a href="/post-offer">Otrzymaj pomoc</a>
            </div>
            <div className="header-link">
              <a href="#">Chat grupowy</a>
            </div>
          </div>
        </div>
        <div className="header-user-pic">
          <a href="/dashboard">
            <div className="user-pic"></div>
          </a>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
