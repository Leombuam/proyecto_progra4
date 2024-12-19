import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auditoriums/AulaMagnaUCR.css';

function AdminAulaMagnaUCRView() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [seats, setSeats] = useState([]);
    const [events, setEvents] = useState({
        'Marimba de Concierto de Bellas Artes, Guatemala': {
            description: 'Disfruta de la tradicional Marimba de Concierto de Bellas Artes desde Guatemala, una velada llena de música cultural.',
            schedule: '10 de diciembre de 2024, 7:00 PM',
            prices: {
                butaca: 10000,
                luneta: 8000,
                palco: 5000,
                galería: 3500,
            },
            image: 'https://scontent-bog2-2.xx.fbcdn.net/v/t1.6435-9/82581660_153300832756793_8420944740052107264_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=o-twkR2OoAgQ7kNvgEK7ldI&_nc_zt=23&_nc_ht=scontent-bog2-2.xx&_nc_gid=AfICFRPm9qnXboHH0SGRH4q&oh=00_AYB-xWBGVQOQ2xkBtoX1iGS0GhSmBCaHopwgxJ2ayvsoUg&oe=6776DCB0',
        },
        'Concierto de la Orquesta Sinfónica UCR': {
            description: 'La Orquesta Sinfónica de la UCR presenta un concierto especial lleno de interpretaciones clásicas y contemporáneas.',
            schedule: '15 de diciembre de 2024, 8:00 PM',
            prices: {
                butaca: 8000,
                luneta: 5000,
                palco: 3500,
                galería: 2000,
            },
            image: 'https://scontent-bog2-2.xx.fbcdn.net/v/t1.6435-9/89070310_2793518514063340_5421020391441170432_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=epN1iErDqCYQ7kNvgHa5C_N&_nc_zt=23&_nc_ht=scontent-bog2-2.xx&_nc_gid=AiaFJtVImi1HKq0k63ku5na&oh=00_AYDV-DJznHeO4-5bYjKoSt_SlPityv01wnAt-y6dE1nJlA&oe=67770861',
        },
        'Campanas de Gratitud, Hermandad y Regocijo': {
            description: 'Vive la magia navideña con el espectáculo "Campanas de Gratitud, Hermandad y Regocijo", una noche llena de música y espíritu festivo.',
            schedule: '20 de diciembre de 2024, 6:00 PM',
            prices: {
                butaca: 2000,
                luneta: 2000,
                palco: 1500,
                galería: 1000,
            },
            image: 'https://cdn.viralagenda.com/images/events/ext/1225463-ff4cbd34ec9da189eb74780d2fe731dd.jpeg',
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

    // Cargar los asientos del evento seleccionado desde localStorage
    useEffect(() => {
        if (selectedEvent) {
            const storedSeats = localStorage.getItem(`seats_${selectedEvent}`);
            if (storedSeats) {
                setSeats(JSON.parse(storedSeats));
            } else {
                initializeSeatsForEvent(selectedEvent);
            }
        }
    }, [selectedEvent]);

    // Inicializar los asientos de un evento
    const initializeSeatsForEvent = (eventName) => {
        const initialSeats = Array(100).fill('disponible').map((_, index) => {
            if (index < 20) return { status: 'disponible', section: 'butaca' };
            if (index < 40) return { status: 'disponible', section: 'luneta' };
            if (index < 70) return { status: 'disponible', section: 'palco' };
            return { status: 'disponible', section: 'galería' };
        });
        localStorage.setItem(`seats_${eventName}`, JSON.stringify(initialSeats));
        setSeats(initialSeats);
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
            localStorage.setItem(`seats_${selectedEvent}`, JSON.stringify(seats));
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
        <div className="aula-magna-ucr">
            <h2>Vista del Administrador - Aula Magna UCR</h2>
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
                <>
                    <button onClick={() => setIsCreatingEvent(true)}>Crear Nuevo Evento</button>
                </>
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

export default AdminAulaMagnaUCRView;
