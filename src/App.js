import { Fragment, useReducer, useState } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import NewThreat from "./components/ThreatModel/NewThreat";
import Menu from "./components/Layout/Menu";
import Threat from "./components/ThreatModel/Threat";

const ACTIONS = {
  UPDATE_THREAT: "update_threat",
  ADD_THREAT: "add_threat",
  GET_GIT_THREAT: "git_threat",
};

function App() {
  const [showForm, setShowForm] = useState(false);

  const reducerHandler = (threats, action) => {
    switch (action.type) {
      case ACTIONS.UPDATE_THREAT: {
        const threatID = threats.findIndex(
          (obj) => obj.id === action.payload.id
        );
        const newThreats = [...threats];
        newThreats[threatID].threat = action.payload.threat;
        newThreats[threatID].mitigate = action.payload.mitigate;
        // * 14 update new coluhm key as per above line
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

  const addThreatHandler = (threat) => {
    dispatch({ type: ACTIONS.ADD_THREAT, payload: threat });
  };

  // To add new coloumn follow * comments in numerical sequense
  // 1-5 NewThreat.js
  // 6 ThreatTable.js
  // 7-13 Threat.js
  // 14 App.js

  const updatedThreatHandler = (threat) => {
    dispatch({ type: ACTIONS.UPDATE_THREAT, payload: threat });
  };

  const showAddThreat = () => {
    setShowForm(true);
  };

  const hideAddThreat = () => {
    setShowForm(false);
  };

  const gitPullHandler = (gitThreatModel) => {
    dispatch({ type: ACTIONS.GET_GIT_THREAT, payload: gitThreatModel });
  };

  return (
    <Fragment>
      <Header />
      <Menu onGitPull={gitPullHandler} />
      <table className="threattable">
        <thead>
          <tr>
            <th>Threat</th>
            <th>Mitigation</th>
          </tr>
        </thead>
        <tbody>
          {threats.map((threat) => (
            <Threat
              key={threat.id}
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
        <button className="addthreat" onClick={showAddThreat}>
          Add Threat
        </button>
      )}
    </Fragment>
  );
}

export default App;
