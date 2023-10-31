import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

    const options = [
      {
        value: "home",
        label: "Home",
        to: "/",
      },
      {
        value: "analysis",
        label: "Analysis",
        to: "/analyticsPage",
      },
      {
        value: "exploreData",
        label: "Explore Data",
        to: "/exploreData",
      },
      {
        value: "about",
        label: "About",
        to: "/about",
      },
    ];

    const handleSelectChange = (selectedOption) => {
      if (selectedOption && selectedOption.value) {
        navigate(selectedOption.to);
      }
      setActiveLink(selectedOption.value)
    };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: "2rem",
      backgroundColor: "#ebf4f8",
      border: "none",
      boxShadow: state.isFocused ? "none" : base.boxShadow,
    }),
    menu: (provided) => ({
      ...provided,
      overflow: "hidden",
      borderRadius: "2rem",
      backgroundColor: "#ebf4f8",
      paddingTop: 0,
      paddingBottom: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected 
      ? "white" : state.isFocused
      ? 'white'
      : "#7c9cbf",
      backgroundColor: state.isSelected
        ? "#0e518e"
        : state.isFocused
        ? "#0e518e"
        : "transparent",
      textAlign: "center", // Center the text
      cursor: "pointer", // Change cursor to pointer
    }),
    input: (base) => ({
      ...base,
      color: "#7c9cbf", // Set the text color for the selected value
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#7c9cbf !important", // Add !important to ensure the color is applied
    }),
    menuList: (provided) => ({
      ...provided,
      paddingTop: "0",
      paddingBottom: "0",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "none",
      color: "#7c9cbf",
      "&:hover": {
        color: "#0e518e", // White color on hover
      },
    }),
    indicatorSeparator: () => null,
    valueContainer: (base) => ({
      ...base,
      padding: "1.25rem 3rem",
    }),
    optionLabel: (provided) => ({
      ...provided,
      cursor: "pointer",
    }),
  };
  

  

  const [activeLink, setActiveLink] = useState("home");

  const defaultValue = options.find((option) => option.value === activeLink);

  const handleNavClick = (link) => {
    setActiveLink(link); // Set the active link when clicked
  };

  useEffect(() => {
    // Get references to the .active and li elements
    const activeLinkElement = document.querySelector(".navlink.active li");
    const liElements = document.querySelectorAll(
      ".nav .navlink:not(.active) li"
    );

    // Function to change the color of the active link to black
    const changeActiveLinkColor = () => {
      activeLinkElement.style.color = "#7C9CBF";
    };

    // Add event listeners to li elements
    liElements.forEach((liElement) => {
      liElement.addEventListener("mouseenter", changeActiveLinkColor);
      liElement.addEventListener("mouseleave", () => {
        if (activeLinkElement) {
          activeLinkElement.style.color = "white"; // Reset color to its original state
        }
      });
    });

    // Clean up event listeners when the component unmounts
    return () => {
      liElements.forEach((liElement) => {
        liElement.removeEventListener("mouseenter", changeActiveLinkColor);
        liElement.removeEventListener("mouseleave", () => {
          if (activeLinkElement) {
            activeLinkElement.style.color = ""; // Reset color to its original state
          }
        });
      });
    };
  }, [activeLink]);

  useEffect(() => {
    // Determine the active link based on the current URL
    const currentPath = location.pathname;
    const activeOption = options.find((option) => option.to === currentPath);
    if (activeOption) {
      setActiveLink(activeOption.value);
    }
  }, [location.pathname]);

  const Nav = () => (
    <ul className="nav">
      <Link
        to="/"
        className={`navlink home ${activeLink === "home" ? "active" : ""}`}
        onClick={() => handleNavClick("home")}
      >
        <li className="nav-text">Home</li>
      </Link>
      <Link
        to="/analyticsPage"
        className={`navlink analysis ${
          activeLink === "analysis" ? "active" : ""
        }`}
        onClick={() => handleNavClick("analysis")}
      >
        <li className="nav-text">Analysis</li>
      </Link>
      <Link
        to="/exploreData"
        className={`navlink exploreData ${
          activeLink === "exploreData" ? "active" : ""
        }`}
        onClick={() => handleNavClick("exploreData")}
      >
        <li className="nav-text">Explore Data</li>
      </Link>
      <Link
        to="/about"
        className={`navlink about ${activeLink === "about" ? "active" : ""}`}
        onClick={() => handleNavClick("about")}
      >
        <li className="nav-text">About</li>
      </Link>
      {/* <li>
        <div className='nav-text'>Search</div>
      </li>
      <li>
        <div className='nav-text'>EN</div>
      </li> */}
      <div className="animation"></div>
    </ul>
  );

  return (
    <nav>
      <div className="logo_container">
        <div>SCF</div>
      </div>
      <div className="nav_container">
        <Nav />
      </div>
      <div className="nav_container_mobile">
        <Select
          className="navbar_select"
          styles={customStyles}
          value={defaultValue}
          options={options}
          isSearchable={false}
          onChange={handleSelectChange}
        />
      </div>
    </nav>
  );
};

export default Navbar;
