import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../contexts/notes/noteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate('/login');
        }
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });

    const updatenote = (currentnote) => {
        ref.current.click();
        setNote({
            id: currentnote._id,
            title: currentnote.title,
            description: currentnote.description,
            tag: currentnote.tag
        });
    }

    const handleClick = (e) => {
        editNote(note.id, note.title, note.description, note.tag);
        refClose.current.click();
        props.showAlert('Note Edited Successfully.');
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className="container">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} style={{ display: 'none' }}></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required />
                                </div><div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <h5 className='my-3'>My Notes</h5>
            {notes.length === 0 && <p>No Notes are available</p>}
            <div className="row">
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updatenote={updatenote} showAlert={props.showAlert} />;
                })}
            </div>
        </div>
    );
}
