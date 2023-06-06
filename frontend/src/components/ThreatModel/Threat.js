import { useState } from "react";
import EditableContent from "../UI/EditableContent";

const Threat = (props) => {
  const ThreatConfig = require("../../Assets/Columns.json");
  const [editingThreat, setEditingThreat] = useState(false);
  const [editingId, setEditingID] = useState("");

  const initialState = (PropThreat) => {
    let initialStateValue = { id: PropThreat.id };
    ThreatConfig["schema"].map(
      (schemaItem) =>
        (initialStateValue[schemaItem["schemaName"]] =
          PropThreat[schemaItem["schemaName"]])
    );
    return initialStateValue;
  };

  const [currentThreat, setThreat] = useState(initialState(props.threat));

  const theatClickHandler = (event) => {
    setEditingID(event.target.id);
    setEditingThreat(true);
  };

  const threatEditHandler = (updateValue, schemaName) => {
    let updatedThreat = currentThreat;
    updatedThreat[schemaName] = updateValue;
    props.onThreatUpdate(updatedThreat);
    setThreat(updatedThreat);
    setEditingID("");
    setEditingThreat(false);
  };

  return (
    <tr>
      {ThreatConfig["schema"].map((schemaItem) => (
        <td
          id={schemaItem["schemaName"]}
          key={schemaItem["schemaName"]}
          onClick={theatClickHandler}
        >
          <EditableContent
            key={props.threat.id + Math.random()}
            keyValue={props.threat.id}
            editing={editingThreat}
            editingID={editingId}
            content={currentThreat[schemaItem["schemaName"]]}
            schemaName={schemaItem["schemaName"]}
            type="text"
            onFinalThreatEdit={threatEditHandler}
          />
        </td>
      ))}
    </tr>
  );
};

export default Threat;
