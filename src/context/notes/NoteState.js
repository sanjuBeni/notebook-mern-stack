import React,{ useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) =>{
    const notesAPI = [
        {
          "_id": "6326b7ad2fe574d40e5d4629",
          "user": "6326b7512fe574d40e5d4623",
          "title": "Add a update note",
          "description": "This note update new data about aws.",
          "tag": "Tag is also update",
          "date": "2022-09-18T06:16:13.166Z",
          "__v": 0
        }
      ];

    const [notes, setNotes]   = useState(notesAPI);

    // Add a note

    const addNote = (noteData) =>{
      // API call 
      console.log(noteData);
      // let note = null;
      // setNotes(notes.push(note));
    }

    // Update a note

    const updateNote = (id) =>{

    }

    // Delete a node

    const deleteNote = (id) =>{

    }

    return (
        <noteContext.Provider value={{notes, addNote, updateNote, deleteNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;