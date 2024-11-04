import React, { useState } from 'react';
import app from '../firebaseconfig';
import { useNavigate } from 'react-router-dom';  // Importa el hook de navegación
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";
import Button from 'react-bootstrap/Button';  
import './Login.css';

const auth = getAuth(app);
const db = getDatabase(app);

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); 
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();  // Instancia para navegar entre rutas

    async function userregister(email, password, rol) {
        try {
            const infoUser = await createUserWithEmailAndPassword(auth, email, password);
            const userRef = ref(db, "users/" + infoUser.user.uid);
            await set(userRef, { correo: email, rol: rol });
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
        const rol = e.target.rol?.value;  
    
        if (isRegistering) {
            userregister(email, password, rol);
        } else {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const userId = userCredential.user.uid;
                
                // Obtener el rol del usuario desde la base de datos
                const userRef = ref(db, `users/${userId}`);
                const snapshot = await get(userRef);
                
                if (snapshot.exists()) {
                    const userRole = snapshot.val().rol;
                    setSuccessMessage('Inicio de sesión exitoso.');
                    setErrorMessage('');
                    
                    // Redirección basada en el rol del usuario
                    if (userRole === 'admin') {
                        navigate('./AdminView'); // Asegúrate de que /admin-view esté configurado en tus rutas
                    } else if (userRole === 'recepcionist') {
                        navigate('./RecepcionistView'); // Asegúrate de que /recepcionist-view esté configurado en tus rutas
                    } else {
                        navigate('./UserView'); // Redirige al perfil de usuario estándar
                    }
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




