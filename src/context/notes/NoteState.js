import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const hostName = "http://localhost:5000";

  const [notes, setNotes] = useState([]);

  // Fetch all notes

  const fetchNotes = async () => {
    // API call
    const url = `${hostName}/api/notes/allnotes`;
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      const jsonData = await response.json();
      // console.log(jsonData);
      setNotes(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  // Add a note

  const addNote = async (noteData) => {
    // API call
    const url = `${hostName}/api/notes/addnote`;
    const authToken = localStorage.getItem("token");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify(noteData),
    });
    const jsonData = await response.json();
    setNotes(notes.concat(noteData));
    console.log(jsonData);
  };

  // Update a note

  const updateNote = async (id, title, description, tag) => {
    // API Call

    const url = `${hostName}/api/notes/editnote/${id}`;
    const authToken = localStorage.getItem("token");
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const jsonData = await response.json();
    console.log(jsonData);
    let newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  };

  // Delete a node

  const deleteNote = async (id) => {
    // API call

    const url = `${hostName}/api/notes/deletenote/${id}`;
    const authToken = localStorage.getItem("token");
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });

    const jsonData = await response.json();
    console.log(jsonData);
    let newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, fetchNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
