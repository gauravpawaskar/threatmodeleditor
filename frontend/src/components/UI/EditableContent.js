import { Fragment, useState } from "react";

const EditableContent = (props) => {
  const [threatValue, setThreatValue] = useState(props.content);

  const onEditHandler = (event) => {
    setThreatValue(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFinalThreatEdit(threatValue, props.schemaName);
  };
  return (
    <Fragment key={props.content.id}>
      {!props.editing && threatValue}
      {props.editing && props.editingID !== props.schemaName && threatValue}
      {props.editing && props.editingID === props.schemaName && (
        <form onSubmit={onSubmitHandler}>
          <input
            autoFocus
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
