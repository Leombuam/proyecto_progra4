import React, { useState } from 'react';
import app from '../firebaseconfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import Button from 'react-bootstrap/Button';  

const auth = getAuth(app);
const db = getDatabase(app);

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); 
    const [successMessage, setSuccessMessage] = useState('');

    async function userregister(email, password, rol) {
        try {
            const infoUser = await createUserWithEmailAndPassword(auth, email, password);
            console.log("UID del usuario registrado:", infoUser.user.uid);

            // Guardar el rol y correo en la base de datos en tiempo real
            const userRef = ref(db, "users/" + infoUser.user.uid);
            await set(userRef, { correo: email, rol: rol });

            setSuccessMessage('Usuario registrado exitosamente.');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            setSuccessMessage('');
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
                    setSuccessMessage('Inicio de sesión exitoso.');
                    setErrorMessage('');
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                    setSuccessMessage('');
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
                    {isRegistering && (
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
                    <Button type="submit" variant="primary">
                        {isRegistering ? "Register" : "Login"}
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

