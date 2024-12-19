import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auditoriums/CentroArtesUNA.css';

function AdminCentroArtesUNAView() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [seats, setSeats] = useState([]);
    const [events, setEvents] = useState({
        'Concierto con Jon Secada junto a la Costa Rica Jazz Orchestra': {
            description: 'Disfruta de una noche inolvidable con Jon Secada y la Costa Rica Jazz Orchestra, presentando una fusión única de jazz y pop.',
            schedule: '2 de diciembre de 2024, 6:00 PM',
            prices: {
                butaca: 30000,
                luneta: 25000,
                palco: 20000,
                galería: 15000,
            },
            image: 'https://www.nacion.com/resizer/v2/FUX5WWBP5RCDHHCJJCADGBB4ZE.jpg',
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
            const storedSeats = localStorage.getItem(`seats_UNA_${selectedEvent}`);
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
        localStorage.setItem(`seats_UNA_${eventName}`, JSON.stringify(initialSeats));
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
            localStorage.setItem(`seats_UNA_${selectedEvent}`, JSON.stringify(seats));
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
        <div className="centro-artes-una">
            <h2>Vista del Administrador - Centro para las Artes UNA</h2>
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

export default AdminCentroArtesUNAView;
