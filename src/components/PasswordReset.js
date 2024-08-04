import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PasswordReset.css'; // Asegúrate de crear este archivo CSS

const PasswordReset = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

  

    const handleSendEmail = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Email de restablecimiento enviado. Por favor, revisa tu bandeja de entrada.');
            setError('');
        } catch (error) {
            console.error('Error al enviar el email de restablecimiento:', error);
            setError('Error al enviar el email. Por favor, revisa el email ingresado.');
            setMessage('');
        }
    };

    return (
        <div className="password-reset-overlay">
            <div className="password-reset-form bg-white p-4 rounded">
                <h2>Restablecer Contraseña</h2>
                <form onSubmit={handleSendEmail}>
                    <div className="form-group">
                        <label htmlFor="reset-email">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="reset-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">Enviar Email de Restablecimiento</button>
                </form>
                {message && <p className="text-success mt-3">{message}</p>}
                {error && <p className="text-danger mt-3">{error}</p>}
                <button className="btn btn-link" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default PasswordReset;
