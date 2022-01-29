import React, { useContext } from 'react';
import noteContext from '../contexts/notes/noteContext';

export default function NoteItem(props) {
    const { note, updatenote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const handleClick = () => {
        deleteNote(note._id);
        props.showAlert('Note Deleted Successfully');
    }

    const editnoteClick = () => {
        updatenote(note);
    }

    return (
        <div className="col-md-3 mt-3">
            <div className="card">
                <div className="card-body">
                    <h6 className="card-title">{note.title}</h6>
                    <p className="card-text">{note.description}</p>
                    <button type="button" className="btn btn-outline-danger" onClick={handleClick}>Delete</button>
                    <button type="button" className="btn btn-primary mx-2" onClick={editnoteClick}>Edit</button>
                </div>
            </div>
        </div>
    );
}
