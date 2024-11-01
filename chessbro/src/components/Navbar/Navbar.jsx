import React from "react";
import "./Navbar.css";
import Logo from "../../assets/branding/logo.png";
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 id="navbar_heading">
        <img src={Logo} id="logo" />
        ChessBro
      </h1>
      {/* // TODO decide navbar_links and further UI
      // ? sidebar or top navbar? */}
      {/* <div className="navbar_links">
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
      </div> */}
    </nav>
  );
};

export default Navbar;
