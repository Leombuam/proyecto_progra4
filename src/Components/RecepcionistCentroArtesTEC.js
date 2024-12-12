import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 

function RecepcionistCentroArtesTEC() {
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
            <h2>Vista del Recepcionista del Centro de Artes TEC</h2>
            <p>Este es el panel del Recepcionista.</p>
            
        </div>
    );
}

export default RecepcionistCentroArtesTEC;