import React from "react";

export default function Alert(props) {
  return (
    <div>
      {props.alert && (
        <div className={`alert alert-${props.alert.type}`} role="alert">
          {props.alert.message}—check it out!
        </div>
      )}
    </div>
  );
}
