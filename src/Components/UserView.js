import React, {} from 'react';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { getAuth, signOut } from 'firebase/auth';
import './UserView.css';
import app from '../firebaseconfig';

const db = getDatabase(app);
const auth = getAuth(app);

const auditoriums = [
    { name: "Aula Magna UCR", path: "/aula-magna-ucr" },
    { name: "Centro para las Artes TEC", path: "/centro-artes-tec" },
    { name: "Centro para las Artes UNA", path: "/centro-artes-una" },
    { name: "Teatro Melico Salazar", path: "/teatro-melico-salazar" },
    { name: "Teatro Nacional", path: "/teatro-nacional" },
];

const UserView = () => {
       const handleAuditoriumSelection = (path) => {
        window.open(`${window.location.origin}${path}`, '_blank');
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Sesión cerrada exitosamente.");
                window.location.href = '/';
            })
            .catch((error) => {
                console.error("Error al cerrar sesión:", error);
                alert("Hubo un error al intentar cerrar sesión. Inténtalo de nuevo.");
            });
    };

    return (
        <div>
            <Header onLogout={handleLogout} />
            <h1>Bienvenido</h1>
            <h2>Seleccione un Auditorio</h2>
            <AuditoriumList auditoriums={auditoriums} onSelect={handleAuditoriumSelection} />           
        </div>
    );
};

const Header = ({ onLogout }) => (
    <header className="header-bar">
        <button className="nav-button" onClick={() => alert("Información de perfil")}>Perfil</button>
        <button className="nav-button" onClick={() => alert("Notificaciones")}>Notificaciones</button>
        <button className="nav-button" onClick={onLogout}>Cerrar sesión</button>
    </header>
);

const AuditoriumList = ({ auditoriums, onSelect }) => (
    <ul>
        {auditoriums.map(auditorium => (
            <li key={auditorium.name} onClick={() => onSelect(auditorium.path)}>
                {auditorium.name}
            </li>
        ))}
    </ul>
);
export default UserView;
       







