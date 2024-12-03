import React, { useState } from 'react';
import './CentroArtesUNA.css';

function CentroArtesUNA() {
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
        'Concierto con Jon Secada junto a la Costa Rica Jazz Orchestra': {
            description: 'Disfruta de una noche inolvidable con Jon Secada y la Costa Rica Jazz Orchestra, presentando una fusión única de jazz y pop.',
            schedule: '2 de diciembre de 2024, 6:00 PM',
            prices: {
                butaca: '¢30,000',
                luneta: '¢25,000',
                palco: '¢20,000',
                galería: '¢15,000'
            },
            image: 'https://www.nacion.com/resizer/v2/FUX5WWBP5RCDHHCJJCADGBB4ZE.jpg?smart=true&auth=5a33e4ed4a06673e14d3e09327969a3039c44d11a073541da57092887a270d14&width=1440&height=753'
        },
        'Danza Argentina “Malambeando”': {
            description: 'Sumérgete en la pasión y energía del malambo argentino con el espectáculo "Malambeando", una muestra vibrante de danza tradicional.',
            schedule: '5 de diciembre de 2024, 7:00 PM',
            prices: {
                butaca: '¢28,000',
                luneta: '¢23,000',
                palco: '¢18,000',
                galería: '¢12,000'
            },
            image: 'https://www.teatrebarcelona.com/wp-content/uploads/2018/05/malabeando-carrion-valladolid_detail.jpg'
        },
        'Concierto “Costa Rica en Concierto Sinfónico”': {
            description: 'La Orquesta Sinfónica Juvenil se une a destacados artistas nacionales como Éditus, Humberto Vargas, Suite Doble, Gaviota, Inconsciente Colectivo y Marfil para una noche sinfónica memorable.',
            schedule: '5 de diciembre de 2024, 6:00 PM',
            prices: {
                butaca: '¢35,000',
                luneta: '¢30,000',
                palco: '¢25,000',
                galería: '¢20,000'
            },
            image: 'https://orquestafilarmonica.com/wp-content/uploads/OrquestaFilarmonicaDeCostaRica_01.jpg'
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
        <div className="centro-artes-una">
            <h2>Centro de Artes de la UNA</h2>
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

export default CentroArtesUNA;
 

