import React from "react";
import "./Hero.css";
import { motion } from "framer-motion";

const Hero = ({ InstructionRef }) => {
  const handleClick = () => {
    InstructionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="cta_container">
      <div className="cta_left_container">
        <div className="header">
          <h1>Unlock Financial Insights</h1>
        </div>
        <div className="intro">
          <p>
            Discover the Power of the Survey of Consumer Finance (SCF) and Make
            Informed Financial Decisions. Access a Wealth of Data on Income,
            Wealth, Debt, and more. Gain Deep Understanding, Identify Trends,
            and Plan for a Strong Financial Future.
          </p>
        </div>
        <div className="cta_button">
          <motion.button
            whileHover={{scale:1.1}}
            whileTap={{ scale: 0.9 }}
            transition={{ ease: "easeOut", duration: 1 }}
            onClick={handleClick}
          >
            Learn More
          </motion.button>
        </div>
      </div>

      <div className="right_container">
        <img src="/cta.png" className="hero_img" />
        <div className="background"></div>
      </div>
    </div>
  );
};

export default Hero;
