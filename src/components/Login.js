import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    const navigate = useNavigate();
    const [value, setValue] = useState({ email: '', password: '' });

    const onChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    }

    const login = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.HOST}/auth/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: value.email, password: value.password })
        });
        const json = await response.json();
        
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate('/');
        } else {
            props.showAlert('Unvalid login credentials');
        }

        setValue({ email: '', password: '' });
    }

    return (
        <div className="container">
            <h5 className='my-3'>Login</h5>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={value.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={value.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={login}>Login</button>
            </form>
        </div>
    );
}
