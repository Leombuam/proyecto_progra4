import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auditoriums/CentroArtesTEC.css';

function AdminCentroArtesTECView() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [seats, setSeats] = useState([]);

    const events = {
        'Navidad con Aire Oriental: Danza del Vientre': {
            description: 'Disfruta de una mágica noche navideña con presentaciones de danza del vientre, fusionando ritmos orientales con el espíritu festivo.',
            schedule: '10 de diciembre de 2024, 7:00 PM',
            prices: {
                butaca: 10000,
                luneta: 8000,
                palco: 5000,
                galería: 3000,
            },
            image: 'https://www.tec.ac.cr/sites/default/files/media/img/main/afiche_dicimbre_2024-jpg.jpg',
        },
        'Sesiones La Jauría y Aulladoras': {
            description: 'Vive una noche de rock alternativo con las bandas nacionales La Jauría y Aulladoras, presentando sus más recientes éxitos.',
            schedule: '15 de diciembre de 2024, 8:00 PM',
            prices: {
                butaca: 15000,
                luneta: 12000,
                palco: 8000,
                galería: 5000,
            },
            image: 'https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/colorbox/public/media/img/gallery/275678063_5061560043889846_3943563635622391448_n.jpg',
        },
        'Concierto Navideño': {
            description: 'Únete a la celebración navideña con un concierto especial que incluye villancicos y melodías tradicionales interpretadas por talentosos músicos locales.',
            schedule: '20 de diciembre de 2024, 6:00 PM',
            prices: {
                butaca: 30000,
                luneta: 25000,
                palco: 20000,
                galería: 15000,
            },
            image: 'https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/colorbox/public/media/img/main/concierto_navideno_tec_2023_rgarita-18.jpg',
        },
    };

    useEffect(() => {
        const storedSeats = localStorage.getItem('reservedSeatsTEC');
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
        localStorage.setItem('reservedSeatsTEC', JSON.stringify(initialSeats));
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
        localStorage.setItem('reservedSeatsTEC', JSON.stringify(seats));
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
        <div className="centro-artes-tec">
            <button onClick={handleLogout}>Cerrar sesión</button>
            <h2>Vista del Administrador - Centro para las Artes TEC</h2>
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

export default AdminCentroArtesTECView;
