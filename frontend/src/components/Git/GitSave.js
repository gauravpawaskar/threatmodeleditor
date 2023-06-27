import Modal from "../UI/Modal";

const GitSave = (props) => {
  const saveThreatsFromGit = async (git_url, threats) => {
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
        threats: threats,
      }),
    };
    try {
      const fetchResponse = await fetch(`http://${location}/pushtm`, settings);
      const data = await fetchResponse.json();
      return data;
    } catch (e) {
      return e;
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const pushResponse = await saveThreatsFromGit(
      props.giturl,
      props.threats
    ).then((value) => {
      return value;
    });
    console.log(pushResponse);
    if (pushResponse["error"]) {
      props.onSaveError(pushResponse["error"]);
    }
    props.onClose();
  };
  return (
    <Modal onClose={props.onClose}>
      <p>{JSON.stringify(props.threats)}</p>
      <p>{props.giturl}</p>
      <form onSubmit={submitHandler}>
        <input type="submit" value="Save Threat Model"></input>
      </form>
    </Modal>
  );
};

export default GitSave;
