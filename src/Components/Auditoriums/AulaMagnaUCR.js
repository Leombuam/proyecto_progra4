import React, { useState } from 'react';
import './AulaMagnaUCR.css';

function AulaMagnaUCR() {
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
        'Marimba de Concierto de Bellas Artes, Guatemala': {
            description: 'Disfruta de la tradicional Marimba de Concierto de Bellas Artes desde Guatemala, una velada llena de música cultural.',
            schedule: '10 de diciembre de 2024, 7:00 PM',
            prices: {
                butaca: '¢10,000',
                luneta: '¢8,000',
                palco: '¢5,000',
                galería: '¢3,500'
            },
            image: 'https://scontent-bog2-2.xx.fbcdn.net/v/t1.6435-9/82581660_153300832756793_8420944740052107264_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=o-twkR2OoAgQ7kNvgEK7ldI&_nc_zt=23&_nc_ht=scontent-bog2-2.xx&_nc_gid=AfICFRPm9qnXboHH0SGRH4q&oh=00_AYB-xWBGVQOQ2xkBtoX1iGS0GhSmBCaHopwgxJ2ayvsoUg&oe=6776DCB0'
        },
        'Concierto de la Orquesta Sinfónica UCR': {
            description: 'La Orquesta Sinfónica de la UCR presenta un concierto especial lleno de interpretaciones clásicas y contemporáneas.',
            schedule: '15 de diciembre de 2024, 8:00 PM',
            prices: {
                butaca: '¢8,000',
                luneta: '¢5,000',
                palco: '¢3,500',
                galería: '¢2,000'
            },
            image: 'https://scontent-bog2-2.xx.fbcdn.net/v/t1.6435-9/89070310_2793518514063340_5421020391441170432_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=epN1iErDqCYQ7kNvgHa5C_N&_nc_zt=23&_nc_ht=scontent-bog2-2.xx&_nc_gid=AiaFJtVImi1HKq0k63ku5na&oh=00_AYDV-DJznHeO4-5bYjKoSt_SlPityv01wnAt-y6dE1nJlA&oe=67770861'
        },
        'Campanas de Gratitud, Hermandad y Regocijo': {
            description: 'Vive la magia navideña con el espectáculo "Campanas de Gratitud, Hermandad y Regocijo", una noche llena de música y espíritu festivo.',
            schedule: '20 de diciembre de 2024, 6:00 PM',
            prices: {
                butaca: '¢2,000',
                luneta: '¢2,000',
                palco: '¢1,500',
                galería: '¢1,000'
            },
            image: 'https://cdn.viralagenda.com/images/events/ext/1225463-ff4cbd34ec9da189eb74780d2fe731dd.jpeg'
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
        <div className="aula-magna-ucr">
            <h2>Aula Magna UCR</h2>
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
                                    <p className="butaca">
                                        Butaca: {events[selectedEvent].prices.butaca}
                                    </p>
                                    <p className="luneta">
                                        Luneta: {events[selectedEvent].prices.luneta}
                                    </p>
                                    <p className="palco">
                                        Palco: {events[selectedEvent].prices.palco}
                                    </p>
                                    <p className="galería">
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
                            <span className="legend-item butaca">Butaca</span>
                            <span className="legend-item luneta">Luneta</span>
                            <span className="legend-item palco">Palco</span>
                            <span className="legend-item galería">Galería</span>
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

export default AulaMagnaUCR;



