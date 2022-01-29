import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
    const navigate = useNavigate();
    const [value, setValue] = useState({ name: '', email: '', password: '' });

    const onChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    }

    const signup = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.HOST}/auth/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: value.name, email: value.email, password: value.password })
        });
        const json = await response.json();

        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate('/');
        } else {
            props.showAlert(json.message);
        }

        setValue({ name: '', email: '', password: '' });
    }

    return (
        <div className="container">
            <h5 className='my-3'>Signup</h5>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={value.name} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={value.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={value.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={signup}>Create Account</button>
            </form>
        </div>
    );
}
