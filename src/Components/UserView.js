import React, { useState, useEffect } from 'react'; 
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { getAuth, signOut } from 'firebase/auth';
import { useLocation } from 'react-router-dom';
import './UserView.css';
import app from '../firebaseconfig';

const db = getDatabase(app);
const auth = getAuth(app);

const auditoriums = [
    { 
        name: "Aula Magna UCR", 
        path: "/aula-magna-ucr",
        image: "https://www.ucr.ac.cr/medios/fotos/2020/rs230693_dsc_1872-wed5ed5262c8d079.jpg",
        description: "Un espacio cultural en la Universidad de Costa Rica.",
        address: "Universidad de Costa Rica, San Pedro, San José.",
        phone: "+506 2511 0000"
    },
    { 
        name: "Centro para las Artes TEC", 
        path: "/centro-artes-tec",
        image: "https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/colorbox/public/media/img/main/ceartec-09-min_0.jpg",
        description: "Espacio artístico del Tecnológico de Costa Rica.",
        address: "Cartago, Costa Rica.",
        phone: "+506 2550 2000"
    },
    { 
        name: "Centro para las Artes UNA", 
        path: "/centro-artes-una",
        image: "https://www.cidea.una.ac.cr/images/CPA/cpa2.jpg",
        description: "Centro cultural de la Universidad Nacional.",
        address: "Heredia, Costa Rica.",
        phone: "+506 2277 3000"
    },
    { 
        name: "Teatro Melico Salazar", 
        path: "/teatro-melico-salazar",
        image: "https://sicultura-live.s3.amazonaws.com/public/styles/large_retina/public/media/_laf4295.jpg?itok=1KsbdF_z",
        description: "Teatro histórico en el corazón de San José.",
        address: "Av. 2, C. Central, San José.",
        phone: "+506 2221 5341"
    },
    { 
        name: "Teatro Nacional", 
        path: "/teatro-nacional",
        image: "https://www.periodicomensaje.com/images/2020/TEATRONACIONAL.jpg",
        description: "El principal teatro de Costa Rica, inaugurado en 1897.",
        address: "Av. 2, C. 5, San José.",
        phone: "+506 2010 1111"
    },
];

const UserView = () => {
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState("¡Bienvenido! Aquí verás tus notificaciones importantes.");
    const location = useLocation();

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser({ email: currentUser.email, role: "Usuario estándar" });
        }

        // Verificar si la compra fue exitosa
        if (location.state?.reservationSuccess) {
            setNotifications("Reserva confirmada. Recuerda presentarte 30 minutos antes del evento.");
        }
    }, [location.state]);

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

    const showProfileInfo = () => {
        if (user) {
            alert(`Correo: ${user.email}\nRol: ${user.role}`);
        } else {
            alert("No se encontró información del usuario.");
        }
    };

    return (
        <div>
            <Header onLogout={handleLogout} onProfileClick={showProfileInfo} onNotificationsClick={() => alert(notifications)} />
            <h1>Bienvenido</h1>
            <h2>Seleccione un Auditorio</h2>
            <AuditoriumList auditoriums={auditoriums} onSelect={handleAuditoriumSelection} />
            <Carousel auditoriums={auditoriums} />
        </div>
    );
};

const Header = ({ onLogout, onProfileClick, onNotificationsClick }) => (
    <header className="header-bar">
        <button className="nav-button" onClick={onProfileClick}>Perfil</button>
        <button className="nav-button" onClick={onNotificationsClick}>Notificaciones</button>
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

const Carousel = ({ auditoriums }) => {
    return (
        <div className="carousel">
            {auditoriums.map((auditorium, index) => (
                <div key={index} className="carousel-item">
                    <img src={auditorium.image} alt={auditorium.name} />
                    <div className="carousel-info">
                        <h3>{auditorium.name}</h3>
                        <p>{auditorium.description}</p>
                        <p><strong>Dirección:</strong> {auditorium.address}</p>
                        <p><strong>Teléfono:</strong> {auditorium.phone}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserView;







       







