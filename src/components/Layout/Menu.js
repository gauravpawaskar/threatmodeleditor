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

  const getThreatsFromGit = async (git_url) => {
    console.log(git_url);
    const location = "localhost:5000";
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        git_url: git_url,
      }),
    };
    try {
      const fetchResponse = await fetch(`http://${location}/gettm`, settings);
      const data = await fetchResponse.json();
      return data;
    } catch (e) {
      return e;
    }
  };

  const gitUrlHandler = async (gitUrl) => {
    // Pull data from git url and send json to following function
    //make sure it is array for json objects
    const threatModel = await getThreatsFromGit(gitUrl).then((value) => {
      return value;
    });
    props.onGitPull(threatModel, gitUrl);
  };

  return (
    <div className={classes.menu}>
      {showGit && <Git pullGitUrl={gitUrlHandler} onClose={hideGitPullForm} />}
      <button onClick={showGitPullForm}>Git link</button>
    </div>
  );
};

export default Menu;
