import React, { useState } from 'react';
import app from '../firebaseconfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const auth = getAuth(app);
const db = getDatabase(app);

function Login() {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    async function submitHandler(e) {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            // Autenticar al usuario
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            // Obtener datos del usuario desde Firebase
            const userRef = ref(db, `users/${userId}`);
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userRole = userData.rol;

                // Redirigir según el correo
                if (email === 'admin_aula_magna_ucr@example.com') {
                    navigate('/AdminAulaMagnaUCRView');
                } else if (email === 'recepcionist_aula_magna_ucr@example.com') {
                    navigate('/RecepcionistAulaMagnaUCR');
                } else if (email === 'admin_centro_artes_tec@example.com') {
                    navigate('/AdminCentroArtesTECView');
                } else if (email === 'recepcionist_centro_artes_tec@example.com') {
                    navigate('/RecepcionistCentroArtesTEC');
                } else if (email === 'admin_centro_artes_una@example.com') {
                    navigate('/AdminCentroArtesUNAView');
                } else if (email === 'recepcionist_centro_artes_una@example.com') {
                    navigate('/RecepcionistCentroArtesUNA');
                } else if (email === 'admin_teatro_melico_salazar@example.com') {
                    navigate('/AdminTeatroMelicoSalazarView');
                } else if (email === 'recepcionist_teatro_melico_salazar@example.com') {
                    navigate('/RecepcionistTeatroMelicoSalazar');
                } else if (email === 'admin_teatro_nacional@example.com') {
                    navigate('/AdminTeatroNacionalView');
                } else if (email === 'recepcionist_teatro_nacional@example.com') {
                    navigate('/RecepcionistTeatroNacional');
                } else if (userRole === 'vipuser') {
                    navigate('/VIPUserView');
                } else if (userRole === 'user') {
                    navigate('/UserView');
                } else {
                    setErrorMessage('Correo no reconocido para ningún rol.');
                }

                setSuccessMessage('Inicio de sesión exitoso.');
            } else {
                setErrorMessage('No se encontraron datos del usuario.');
            }
        } catch (error) {
            setErrorMessage('Error en el inicio de sesión: ' + error.message);
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Iniciar sesión</h1>
                <form onSubmit={submitHandler}>
                    <label>
                        Correo electrónico:
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        Contraseña:
                        <input type="password" name="password" required />
                    </label>
                    <Button type="submit" variant="primary">
                        Iniciar sesión
                    </Button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
        </div>
    );
}

export default Login;





