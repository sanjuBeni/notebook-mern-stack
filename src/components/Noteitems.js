import React from "react";

function Noteitems(props) {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.note.title}</h5>
          <p className="card-text">{props.note.description}</p>
          <i className="fa fa-pencil-square-o mx-1" aria-hidden="true"></i>
          <i className="fa fa-trash-o mx-1" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
}

export default Noteitems;
