import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auditoriums/CentroArtesUNA.css';

function AdminCentroArtesUNAView() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [seats, setSeats] = useState([]);

    const events = {
        'Concierto con Jon Secada junto a la Costa Rica Jazz Orchestra': {
            description: 'Disfruta de una noche inolvidable con Jon Secada y la Costa Rica Jazz Orchestra, presentando una fusión única de jazz y pop.',
            schedule: '2 de diciembre de 2024, 6:00 PM',
            prices: {
                butaca: 30000,
                luneta: 25000,
                palco: 20000,
                galería: 15000,
            },
            image: 'https://www.nacion.com/resizer/v2/FUX5WWBP5RCDHHCJJCADGBB4ZE.jpg?smart=true&auth=5a33e4ed4a06673e14d3e09327969a3039c44d11a073541da57092887a270d14&width=1440&height=753',
        },
        'Danza Argentina “Malambeando”': {
            description: 'Sumérgete en la pasión y energía del malambo argentino con el espectáculo "Malambeando", una muestra vibrante de danza tradicional.',
            schedule: '5 de diciembre de 2024, 7:00 PM',
            prices: {
                butaca: 28000,
                luneta: 23000,
                palco: 18000,
                galería: 12000,
            },
            image: 'https://www.teatrebarcelona.com/wp-content/uploads/2018/05/malabeando-carrion-valladolid_detail.jpg',
        },
        'Concierto “Costa Rica en Concierto Sinfónico”': {
            description: 'La Orquesta Sinfónica Juvenil se une a destacados artistas nacionales como Éditus, Humberto Vargas, Suite Doble, Gaviota, Inconsciente Colectivo y Marfil para una noche sinfónica memorable.',
            schedule: '5 de diciembre de 2024, 6:00 PM',
            prices: {
                butaca: 35000,
                luneta: 30000,
                palco: 25000,
                galería: 20000,
            },
            image: 'https://orquestafilarmonica.com/wp-content/uploads/OrquestaFilarmonicaDeCostaRica_01.jpg',
        },
    };

    useEffect(() => {
        const storedSeats = localStorage.getItem('reservedSeatsUNA');
        if (storedSeats) {
            setSeats(JSON.parse(storedSeats));
        } else {
            initializeSeats();
        }
    }, []);

    const initializeSeats = () => {
        const initialSeats = Array(100).fill('disponible').map((_, index) => {
            if (index < 20) return { status: 'disponible', section: 'butaca' };
            if (index < 40) return { status: 'disponible', section: 'luneta' };
            if (index < 70) return { status: 'disponible', section: 'palco' };
            return { status: 'disponible', section: 'galería' };
        });
        setSeats(initialSeats);
        localStorage.setItem('reservedSeatsUNA', JSON.stringify(initialSeats));
    };

    const handleEventChange = (event) => {
        setSelectedEvent(event.target.value);
    };

    const handleSeatClick = (index) => {
        setSeats((prevSeats) =>
            prevSeats.map((seat, seatIndex) =>
                seatIndex === index
                    ? { ...seat, status: seat.status === 'disponible' ? 'ocupado' : 'disponible' }
                    : seat
            )
        );
    };

    const resetSeats = () => {
        initializeSeats(); // Restablecer todos los asientos a "disponible"
    };

    const handleSaveChanges = () => {
        localStorage.setItem('reservedSeatsUNA', JSON.stringify(seats));
        alert('Cambios guardados correctamente.');
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('Sesión cerrada exitosamente.');
                navigate('/');
            })
            .catch((error) => {
                console.error('Error al cerrar sesión:', error);
                alert('Hubo un error al intentar cerrar sesión. Inténtalo de nuevo.');
            });
    };

    return (
        <div className="centro-artes-una">
            <button onClick={handleLogout}>Cerrar sesión</button>
            <h2>Vista del Administrador - Centro para las Artes UNA</h2>
            <p>Gestiona los eventos y los asientos.</p>
            <div className="event-selection">
                <label htmlFor="event">Selecciona un evento:</label>
                <select id="event" onChange={handleEventChange}>
                    <option value="">--Selecciona un evento--</option>
                    {Object.keys(events).map((event) => (
                        <option key={event} value={event}>
                            {event}
                        </option>
                    ))}
                </select>
            </div>

            {selectedEvent && (
                <>
                    <div className="event-details">
                        <h3>{selectedEvent}</h3>
                        <div className="event-info">
                            <img src={events[selectedEvent].image} alt={`Póster de ${selectedEvent}`} />
                            <div>
                                <p>{events[selectedEvent].description}</p>
                                <p>
                                    <strong>Horario:</strong> {events[selectedEvent].schedule}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="screen">Escenario</div>

                    <div className="seat-grid">
                        {seats.map((seat, index) => (
                            <div
                                key={index}
                                className={`seat ${seat.status} ${seat.section}`}
                                onClick={() => handleSeatClick(index)}
                            ></div>
                        ))}
                    </div>

                    <button className="save-button" onClick={handleSaveChanges}>
                        Guardar Cambios
                    </button>
                    <button className="reset-button" onClick={resetSeats}>
                        Eliminar Todos los Asientos
                    </button>
                </>
            )}
        </div>
    );
}

export default AdminCentroArtesUNAView;
