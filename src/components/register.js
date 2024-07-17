import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            console.log(result.user);
            onSuccess();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register-form bg-white p-4 rounded">
            <h2>Registro</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="register-email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="register-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="register-password">Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="register-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="register-confirm-password">Confirmar Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="register-confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary w-100">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
