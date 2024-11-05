import React, { useState } from 'react';
import app from '../firebaseconfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, get, update } from "firebase/database";
import Button from 'react-bootstrap/Button';
import './Login.css';

const auth = getAuth(app);
const db = getDatabase(app);

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    async function userregister(email, password, rol) {
        try {
            const infoUser = await createUserWithEmailAndPassword(auth, email, password);
            const userRef = ref(db, "users/" + infoUser.user.uid);
            await set(userRef, { correo: email, rol: rol, compras: 0 }); 
            setSuccessMessage('Usuario registrado exitosamente.');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            setSuccessMessage('');
        }
    }

    async function submitHandler(e) {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        if (isRegistering) {
            userregister(email, password, 'user');
        } else {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const userId = userCredential.user.uid;

                const userRef = ref(db, `users/${userId}`);
                const snapshot = await get(userRef);

                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const userRole = userData.rol;
                    const auditorio = userData.auditorio;
                    const compras = userData.compras || 0;  

                    
                    if (compras >= 5 && userRole !== 'VIP') {
                        await update(userRef, { rol: 'VIP' });
                        window.location.href = '/VIPUserView';
                        return;
                    }
                    
                    if (userRole === 'VIP') {
                        window.location.href = '/VIPUserView';
                    } else if (userRole === 'admin') {
                        switch (auditorio) {
                            case 'Aula Magna UCR':
                                window.location.href = '/AdminView';
                                break;
                            case 'Centro para las Artes UNA':
                                window.location.href = '/AdminCentroArtesUNA';
                                break;
                            case 'Centro para las Artes TEC':
                                window.location.href = '/AdminCentroArtesTEC';
                                break;
                            case 'Teatro Melico Salazar':
                                window.location.href = '/AdminTeatroMelicoSalazar';
                                break;
                            case 'Teatro Nacional':
                                window.location.href = '/AdminTeatroNacional';
                                break;
                            default:
                                setErrorMessage('Auditorio no reconocido.');
                        }
                    } else if (userRole === 'recepcionist') {
                        switch (auditorio) {
                            case 'Aula Magna UCR':
                                window.location.href = '/RecepcionistAulaMagnaUCR';
                                break;
                            case 'Centro para las Artes UNA':
                                window.location.href = '/RecepcionistCentroArtesUNA';
                                break;
                            case 'Centro para las Artes TEC':
                                window.location.href = '/RecepcionistCentroArtesTEC';
                                break;
                            case 'Teatro Melico Salazar':
                                window.location.href = '/RecepcionistTeatroMelicoSalazar';
                                break;
                            case 'Teatro Nacional':
                                window.location.href = '/RecepcionistTeatroNacional';
                                break;
                            default:
                                setErrorMessage('Auditorio no reconocido.');
                        }
                    } else {
                        window.location.href = '/UserView';
                    }
                    
                    setSuccessMessage('Inicio de sesión exitoso.');
                    setErrorMessage('');
                } else {
                    setErrorMessage('No se encontró el rol del usuario.');
                }
            } catch (error) {
                setErrorMessage('Error en el inicio de sesión: ' + error.message);
                setSuccessMessage('');
            }
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>{isRegistering ? "Registrarse" : "Iniciar sesión"}</h1>

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
                        {isRegistering ? "Registrarse" : "Iniciar sesión"}
                    </Button>
                </form>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? "Ya tengo una cuenta" : "Quiero registrarme"}
                </Button>
            </div>
        </div>
    );
}

export default Login;

