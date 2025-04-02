import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [menuShown, setMenuShown] = useState(false)

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  const showMenu = () => {
    setMenuShown(true);
  };

  const hideMenu = () => {
    setMenuShown(false);
  };

  return (
    <header className={`header ${menuShown ? "active" : ""}`}>
      <nav>
        <div onClick={showMenu} className="burger-button active">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
          <div className="line line-3"></div>
        </div>
        <div className="mobile-menu">
        <img
          src="/x.png"
          alt="Close menu"
          className="close-button"
          onClick={hideMenu}
        />
          <Link className="menu-item" onClick={hideMenu} to="/">Home</Link>
          <Link className="menu-item" onClick={hideMenu} to="/posts/add">
            Create Post
          </Link>
          <Link className="menu-item" onClick={hideMenu} to="/profile/edit">Edit Profile</Link>
          <button className="menu-item" onClick={() => {logout(); hideMenu()}}>Logout</button>
        </div>
      </nav>
    </header>
  );
}
