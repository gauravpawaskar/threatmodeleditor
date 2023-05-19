import { useState } from "react";
import classes from "./Menu.module.css";
import Git from "../Git/Git";

const Menu = (props) => {
  const [showGit, setShowGit] = useState(false);

  const showGitPullForm = () => {
    setShowGit(true);
  };

  const hideGitPullForm = () => {
    setShowGit(false);
  };

  const gitUrlHandler = (gitUrl) => {
    // Pull data from git url and send json to following function
    //make sure it is array for json objects
    const dummyThreat = [{ id: "1", threat: "test", mitigate: "test" }];
    props.onGitPull(dummyThreat);
  };

  return (
    <div className={classes.menu}>
      {showGit && <Git pullGitUrl={gitUrlHandler} onClose={hideGitPullForm} />}
      <button onClick={showGitPullForm}>Git link</button>
    </div>
  );
};

export default Menu;
