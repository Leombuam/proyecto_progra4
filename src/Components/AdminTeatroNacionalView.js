import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auditoriums/TeatroNacional.css';

function AdminTeatroNacionalView() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [seats, setSeats] = useState([]);
    const [events, setEvents] = useState({
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
            const storedSeats = localStorage.getItem(`seats_TeatroNacional_${selectedEvent}`);
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
        localStorage.setItem(`seats_TeatroNacional_${eventName}`, JSON.stringify(initialSeats));
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
            localStorage.setItem(`seats_TeatroNacional_${selectedEvent}`, JSON.stringify(seats));
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
        initializeSeatsForEvent(newEvent.name);
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
        <div className="teatro-nacional">
            <h2>Vista del Administrador - Teatro Nacional</h2>
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

export default AdminTeatroNacionalView;
