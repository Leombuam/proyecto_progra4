import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auditoriums/TeatroNacional.css';

function AdminTeatroNacionalView() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [seats, setSeats] = useState([]);

    const events = {
        'Castella Canta en Navidad': {
            description: 'Una celebración navideña con el Conservatorio de Castella, presentando música en vivo, coro, danza y teatro.',
            schedule: '3 de diciembre de 2024, 7:00 PM',
            prices: {
                butaca: 24000,
                luneta: 24000,
                palco: 19200,
                galería: 7200,
            },
            image: 'https://www.teatronacional.go.cr/repositorio/detail/94-6979_castellacantaennavidad2.jpeg',
        },
        'X Concierto de Temporada Orquesta Sinfónica Nacional 2024': {
            description: 'La Orquesta Sinfónica Nacional presenta su décimo concierto de temporada bajo la dirección de Carl St. Clair.',
            schedule: '1 de diciembre de 2024, 10:30 AM',
            prices: {
                butaca: 24000,
                luneta: 24000,
                palco: 19200,
                galería: 7200,
            },
            image: 'https://www.teatronacional.go.cr/repositorio/detail/94-1267_xconciertocopia247577.jpg',
        },
        'En las ramas del ciprés': {
            description: 'Una obra de ballet contemporáneo que reimagina la tradición navideña, rompiendo estereotipos y ofreciendo una nueva perspectiva.',
            schedule: '12 al 22 de diciembre de 2024, varios horarios',
            prices: {
                butaca: 24000,
                luneta: 24000,
                palco: 19200,
                galería: 7200,
            },
            image: 'https://www.teatronacional.go.cr/repositorio/detail/94-2230_ramas.jpg',
        },
    };

    useEffect(() => {
        const storedSeats = localStorage.getItem('reservedSeatsTeatroNacional');
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
        localStorage.setItem('reservedSeatsTeatroNacional', JSON.stringify(initialSeats));
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
        localStorage.setItem('reservedSeatsTeatroNacional', JSON.stringify(seats));
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
        <div className="teatro-nacional">
            <button onClick={handleLogout}>Cerrar sesión</button>
            <h2>Vista del Administrador - Teatro Nacional</h2>
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

export default AdminTeatroNacionalView;
