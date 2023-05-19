import { Fragment } from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>Threat Model</header>
    </Fragment>
  );
};

export default Header;
