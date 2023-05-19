import { Fragment, useState } from "react";

const EditableContent = (props) => {
  const [threatValue, setThreatValue] = useState(props.content);

  const onEditHandler = (event) => {
    setThreatValue(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFinalThreatEdit(threatValue, props.keyValue);
  };
  return (
    <Fragment>
      {!props.editing && threatValue}
      {props.editing && (
        <form onSubmit={onSubmitHandler}>
          <input
            type={props.type}
            defaultValue={threatValue}
            onChange={onEditHandler}
          />
        </form>
      )}
    </Fragment>
  );
};

export default EditableContent;
