import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer_container">
      <Link to="/" className="navlink">Home</Link>
      <Link to="/analyticsPage" className="navlink">Analysis</Link>
      <Link to="/exploreData" className="navlink">Explore Data</Link>
      <Link to="/about" className="navlink">About</Link>
      <p className="copyright">
        © 2022-2023 MySCFAnalysis.com. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
