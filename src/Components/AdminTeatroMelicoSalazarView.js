import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auditoriums/CentroArtesUNA.css';

function RecepcionistCentroArtesUNA() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [seats, setSeats] = useState([]);

    const events = {
        'Ballet La Bella y la Bestia': {
            description: 'Un clásico del ballet que cuenta la historia de Bella y la Bestia con magníficos movimientos y música.',
            schedule: '10 de diciembre de 2024, 7:00 PM',
            prices: {
                butaca: 25000,
                luneta: 25000,
                palco: 20000,
                galería: 8000,
            },
            image: 'https://www.teatronacional.go.cr/repositorio/detail/94-5905_paratn1080x1920.png',
        },
        'BALLET EL CASCANUECES 2024': {
            description: 'El Cascanueces, una tradición navideña con música de Tchaikovsky y una mágica puesta en escena.',
            schedule: '15 de diciembre de 2024, 6:00 PM',
            prices: {
                butaca: 30000,
                luneta: 30000,
                palco: 22000,
                galería: 10000,
            },
            image: 'https://cdn.eticket.cr/imagenes/artistas/241028142959863_performer_img_1200x400.jpg',
        },
        'GIRA VICTORIA-RAPHAEL': {
            description: 'Raphael nos trae su gira "Victoria", un espectáculo lleno de emoción y éxitos musicales inolvidables.',
            schedule: '20 de diciembre de 2024, 8:00 PM',
            prices: {
                butaca: 35000,
                luneta: 35000,
                palco: 28000,
                galería: 12000,
            },
            image: 'https://cdn.eticket.cr/imagenes/imgEventos/241126091402401_estelar_1200x400.jpg',
        },
    };

    useEffect(() => {
        const storedSeats = localStorage.getItem('reservedSeatsRecepcionistUNA');
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
        localStorage.setItem('reservedSeatsRecepcionistUNA', JSON.stringify(initialSeats));
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
        localStorage.setItem('reservedSeatsRecepcionistUNA', JSON.stringify(seats));
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
            <h2>Vista del Recepcionista del Centro de Artes UNA</h2>
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

export default RecepcionistCentroArtesUNA;
