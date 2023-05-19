import Modal from "../UI/Modal";

const NewThreat = (props) => {
  let ThreatName = "";
  let ThreatMitigation = "";
  // * 3 Add new variable to hold value of new column

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddThreat({
      id: Math.floor(Math.random() * 1000).toString(),
      threat: ThreatName,
      mitigate: ThreatMitigation,
      // * 5 add new key for columd and assign new variable value
    });
    props.onClose();
  };

  const threatNameHandler = (event) => {
    ThreatName = event.target.value;
  };

  const threatMitigationHandler = (event) => {
    ThreatMitigation = event.target.value;
  };

  // * 4 add handler for new column and update respective variable value

  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={submitHandler}>
        <label>Threat</label>
        <input type="text" onChange={threatNameHandler}></input>
        <label>Mitigation</label>
        <input type="text" onChange={threatMitigationHandler}></input>
        {/* * 1 add lable input type.
         * 2 add onChange handler */}
        <input type="submit" value="Add Threat"></input>
      </form>
    </Modal>
  );
};

export default NewThreat;
