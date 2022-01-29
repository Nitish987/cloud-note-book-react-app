import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
    }, [location]);

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">CloudNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <div className="d-flex">
                            {!localStorage.getItem('token') ? <Link className="btn btn-outline-success mx-1" to="/login">Login</Link> : ''}
                            {!localStorage.getItem('token') ? <Link className="btn btn-outline-success" to="/signup">Signup</Link> : ''}
                            {localStorage.getItem('token') ? <button className="btn btn-outline-success" onClick={logout}>Logout</button> : ''} 
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
