import Threat from "./Threat";
import classes from "./ThreatTable.module.css";

const ThreatTable = (props) => {
  const threatUpdateHandler = (threat) => {
    props.onThreatUpdate(threat);
  };
  return (
    <table className={classes.threattable}>
      <thead>
        <tr>
          <th>Threat</th>
          <th>Mitigation</th>
          {/* * 6 Add new Column name here */}
        </tr>
      </thead>
      <tbody>
        {props.threats.map((threat) => (
          <Threat
            key={threat.id}
            threat={threat}
            onThreatUpdate={threatUpdateHandler}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ThreatTable;
