import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auditoriums/TeatroMelicoSalazar.css';

function AdminTeatroMelicoSalazarView() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [seats, setSeats] = useState([]);
    const [events, setEvents] = useState({
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
            const storedSeats = localStorage.getItem(`seats_Melico_${selectedEvent}`);
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
        localStorage.setItem(`seats_Melico_${eventName}`, JSON.stringify(initialSeats));
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
            localStorage.setItem(`seats_Melico_${selectedEvent}`, JSON.stringify(seats));
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
        <div className="teatro-melico-salazar">
            <h2>Vista del Administrador - Teatro Melico Salazar</h2>
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

export default AdminTeatroMelicoSalazarView;
