import React, { useState } from 'react';
import './CentroArtesTEC.css';

function CentroArtesTEC() {
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
        'Navidad con Aire Oriental: Danza del Vientre': {
            description: 'Disfruta de una mágica noche navideña con presentaciones de danza del vientre, fusionando ritmos orientales con el espíritu festivo.',
            schedule: '10 de diciembre de 2024, 7:00 PM',
            prices: {
                butaca: '¢10,000',
                luneta: '¢8,000',
                palco: '¢5,000',
                galería: '¢3,000'
            },
            image: 'https://www.tec.ac.cr/sites/default/files/media/img/main/afiche_dicimbre_2024-jpg.jpg'
        },
        'Sesiones La Jauría y Aulladoras': {
            description: 'Vive una noche de rock alternativo con las bandas nacionales La Jauría y Aulladoras, presentando sus más recientes éxitos.',
            schedule: '15 de diciembre de 2024, 8:00 PM',
            prices: {
                butaca: '¢15,000',
                luneta: '¢12,000',
                palco: '¢8,000',
                galería: '¢5,000'
            },
            image: 'https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/colorbox/public/media/img/gallery/275678063_5061560043889846_3943563635622391448_n.jpg'
        },
        'Concierto Navideño': {
            description: 'Únete a la celebración navideña con un concierto especial que incluye villancicos y melodías tradicionales interpretadas por talentosos músicos locales.',
            schedule: '20 de diciembre de 2024, 6:00 PM',
            prices: {
                butaca: '¢30,000',
                luneta: '¢25,000',
                palco: '¢20,000',
                galería: '¢15,000'
            },
            image: 'https://www.tec.ac.cr/hoyeneltec/sites/default/files/styles/colorbox/public/media/img/main/concierto_navideno_tec_2023_rgarita-18.jpg'
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

export default CentroArtesTEC;
