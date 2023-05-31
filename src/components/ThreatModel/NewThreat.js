import { Fragment } from "react";
import Modal from "../UI/Modal";

const NewThreat = (props) => {
  const ThreatConfig = require("../../Assets/Columns.json");
  let threatObj = { id: Math.floor(Math.random() * 1000).toString() };

  const submitHandler = (event) => {
    event.preventDefault();

    props.onAddThreat(threatObj);
    props.onClose();
  };

  const threatChangeHandler = (event) => {
    threatObj[event.target.id] = event.target.value;
  };

  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={submitHandler}>
        {ThreatConfig["schema"].map((schemaItem) => (
          <Fragment key={schemaItem["tableName"]}>
            <label>{schemaItem["tableName"]}</label>
            <input
              type={schemaItem["type"]}
              id={schemaItem["schemaName"]}
              onChange={threatChangeHandler}
            ></input>
          </Fragment>
        ))}
        <input type="submit" value="Add Threat"></input>
      </form>
    </Modal>
  );
};

export default NewThreat;
