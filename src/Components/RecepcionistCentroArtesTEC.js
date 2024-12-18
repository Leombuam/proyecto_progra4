import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auditoriums/CentroArtesTEC.css';

function RecepcionistCentroArtesTEC() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [attendees, setAttendees] = useState({});
    const [seats, setSeats] = useState({});
    const [searchCode, setSearchCode] = useState('');

    const auth = getAuth();
    const navigate = useNavigate();

    // Eventos programados
    const scheduledEvents = {
        'Navidad con Aire Oriental: Danza del Vientre': {
            description: 'Una noche mágica con danza del vientre y ritmos orientales navideños.',
            schedule: '10 de diciembre de 2024, 7:00 PM',
        },
        'Sesiones La Jauría y Aulladoras': {
            description: 'Noche de rock alternativo con las mejores bandas nacionales.',
            schedule: '15 de diciembre de 2024, 8:00 PM',
        },
        'Concierto Navideño': {
            description: 'Villancicos y melodías tradicionales en un concierto navideño especial.',
            schedule: '20 de diciembre de 2024, 6:00 PM',
        },
    };

    useEffect(() => {
        setEvents(Object.entries(scheduledEvents));
        const storedAttendees = localStorage.getItem('attendeesCentroArtesTEC') || '{}';
        setAttendees(JSON.parse(storedAttendees));
        const storedSeats = localStorage.getItem('reservedSeatsCentroArtesTEC') || '{}';
        setSeats(JSON.parse(storedSeats));
    }, []);

    const handleEventSelect = (eventName) => {
        setSelectedEvent(eventName);
    };

    const markAttendance = (code) => {
        const updatedAttendees = {
            ...attendees,
            [selectedEvent]: [...(attendees[selectedEvent] || []), code],
        };
        setAttendees(updatedAttendees);
        localStorage.setItem('attendeesCentroArtesTEC', JSON.stringify(updatedAttendees));
    };

    const handleSearchCode = () => {
        if (!selectedEvent) {
            alert('Selecciona un evento primero.');
            return;
        }
        if (searchCode.trim() === '') {
            alert('Ingresa un código para buscar.');
            return;
        }
        const attendeesList = attendees[selectedEvent] || [];
        if (attendeesList.includes(searchCode.trim())) {
            alert(`El código "${searchCode}" ya está registrado como asistido.`);
        } else {
            alert(`El código "${searchCode}" no está registrado.`);
        }
    };

    const handleSimulateQrScan = () => {
        const fakeQrCode = prompt('Escaneo QR: Ingresa un código manualmente:');
        if (fakeQrCode) {
            markAttendance(fakeQrCode);
            alert(`El código "${fakeQrCode}" ha sido registrado como asistido.`);
        }
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('Sesión cerrada exitosamente.');
                navigate('/');
            })
            .catch((error) => {
                console.error('Error al cerrar sesión:', error);
                alert('Hubo un error al intentar cerrar sesión. Inténtalo de nuevo.');
            });
    };

    return (
        <div className="receptionist-view">
            <button onClick={handleLogout} className="logout-button">
                Cerrar sesión
            </button>
            <h2>Vista del Recepcionista - Centro de Artes TEC</h2>
            <p>Regula las entradas y el acceso para los eventos.</p>

            <div>
                <h3>Selecciona un Evento</h3>
                <ul className="event-list">
                    {events.map(([eventName, eventDetails]) => (
                        <li
                            key={eventName}
                            onClick={() => handleEventSelect(eventName)}
                            className="event-item"
                        >
                            <strong>{eventName}</strong> - {eventDetails.schedule}
                        </li>
                    ))}
                </ul>
            </div>

            {selectedEvent && (
                <div>
                    <h3>Evento Seleccionado</h3>
                    <p><strong>{selectedEvent}</strong></p>
                    <p>{scheduledEvents[selectedEvent].description}</p>
                    <p><strong>Horario:</strong> {scheduledEvents[selectedEvent].schedule}</p>

                    <h4>Asientos Disponibles y Ocupados</h4>
                    <div className="screen">Escenario</div>
                    <div className="seat-grid">
                        {(seats[selectedEvent] || Array(100).fill({ status: 'disponible' })).map(
                            (seat, index) => (
                                <div
                                    key={index}
                                    className={`seat ${seat.status}`}
                                    title={`Asiento ${index + 1}`}
                                ></div>
                            )
                        )}
                    </div>

                    <h4>Buscar Código de Entrada</h4>
                    <input
                        type="text"
                        placeholder="Ingresa el código"
                        value={searchCode}
                        onChange={(e) => setSearchCode(e.target.value)}
                    />
                    <button onClick={handleSearchCode} className="search-button">
                        Buscar
                    </button>

                    <h4>Registrar Entrada (Escaneo QR Simulado)</h4>
                    <button onClick={handleSimulateQrScan} className="qr-button">
                        Registrar Código
                    </button>

                    <ul>
                        {(attendees[selectedEvent] || []).map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default RecepcionistCentroArtesTEC;