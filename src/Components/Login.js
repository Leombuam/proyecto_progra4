import React, { useState } from 'react';
import app from '../firebaseconfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import Button from 'react-bootstrap/Button'; // Importamos el botón de react-bootstrap

const auth = getAuth(app);
const db = getDatabase(app);

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');  // Para mensajes de error
    const [successMessage, setSuccessMessage] = useState(''); // Para mensajes de éxito

    async function userregister(email, password, rol) {
        try {
            const infoUser = await createUserWithEmailAndPassword(auth, email, password);
            console.log("UID del usuario registrado:", infoUser.user.uid);

            // Guardar el rol y correo en la base de datos en tiempo real
            const userRef = ref(db, "users/" + infoUser.user.uid);
            await set(userRef, { correo: email, rol: rol });

            // Establecemos el mensaje de éxito para el usuario
            setSuccessMessage('Usuario registrado exitosamente.');
            setErrorMessage(''); // Limpiamos cualquier mensaje de error
        } catch (error) {
            // Establecemos el mensaje de error
            setErrorMessage(error.message);
            setSuccessMessage(''); // Limpiamos cualquier mensaje de éxito
        }
    }

    function submitHandler(e) {
        e.preventDefault();

        const email = e.target.email.value; 
        const password = e.target.password.value;
        const rol = e.target.rol.value;

        if (isRegistering) {
            userregister(email, password, rol);
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    // Establecemos el mensaje de éxito para el inicio de sesión
                    setSuccessMessage('Inicio de sesión exitoso.');
                    setErrorMessage(''); // Limpiamos cualquier mensaje de error
                })
                .catch((error) => {
                    // Establecemos el mensaje de error para el inicio de sesión fallido
                    setErrorMessage(error.message);
                    setSuccessMessage(''); // Limpiamos cualquier mensaje de éxito
                });
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>{isRegistering ? "Register" : "Login"}</h1>
                <form onSubmit={submitHandler}>
                    <label>
                        Correo electrónico:
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        Contraseña:
                        <input type="password" name="password" required />
                    </label>
                    {isRegistering && ( // Solo mostrar la selección de rol si es registro
                        <label>
                            Perfil:
                            <select name="rol" required>
                                <option value="admin">Administrador</option>
                                <option value="user">Usuario</option>
                                <option value="vipuser">Usuario VIP</option>
                                <option value="recepcionist">Recepcionista</option>
                            </select>
                        </label>
                    )}
                    {/* Cambiamos el botón tradicional por el de react-bootstrap */}
                    <Button type="submit" variant="primary">
                        {isRegistering ? "Register" : "Login"}
                    </Button>
                </form>

                {/* Mostrar mensajes de éxito o error */}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                {/* Cambiamos el botón de cambio de estado de registro */}
                <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? "Ya tengo una cuenta" : "Quiero registrarme"}
                </Button>
            </div>
        </div>
    );
}

export default Login;
