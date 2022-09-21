import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

export default function AddNote() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note);
    // e.target.name = '';
  };

  const onChange = (e) => {
    setNote({...note, [e.target.name] : e.target.value});
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2>Add Note</h2>
          <form method="">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="desc" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                onChange={onChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleAddNote}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
