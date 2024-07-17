import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './loginRegister.css';

const LoginRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Lógica de inicio de sesión aquí
        console.log('Iniciar sesión con:', email, password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        // Lógica de registro aquí
        console.log('Registrar usuario con:', registerEmail, registerPassword);
    };

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                console.log(result.user);
                navigate('/inicio');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 mb-4">
                        <h2 className="text-center">Registrarse</h2>
                        <form onSubmit={handleRegister}>
                            <div className="form-group">
                                <label htmlFor="registerEmail">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="registerEmail"
                                    value={registerEmail}
                                    onChange={(e) => setRegisterEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="registerPassword">Contraseña:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="registerPassword"
                                    value={registerPassword}
                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                        </form>
                    </div>

                    <div className="card p-4">
                        <h2 className="text-center">Iniciar Sesión</h2>
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                        </form>
                        <hr />
                        <div className="d-flex justify-content-center">
                            <button onClick={handleGoogleLogin} className="btn btn-danger">
                                <img
                                    src="https://developers.google.com/identity/images/g-logo.png"
                                    alt="Google logo"
                                    width="20"
                                    height="20"
                                    className="me-2"
                                />
                                Iniciar sesión con Google
                            </button>
                        </div>
                        <p className="mt-3 text-center">
                            ¿No tienes cuenta? <Link to="#">Regístrate arriba </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
