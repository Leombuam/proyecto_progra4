import React from 'react';
import app from '../firebaseconfig';
import { getAuth, signOut } from 'firebase/auth';
import AdminView from './AdminView';

const auth = getAuth(app);

function Home({ user }) {
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("Sesión cerrada");
            
        } catch (error) {
            console.error("Error cerrando sesión:", error.message);
        }
    };

    return (
        <div>
            <h1>Bienvenido Administrador</h1>
            <button onClick={handleSignOut}>Cerrar Sesión</button>
            {user && user.rol === 'admin' ? <AdminView /> : null}
        </div>
    );
}

export default Home;