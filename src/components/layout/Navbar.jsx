import React from "react";
import PropTypes from "prop-types";

const Navbar=(props)=> {
    return (
      <nav className="navbar bg-primary">
        <h1>
          <i className={props.icon} />
           {props.title}
        </h1>
      </nav>
    );
};
 
Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};
export default Navbar;
