import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

function Noteitems(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title mx-2">{props.note.title}</h5>
              <i
                className="fa fa-pencil-square-o mx-1"
                aria-hidden="true"
                onClick={() => props.editNote(props.note)}
              ></i>
              <i
                className="fa fa-trash-o mx-1"
                aria-hidden="true"
                onClick={() => deleteNote(props.note._id)}
              ></i>
            </div>
            <p className="card-text">{props.note.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Noteitems;
