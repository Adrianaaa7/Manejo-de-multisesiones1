import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Register from './register';
import PasswordReset from './PasswordReset'; // Import the PasswordReset component
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';
import GoogleButton from 'react-google-button';
import Fondo1Image from '../Images/Fondo1.jpg'; 

function Login() {
    const [showRegister, setShowRegister] = useState(false);
    const [showPasswordReset, setShowPasswordReset] = useState(false); // State for toggling PasswordReset
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result.user);
            navigate('/inicio');
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user);
            navigate('/inicio');
        } catch (error) {
            console.error('Error al iniciar sesión con correo y contraseña:', error);
            setError('Credenciales incorrectas. Por favor, revisa tu email y contraseña.');
        }
    };

    const toggleRegister = () => {
        setShowRegister(!showRegister);
    };

    const togglePasswordReset = () => {
        setShowPasswordReset(!showPasswordReset); // Toggle the PasswordReset component
    };

    const handleRegistrationSuccess = () => {
        setShowRegister(false);
        setRegistrationSuccess(true);
    };

    return (
        <div
            className="bg-primary container-fluid d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: `url(${Fondo1Image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
            }}
        >
            <div className="bg-dark opacity-75 p-5 text-center rounded">
                <h1 className="text-light">Inicio</h1>
                {registrationSuccess && (
                    <div className="alert alert-success" role="alert">
                        Registro exitoso :)
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleEmailLogin}>
                    <div className="form-group">
                        <label className="text-light" htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-light" htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <input type="submit" className="btn btn-primary mt-3" value="Iniciar" />
                </form>
                <hr />
                <div className="d-flex justify-content-center">
                    <GoogleButton onClick={handleGoogleLogin} />
                </div>
                <p className="mt-3 text-center">
                 <button className="btn btn-link" onClick={toggleRegister}>Crea una cuenta</button>
                </p>
                <p className="mt-3 text-center">
                            <button className="btn btn-link" onClick={togglePasswordReset}>¿Has olvidado tu contraseña?</button> {/* Add password reset button */}
                        </p>
            </div>
            {showRegister && (
                <div className="register-overlay">
                    <Register onSuccess={handleRegistrationSuccess} />
                </div>
            )}
            {showPasswordReset && ( // Conditionally render the PasswordReset component
                <PasswordReset onClose={togglePasswordReset} />
            )}
        </div>
    );
}

export default Login;
