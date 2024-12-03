import React, { useState } from 'react';
import './TeatroMelicoSalazar.css'; 

function TeatroMelicoSalazar() {
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
        'Ballet La Bella y la Bestia': {
            description: 'Un clásico del ballet que cuenta la historia de Bella y la Bestia con magníficos movimientos y música.',
            schedule: '10 de diciembre de 2024, 7:00 PM',
            prices: {
                butaca: '¢25,000',
                luneta: '¢25,000',
                palco: '¢20,000',
                galería: '¢8,000'
            },
            image: 'https://www.teatronacional.go.cr/repositorio/detail/94-5905_paratn1080x1920.png'
        },
        'BALLET EL CASCANUECES 2024': {
            description: 'El Cascanueces, una tradición navideña con música de Tchaikovsky y una mágica puesta en escena.',
            schedule: '15 de diciembre de 2024, 6:00 PM',
            prices: {
                butaca: '¢30,000',
                luneta: '¢30,000',
                palco: '¢22,000',
                galería: '¢10,000'
            },
            image: 'https://cdn.eticket.cr/imagenes/artistas/241028142959863_performer_img_1200x400.jpg'
        },
        'GIRA VICTORIA-RAPHAEL': {
            description: 'Raphael nos trae su gira "Victoria", un espectáculo lleno de emoción y éxitos musicales inolvidables.',
            schedule: '20 de diciembre de 2024, 8:00 PM',
            prices: {
                butaca: '¢35,000',
                luneta: '¢35,000',
                palco: '¢28,000',
                galería: '¢12,000'
            },
            image: 'https://cdn.eticket.cr/imagenes/imgEventos/241126091402401_estelar_1200x400.jpg'
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
            <h2>Vista del Teatro Melico Salazar</h2>
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

export default TeatroMelicoSalazar;
