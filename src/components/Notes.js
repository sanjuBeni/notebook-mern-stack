import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import Noteitems from "./Noteitems";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, fetchNotes, updateNote } = context;
  useEffect(() => {
    localStorage.getItem("token") ? fetchNotes() : navigate("/login");
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: null,
    title: "",
    description: "",
    tag: "",
  });

  const editNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
  };

  const handleEdit = () => {
    // e.preventDefault();
    updateNote(note.id, note.title, note.description, note.tag);
    refClose.current.click();
    props.showAlert("Note update successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        // tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                    value={note.title}
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
                    value={note.description}
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
                    value={note.tag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.title < 3 || note.description < 5}
                type="button"
                className="btn btn-primary"
                onClick={handleEdit}
              >
                Edit Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <h2>Your's Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && "Note is not available."}
        </div>
        {notes.map((note) => {
          return <Noteitems key={note._id} editNote={editNote} note={note} />;
        })}
      </div>
    </>
  );
}
