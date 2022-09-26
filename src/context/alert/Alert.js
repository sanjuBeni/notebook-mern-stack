import React from "react";

export default function Alert(props) {
  return (
    <div className="mb-2" style={{ height: "50px" }}>
      {props.alert && (
        <div className={`alert alert-${props.alert.type}`} role="alert">
          {props.alert.msg}
        </div>
      )}
    </div>
  );
}
