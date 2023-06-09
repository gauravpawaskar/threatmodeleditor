import { Fragment, useReducer, useState } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import NewThreat from "./components/ThreatModel/NewThreat";
import Menu from "./components/Layout/Menu";
import Threat from "./components/ThreatModel/Threat";
import GitSave from "./components/Git/GitSave";
import Error from "./components/UI/Error";

const ACTIONS = {
  UPDATE_THREAT: "update_threat",
  ADD_THREAT: "add_threat",
  GET_GIT_THREAT: "git_threat",
};

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showGitSave, setShowGitSave] = useState(false);
  const [gitUrl, setGitUrl] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const ThreatConfig = require("./Assets/Columns.json");

  const reducerHandler = (threats, action) => {
    switch (action.type) {
      case ACTIONS.UPDATE_THREAT: {
        const threatID = threats.findIndex(
          (obj) => obj.id === action.payload.id
        );
        const newThreats = [...threats];
        ThreatConfig["schema"].forEach((schemaItem) => {
          newThreats[threatID][schemaItem["schemaName"]] =
            action.payload[schemaItem["schemaName"]];
        });
        return newThreats;
      }
      case ACTIONS.ADD_THREAT: {
        return [...threats, action.payload];
      }
      case ACTIONS.GET_GIT_THREAT: {
        return action.payload;
      }
      default:
        return threats;
    }
  };

  const [threats, dispatch] = useReducer(reducerHandler, []);

  const showGitSaveForm = () => {
    setShowGitSave(true);
  };

  const hideGitSaveForm = () => {
    setShowGitSave(false);
  };

  const addThreatHandler = (threat) => {
    dispatch({ type: ACTIONS.ADD_THREAT, payload: threat });
  };

  const updatedThreatHandler = (threat) => {
    dispatch({ type: ACTIONS.UPDATE_THREAT, payload: threat });
  };

  const showAddThreat = () => {
    setShowForm(true);
  };

  const hideAddThreat = () => {
    setShowForm(false);
  };

  const gitPullHandler = (gitThreatModel, git_url) => {
    console.log(JSON.stringify(gitThreatModel));
    if (gitThreatModel["error"]) {
      setError(gitThreatModel["error"]);
      setShowError(true);
    } else {
      setGitUrl(git_url);
      dispatch({ type: ACTIONS.GET_GIT_THREAT, payload: gitThreatModel });
    }
  };

  const hideErrorHandler = () => {
    setShowError(false);
    setError("");
  };

  const saveErrorHandler = (error) => {
    setError(error);
    setShowError(true);
  };

  return (
    <Fragment>
      <Header />
      <Menu onGitPull={gitPullHandler} />
      <table className="table">
        <thead>
          <tr>
            {ThreatConfig["schema"].map((schemaItem) => (
              <th key={schemaItem["tableName"]}>{schemaItem["tableName"]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {threats.map((threat) => (
            <Threat
              key={threat.id + Math.random()}
              threat={threat}
              onThreatUpdate={updatedThreatHandler}
            />
          ))}
        </tbody>
      </table>
      {showForm && (
        <NewThreat onAddThreat={addThreatHandler} onClose={hideAddThreat} />
      )}
      {!showForm && (
        <button className="button" onClick={showAddThreat}>
          Add Threat
        </button>
      )}
      {showGitSave && (
        <GitSave
          threats={threats}
          onSaveError={saveErrorHandler}
          giturl={gitUrl}
          onClose={hideGitSaveForm}
        />
      )}
      {showError && <Error message={error} onClose={hideErrorHandler} />}
      <button className="button" onClick={showGitSaveForm}>
        Save TM
      </button>
    </Fragment>
  );
}

export default App;
