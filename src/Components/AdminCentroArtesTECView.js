import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auditoriums/CentroArtesTEC.css';

function AdminCentroArtesTECView() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [seats, setSeats] = useState([]);
    const [events, setEvents] = useState({
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
    });

    const [isCreatingEvent, setIsCreatingEvent] = useState(false);
    const [newEvent, setNewEvent] = useState({
        name: '',
        description: '',
        schedule: '',
        prices: { butaca: '', luneta: '', palco: '', galería: '' },
        image: '',
    });

    useEffect(() => {
        if (selectedEvent) {
            const storedSeats = localStorage.getItem(`seats_TEC_${selectedEvent}`);
            if (storedSeats) {
                setSeats(JSON.parse(storedSeats));
            } else {
                initializeSeatsForEvent(selectedEvent);
            }
        }
    }, [selectedEvent]);

    const initializeSeatsForEvent = (eventName) => {
        const initialSeats = Array(100).fill('disponible').map((_, index) => {
            if (index < 20) return { status: 'disponible', section: 'butaca' };
            if (index < 40) return { status: 'disponible', section: 'luneta' };
            if (index < 70) return { status: 'disponible', section: 'palco' };
            return { status: 'disponible', section: 'galería' };
        });
        setSeats(initialSeats);
        localStorage.setItem(`seats_TEC_${eventName}`, JSON.stringify(initialSeats));
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

    const handleSaveChanges = () => {
        if (selectedEvent) {
            localStorage.setItem(`seats_TEC_${selectedEvent}`, JSON.stringify(seats));
            alert('Cambios guardados correctamente.');
        }
    };

    const resetSeats = () => {
        if (selectedEvent) initializeSeatsForEvent(selectedEvent);
    };

    const handleCreateEvent = () => {
        setEvents((prevEvents) => ({
            ...prevEvents,
            [newEvent.name]: {
                description: newEvent.description,
                schedule: newEvent.schedule,
                prices: newEvent.prices,
                image: newEvent.image,
            },
        }));
        initializeSeatsForEvent(newEvent.name); // Inicializar los asientos para el nuevo evento
        setIsCreatingEvent(false);
        setNewEvent({
            name: '',
            description: '',
            schedule: '',
            prices: { butaca: '', luneta: '', palco: '', galería: '' },
            image: '',
        });
    };

    return (
        <div className="centro-artes-tec">
            <h2>Vista del Administrador - Centro para las Artes TEC</h2>
            <p>Gestiona los eventos y los asientos.</p>

            {isCreatingEvent ? (
                <div className="create-event-form">
                    <h3>Crear Nuevo Evento</h3>
                    <input
                        type="text"
                        placeholder="Nombre del Evento"
                        value={newEvent.name}
                        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                    />
                    <textarea
                        placeholder="Descripción"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    />
                    <input
                        type="datetime-local"
                        value={newEvent.schedule}
                        onChange={(e) => setNewEvent({ ...newEvent, schedule: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Precio Butaca"
                        value={newEvent.prices.butaca}
                        onChange={(e) =>
                            setNewEvent({ ...newEvent, prices: { ...newEvent.prices, butaca: e.target.value } })
                        }
                    />
                    <input
                        type="number"
                        placeholder="Precio Luneta"
                        value={newEvent.prices.luneta}
                        onChange={(e) =>
                            setNewEvent({ ...newEvent, prices: { ...newEvent.prices, luneta: e.target.value } })
                        }
                    />
                    <input
                        type="number"
                        placeholder="Precio Palco"
                        value={newEvent.prices.palco}
                        onChange={(e) =>
                            setNewEvent({ ...newEvent, prices: { ...newEvent.prices, palco: e.target.value } })
                        }
                    />
                    <input
                        type="number"
                        placeholder="Precio Galería"
                        value={newEvent.prices.galería}
                        onChange={(e) =>
                            setNewEvent({ ...newEvent, prices: { ...newEvent.prices, galería: e.target.value } })
                        }
                    />
                    <input
                        type="text"
                        placeholder="URL de la Imagen"
                        value={newEvent.image}
                        onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
                    />
                    <button onClick={handleCreateEvent}>Guardar Evento</button>
                    <button onClick={() => setIsCreatingEvent(false)}>Cancelar</button>
                </div>
            ) : (
                <button onClick={() => setIsCreatingEvent(true)}>Crear Nuevo Evento</button>
            )}

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
