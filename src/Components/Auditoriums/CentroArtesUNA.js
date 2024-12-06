import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CentroArtesUNA.css';

function CentroArtesUNA() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [seats, setSeats] = useState([]);
    const navigate = useNavigate();

    const events = {
        'Concierto con Jon Secada junto a la Costa Rica Jazz Orchestra': {
            description: 'Disfruta de una noche inolvidable con Jon Secada y la Costa Rica Jazz Orchestra, presentando una fusión única de jazz y pop.',
            schedule: '2 de diciembre de 2024, 6:00 PM',
            prices: {
                butaca: 30000,
                luneta: 25000,
                palco: 20000,
                galería: 15000,
            },
            image: 'https://www.nacion.com/resizer/v2/FUX5WWBP5RCDHHCJJCADGBB4ZE.jpg?smart=true&auth=5a33e4ed4a06673e14d3e09327969a3039c44d11a073541da57092887a270d14&width=1440&height=753',
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
    };

    useEffect(() => {
        const storedSeats = localStorage.getItem('reservedSeatsCentroArtesUNA');
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
        localStorage.setItem('reservedSeatsCentroArtesUNA', JSON.stringify(updatedSeats));

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

export default CentroArtesUNA;
