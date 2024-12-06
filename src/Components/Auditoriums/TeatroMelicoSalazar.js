import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeatroMelicoSalazar.css';

function TeatroMelicoSalazar() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [seats, setSeats] = useState([]);
    const navigate = useNavigate();

    const events = {
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
    };

    useEffect(() => {
        const storedSeats = localStorage.getItem('reservedSeatsTeatroMelicoSalazar');
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
        localStorage.setItem('reservedSeatsTeatroMelicoSalazar', JSON.stringify(updatedSeats));

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
        <div className="teatro-melico-salazar">
            <h2>Teatro Melico Salazar</h2>
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

export default TeatroMelicoSalazar;
