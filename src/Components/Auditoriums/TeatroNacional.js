import React, { useState } from 'react';
import './TeatroNacional.css';

function TeatroNacional() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [seats, setSeats] = useState(
        Array(100).fill('disponible').map((seat, index) => {
            if (index < 20) return { status: 'disponible', section: 'butaca' };
            if (index < 40) return { status: 'disponible', section: 'luneta' };
            if (index < 70) return { status: 'disponible', section: 'palco' };
            return { status: 'disponible', section: 'galería' };
        })
    );

    const events = {
        'Castella Canta en Navidad': {
            description: 'Una celebración navideña con el Conservatorio de Castella, presentando música en vivo, coro, danza y teatro.',
            schedule: '3 de diciembre de 2024, 7:00 PM',
            prices: {
                butaca: '¢24,000',
                luneta: '¢24,000',
                palco: '¢19,200',
                galería: '¢7,200'
            },
            image: 'https://www.teatronacional.go.cr/repositorio/detail/94-6979_castellacantaennavidad2.jpeg'
        },
        'X Concierto de Temporada Orquesta Sinfónica Nacional 2024': {
            description: 'La Orquesta Sinfónica Nacional presenta su décimo concierto de temporada bajo la dirección de Carl St. Clair.',
            schedule: '1 de diciembre de 2024, 10:30 AM',
            prices: {
                butaca: '¢24,000',
                luneta: '¢24,000',
                palco: '¢19,200',
                galería: '¢7,200'
            },
            image: 'https://www.teatronacional.go.cr/repositorio/detail/94-1267_xconciertocopia247577.jpg'
        },
        'En las ramas del ciprés': {
            description: 'Una obra de ballet contemporáneo que reimagina la tradición navideña, rompiendo estereotipos y ofreciendo una nueva perspectiva.',
            schedule: '12 al 22 de diciembre de 2024, varios horarios',
            prices: {
                butaca: '¢24,000',
                luneta: '¢24,000',
                palco: '¢19,200',
                galería: '¢7,200'
            },
            image: 'https://www.teatronacional.go.cr/repositorio/detail/94-2230_ramas.jpg'
        }
    };

    const handleEventChange = (event) => {
        setSelectedEvent(event.target.value);
        setSeats((prevSeats) =>
            prevSeats.map((seat, index) => {
                if (index < 20) return { status: 'disponible', section: 'butaca' };
                if (index < 40) return { status: 'disponible', section: 'luneta' };
                if (index < 70) return { status: 'disponible', section: 'palco' };
                return { status: 'disponible', section: 'galería' };
            })
        );
    };

    const handleSeatClick = (index) => {
        setSeats((prevSeats) =>
            prevSeats.map((seat, seatIndex) =>
                seatIndex === index
                    ? {
                          ...seat,
                          status: seat.status === 'disponible' ? 'seleccionado' : 'disponible'
                      }
                    : seat
            )
        );
    };

    const handleReserve = () => {
        setSeats((prevSeats) =>
            prevSeats.map((seat) =>
                seat.status === 'seleccionado' ? { ...seat, status: 'ocupado' } : seat
            )
        );
        alert('Reserva realizada con éxito.');
    };

    return (
        <div className="teatro-nacional">
            <h2>Vista del Teatro Nacional</h2>
            <p>Selecciona un evento para gestionar reservas.</p>

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
                            <img
                                src={events[selectedEvent].image}
                                alt={`Póster de ${selectedEvent}`}
                            />
                            <div>
                                <p>{events[selectedEvent].description}</p>
                                <p>
                                    <strong>Horario:</strong> {events[selectedEvent].schedule}
                                </p>
                                <div className="prices">
                                    <p style={{ color: 'blue' }}>
                                        Butaca: {events[selectedEvent].prices.butaca}
                                    </p>
                                    <p style={{ color: 'green' }}>
                                        Luneta: {events[selectedEvent].prices.luneta}
                                    </p>
                                    <p style={{ color: 'purple' }}>
                                        Palco: {events[selectedEvent].prices.palco}
                                    </p>
                                    <p style={{ color: 'orange' }}>
                                        Galería: {events[selectedEvent].prices.galería}
                                    </p>
                                </div>
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

                    <button onClick={handleReserve}>Reservar</button>

                    <div className="legend">
    <div className="legend-row">
        <span className="legend-item butaca">Butaca </span>
        <span className="legend-item luneta">Luneta </span>
        <span className="legend-item palco">Palco </span>
        <span className="legend-item galería">Galería </span>
    </div>
    <div className="legend-row">
        <span className="legend-item disponible">Disponible</span>
        <span className="legend-item seleccionado">Seleccionado</span>
        <span className="legend-item ocupado">Ocupado</span>
    </div>
</div>

                </>
            )}
        </div>
    );
}

export default TeatroNacional;







