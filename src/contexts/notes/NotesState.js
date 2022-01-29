import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    let host = process.env.HOST;
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    // Get note
    const getNotes = async () => {
        const response = await fetch(`${host}/notes/api/fetchnotes`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        setNotes(json);
    }

    // Add note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/notes/api/addnote`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        setNotes(notes.concat(json));
    }

    // delete note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/notes/api/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        console.log(json);

        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);
    }

    // edit note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/notes/api/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }

        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;