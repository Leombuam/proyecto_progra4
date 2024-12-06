import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CentroArtesTEC.css';

function CentroArtesTEC() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [seats, setSeats] = useState([]);
    const navigate = useNavigate();

    // Definición de eventos
    const events = {
        'Navidad con Aire Oriental: Danza del Vientre': {
            description: 'Disfruta de una mágica noche navideña con presentaciones de danza del vientre, fusionando ritmos orientales con el espíritu festivo.',
            schedule: '10 de diciembre de 2024, 7:00 PM',
            prices: {
                butaca: 10000,
                luneta: 8000,
                palco: 5000,
                galería: 3000,
            },
            image: 'https://www.tec.ac.cr/sites/default/files/media/img/main/afiche_dicimbre_2024-jpg.jpg',
        },
        'Sesiones La Jauría y Aulladoras': {
            description: 'Vive una noche de rock alternativo con las bandas nacionales La Jauría y Aulladoras, presentando sus más recientes éxitos.',
            schedule: '15 de diciembre de 2024, 8:00 PM',
            prices: {
                butaca: 15000,
                luneta: 12000,
                palco: 8000,
                galería: 5000,
            },
            image: 'https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/colorbox/public/media/img/gallery/275678063_5061560043889846_3943563635622391448_n.jpg',
        },
        'Concierto Navideño': {
            description: 'Únete a la celebración navideña con un concierto especial que incluye villancicos y melodías tradicionales interpretadas por talentosos músicos locales.',
            schedule: '20 de diciembre de 2024, 6:00 PM',
            prices: {
                butaca: 30000,
                luneta: 25000,
                palco: 20000,
                galería: 15000,
            },
            image: 'https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/colorbox/public/media/img/main/concierto_navideno_tec_2023_rgarita-18.jpg',
        },
    };

    // Cargar asientos desde localStorage al inicio
    useEffect(() => {
        const storedSeats = localStorage.getItem('reservedSeatsCentroArtesTEC');
        if (storedSeats) {
            setSeats(JSON.parse(storedSeats));
        } else {
            // Inicializar los asientos si no existen en localStorage
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

        // Actualizar el estado de los asientos y guardarlos en localStorage
        const updatedSeats = seats.map((seat) =>
            seat.status === 'seleccionado' ? { ...seat, status: 'ocupado' } : seat
        );
        setSeats(updatedSeats);
        localStorage.setItem('reservedSeatsCentroArtesTEC', JSON.stringify(updatedSeats));

        // Redirigir a la página de compra
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
        <div className="centro-artes-tec">
            <h2>Centro de las Artes del TEC</h2>
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

export default CentroArtesTEC;
