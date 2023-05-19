import { useState } from "react";
import EditableContent from "../UI/EditableContent";

const Threat = (props) => {
  const [editingThreat, setEditingThreat] = useState(false);
  const [editingMitigate, setEditingMitigate] = useState(false);
  // * 8 add new state to enable updating
  const [currentThreat, setThreat] = useState(props.threat.threat);
  const [currentMitigation, setMitigation] = useState(props.threat.mitigate);
  // * 9 add new state to capture updated value

  const theatClickHandler = () => {
    setEditingThreat(true);
  };

  const mitigateClickHandler = () => {
    setEditingMitigate(true);
  };

  // * 10 add new handlerto set true column is being edited

  const threatEditHandler = (threat, id) => {
    let updatedTreat = {
      id: id,
      threat: threat,
      mitigate: props.threat.mitigate,
      // * 12 add new key and set to props.threat.newcolumn. Everytime you add new column, add new line for it
    };
    props.onThreatUpdate(updatedTreat);
    setThreat(threat);
    setEditingThreat(false);
  };

  const mitigateEditHandler = (mitigate, id) => {
    let updatedTreat = {
      id: id,
      threat: props.threat.threat,
      mitigate: mitigate,
      // * 13 add new key and set to props.threat.newcolumn. Everytime you add new column, add new line for it
    };
    props.onThreatUpdate(updatedTreat);
    setMitigation(mitigate);
    setEditingMitigate(false);
  };

  // * 11 Create handler to send final value up
  // use respective column and id
  // update respective key
  // Follow above handler pattern and call functions accordingly

  return (
    <tr>
      <td onClick={theatClickHandler}>
        <EditableContent
          keyValue={props.threat.id}
          editing={editingThreat}
          content={currentThreat}
          type="text"
          onFinalThreatEdit={threatEditHandler}
        />
      </td>
      <td onClick={mitigateClickHandler}>
        <EditableContent
          keyValue={props.threat.id}
          editing={editingMitigate}
          content={currentMitigation}
          type="text"
          onFinalThreatEdit={mitigateEditHandler}
        />
      </td>
      {/* * 7 Add new div give onClick handler */}
    </tr>
  );
};

export default Threat;
