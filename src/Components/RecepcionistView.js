import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 

function RecepcionistView() {
    const auth = getAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Sesión cerrada exitosamente.");
                navigate('/'); 
            })
            .catch((error) => {
                console.error("Error al cerrar sesión:", error);
                alert("Hubo un error al intentar cerrar sesión. Inténtalo de nuevo.");
            });
    };

    return (
        <div>
            <button onClick={handleLogout}>Cerrar sesión</button>
            <h2>Vista del Recepcionista</h2>
            <p>Este es el panel del recepcionista. Aquí puedes gestionar reservas y eventos.</p>
            
        </div>
    );
}

export default RecepcionistView;

