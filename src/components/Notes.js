import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import Noteitems from "./Noteitems";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes } = context;
  return (
    <>
      <AddNote />
      <div className="row my-5">
        <h2>Your's Notes</h2>
        <div className="col-md-3 my-3">
          {notes.map((note) => {
            return <Noteitems key={note._id} note={note} />;
          })}
        </div>
      </div>
    </>
  );
}
