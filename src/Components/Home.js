import React, { useEffect, useState } from 'react';
import app from '../firebaseconfig';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, get } from "firebase/database";
import AdminView from './AdminView';
import UserView from './UserView';
import VIPUserView from './VIPUserView';
import RecepcionistView from './RecepcionistView';

const auth = getAuth(app);
const db = getDatabase(app);

function Home({ user }) {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user) {
                const userRef = ref(db, "users/" + user.uid);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setUserRole(data.rol);
                }
            }
        };
        fetchUserRole();
    }, [user]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("Sesión cerrada");
        } catch (error) {
            console.error("Error cerrando sesión:", error.message);
        }
    };

    const renderViewBasedOnRole = () => {
        switch (userRole) {
            case 'admin':
                return <AdminView />;
            case 'user':
                return <UserView />;
            case 'vipuser':
                return <VIPUserView />;
            case 'recepcionist':
                return <RecepcionistView />;
            default:
                return <p>Role desconocido o no autorizado</p>;
        }
    };

    return (
        <div>
            <button onClick={handleSignOut}>Cerrar Sesión</button>
            <h1>Bienvenido {user.rol}</h1>            

            {user.rol === 'admin' && <AdminView />}
            {user.rol === 'vipuser' && <VIPUserView />}  {/* Mostrar vista VIP */}
            {user.rol === 'user' && <RegularUserView />}  {/* Mostrar vista de usuario regular */}
            {user.rol === 'recepcionist' && <RecepcionistView />}  {/* Mostrar vista de recepcionista */}
            
        </div>
    );
}

export default Home;
