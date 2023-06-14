import Modal from "./Modal";

const Error = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <p>{props.message}</p>
    </Modal>
  );
};

export default Error;
