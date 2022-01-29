import React, { useContext, useState } from 'react';
import noteContext from '../contexts/notes/noteContext';

export default function AddNote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""});

    const handleClick = (e) => {
        e.preventDefault(); // prevents page reload
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        props.showAlert('Note Added Successfully.');
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (
        <>
            <div className="container">
                <h5 className='my-3'>Add Notes</h5>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required/>
                    </div><div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} minLength={5} required/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </>
    );
}
