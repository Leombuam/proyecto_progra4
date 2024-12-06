import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeatroNacional.css';

function TeatroNacional() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [seats, setSeats] = useState([]);
    const navigate = useNavigate();

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
            setSeats(
                Array(100).fill('disponible').map((seat, index) => {
                    if (index < 20) return { status: 'disponible', section: 'butaca' };
                    if (index < 40) return { status: 'disponible', section: 'luneta' };
                    if (index < 70) return { status: 'disponible', section: 'palco' };
                    return { status: 'disponible', section: 'galería' };
                })
            );
        }
    }, []);

    const handleEventChange = (event) => {
        setSelectedEvent(event.target.value);
    };

    const handleSeatClick = (index) => {
        setSeats((prevSeats) =>
            prevSeats.map((seat, seatIndex) =>
                seatIndex === index && seat.status !== 'ocupado'
                    ? { ...seat, status: seat.status === 'disponible' ? 'seleccionado' : 'disponible' }
                    : seat
            )
        );
    };

    const handleReserve = () => {
        const selectedSeats = seats.filter((seat) => seat.status === 'seleccionado');
        if (selectedSeats.length === 0) {
            alert('Por favor, selecciona al menos un asiento.');
            return;
        }

        const total = selectedSeats.reduce((sum, seat) => sum + events[selectedEvent].prices[seat.section], 0);

        const updatedSeats = seats.map((seat) =>
            seat.status === 'seleccionado' ? { ...seat, status: 'ocupado' } : seat
        );
        setSeats(updatedSeats);
        localStorage.setItem('reservedSeatsTeatroNacional', JSON.stringify(updatedSeats));

        navigate('/purchase', {
            state: {
                selectedEvent,
                selectedSeats,
                total,
                prices: events[selectedEvent].prices,
            },
        });
    };

    return (
        <div className="teatro-nacional">
            <h2>Teatro Nacional</h2>
            <p>Selecciona un evento para gestionar tus reservas.</p>

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

                    <div className="price-bar">
                        <p>
                            <strong>Precios:</strong>
                            <span className="butaca"> Butaca: ¢{events[selectedEvent].prices.butaca} </span> |
                            <span className="luneta"> Luneta: ¢{events[selectedEvent].prices.luneta} </span> |
                            <span className="palco"> Palco: ¢{events[selectedEvent].prices.palco} </span> |
                            <span className="galería"> Galería: ¢{events[selectedEvent].prices.galería} </span>
                        </p>
                    </div>

                    <button className="reserve-button" onClick={handleReserve}>
                        Reservar Asientos Seleccionados
                    </button>
                </>
            )}
        </div>
    );
}

export default TeatroNacional;
