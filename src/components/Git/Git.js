import Modal from "../UI/Modal";

let gitUrl = "";

const Git = (props) => {
  const gitUrlHandler = (event) => {
    gitUrl = event.target.value;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.pullGitUrl(gitUrl);
    props.onClose();
  };
  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={submitHandler}>
        <label>Git URL</label>
        <input type="text" onChange={gitUrlHandler}></input>
        <input type="submit" value="Pull Threat Model"></input>
      </form>
    </Modal>
  );
};

export default Git;
