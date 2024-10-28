import React, { useState } from 'react';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { getAuth, signOut } from 'firebase/auth';
import { QRCodeCanvas } from 'qrcode.react';
import './UserView.css';
import app from '../firebaseconfig';

const db = getDatabase(app);
const auth = getAuth(app);
const auditoriumContext = require.context('./Auditoriums', false, /\.js$/);
const auditoriums = auditoriumContext.keys().map((key) => ({
    name: key.replace('./', '').replace('.js', ''),
    Component: auditoriumContext(key).default,
}));

function UserView() {
    const [selectedAuditorium, setSelectedAuditorium] = useState(null);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showQRCode, setShowQRCode] = useState(false);

    const handleAuditoriumSelection = (auditorium) => {
        setSelectedAuditorium(auditorium);
        const eventsRef = ref(db, 'events');
        onValue(eventsRef, (snapshot) => {
            const data = snapshot.val();
            const eventsList = data ? Object.values(data).filter(event => event.auditoriumId === auditorium.name) : [];
            setEvents(eventsList);
            setSelectedEvent(null);
        });
    };

    function handleEventSelection(eventId) {
        const eventRef = ref(db, `events/${eventId}`);
        onValue(eventRef, (snapshot) => {
            setSelectedEvent({ id: eventId, ...snapshot.val() });
            setSelectedSeats([]);
            setShowQRCode(false);
        });
    }

    function handleSeatSelection(seat) {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    }

    function handlePurchase() {
        if (selectedSeats.length === 0) {
            alert("Selecciona al menos un asiento.");
            return;
        }
        const eventSeatsRef = ref(db, `events/${selectedEvent.id}/seats`);
        const updates = {};
        selectedSeats.forEach(seat => {
            updates[seat] = { status: 'reserved' };
        });
        update(eventSeatsRef, updates)
            .then(() => {
                setShowQRCode(true);
                alert("Compra simulada, revisa tu correo para el código QR.");
            });
    }

    function handleLogout() {
        signOut(auth);
    }

    return (
        <div>
            {/* Nueva barra de menú */}
            <header className="header-bar">
                <button className="nav-button" onClick={() => alert("Información de perfil")}>Perfil</button>
                <button className="nav-button" onClick={() => alert("Notificaciones")}>Notificaciones</button>
                <button className="nav-button" onClick={handleLogout}>Cerrar sesión</button>
            </header>
            {/* Título de bienvenida */}
            <h1>Bienvenido</h1>
            {/* Selección de auditorios */}
            <h2>Seleccione un Auditorio</h2>
            <ul>
                {auditoriums.map(auditorium => (
                    <li key={auditorium.name} onClick={() => handleAuditoriumSelection(auditorium)}>
                        {auditorium.name}
                    </li>
                ))}
            </ul>
            {/* Mostrar información del auditorio */}
            {selectedAuditorium && (
                <div>
                    <selectedAuditorium.Component />
                </div>
            )}
            {/* Mostrar eventos */}
            {selectedAuditorium && events.length > 0 && (
                <div>
                    <h3>Eventos disponibles en {selectedAuditorium.name}:</h3>
                    {events.map(event => (
                        <button key={event.id} onClick={() => handleEventSelection(event.id)}>
                            {event.name}
                        </button>
                    ))}
                </div>
            )}
            {selectedEvent && (
                <div>
                    <h3>{selectedEvent.name}</h3>
                    <p>{selectedEvent.description}</p>
                    {/* Selección de asientos */}
                    <h4>Selecciona tus asientos:</h4>
                    <div className="seating-chart">
                        {selectedEvent.seats && selectedEvent.seats.map((seat, index) => (
                            <button
                                key={index}
                                className={selectedSeats.includes(seat) ? 'selected' : ''}
                                onClick={() => handleSeatSelection(seat)}
                            >
                                {seat}
                            </button>
                        ))}
                    </div>
                    {/* Confirmar compra */}
                    <button onClick={handlePurchase}>Confirmar compra</button>
                    {/* Mostrar QR */}
                    {showQRCode && (
                        <div>
                            <h4>Tu código QR para el evento</h4>
                            <QRCodeCanvas value={`event:${selectedEvent.id},seats:${selectedSeats.join(',')}`} size={128} />
                            <p>Recuerda llegar con 30 minutos de anticipación. Las entradas se liberan 10 minutos después del inicio.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserView;


