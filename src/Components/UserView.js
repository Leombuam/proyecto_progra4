import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { getAuth, signOut } from 'firebase/auth';
import { QRCodeCanvas } from 'qrcode.react'; 
import './UserView.css'; 
import app from '../firebaseconfig';

const db = getDatabase(app);
const auth = getAuth(app);

function UserView() {
    const [auditoriums, setAuditoriums] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedAuditoriumId, setSelectedAuditoriumId] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showQRCode, setShowQRCode] = useState(false);

    useEffect(() => {
        const auditoriumsRef = ref(db, 'auditoriums');
        onValue(auditoriumsRef, (snapshot) => {
            const data = snapshot.val();
            setAuditoriums(data ? Object.values(data) : []);
        });
    }, []);

    useEffect(() => {
        if (selectedAuditoriumId) {
            const eventsRef = ref(db, 'events');
            onValue(eventsRef, (snapshot) => {
                const data = snapshot.val();
                const eventsList = data ? Object.values(data) : [];
                setEvents(eventsList.filter(event => event.auditoriumId === selectedAuditoriumId));
            });
        }
    }, [selectedAuditoriumId]);

    function handleEventSelection(eventId) {
        const eventRef = ref(db, `events/${eventId}`);
        onValue(eventRef, (snapshot) => {
            setSelectedEvent({ id: eventId, ...snapshot.val() });
            setSelectedSeats([]); // Reset selected seats when changing event
            setShowQRCode(false); // Reset QR code visibility when changing event
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
            {/* Barra de menú */}
            <nav>
                <button onClick={() => alert("Información de perfil")}>Perfil</button>
                <button onClick={() => alert("Notificaciones")}>Notificaciones</button>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </nav>

            {/* Selección de auditorios */}
            <h2>Seleccione un Auditorio</h2>
            <ul>
                {auditoriums.map(auditorium => (
                    <li key={auditorium.id} onClick={() => setSelectedAuditoriumId(auditorium.id)}>
                        {auditorium.name}
                    </li>
                ))}
            </ul>

            {/* Mostrar eventos */}
            {selectedAuditoriumId && events.length > 0 && (
                <div>
                    <h3>Eventos disponibles:</h3>
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
                                {seat }
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
