import React, { useState } from 'react';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { getAuth, signOut } from 'firebase/auth';
import { QRCodeCanvas } from 'qrcode.react';
import './UserView.css';
import app from '../firebaseconfig';

const db = getDatabase(app);
const auth = getAuth(app);

function UserView() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showQRCode, setShowQRCode] = useState(false);

    const auditoriums = [
        { name: "Aula Magna UCR", path: "/aula-magna-ucr" },
        { name: "Centro para las Artes TEC", path: "/centro-artes-tec" },
        { name: "Centro para las Artes UNA", path: "/centro-artes-una" },
        { name: "Teatro Melico Salazar", path: "/teatro-melico-salazar" },
        { name: "Teatro Nacional", path: "/teatro-nacional" },
    ];

    const handleAuditoriumSelection = (path) => {
        window.open(`${window.location.origin}${path}`, '_blank');
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
        signOut(auth)
            .then(() => {
                console.log("Sesión cerrada exitosamente.");                
                window.location.href = '/';
            })
            .catch((error) => {
                console.error("Error al cerrar sesión:", error);
                alert("Hubo un error al intentar cerrar sesión. Inténtalo de nuevo.");
            });
    }
    
    return (
        <div>
            <header className="header-bar">
                <button className="nav-button" onClick={() => alert("Información de perfil")}>Perfil</button>
                <button className="nav-button" onClick={() => alert("Notificaciones")}>Notificaciones</button>
                <button className="nav-button" onClick={handleLogout}>Cerrar sesión</button>
            </header>
            <h1>Bienvenido</h1>
            <h2>Seleccione un Auditorio</h2>
            <ul>
                {auditoriums.map(auditorium => (
                    <li key={auditorium.name} onClick={() => handleAuditoriumSelection(auditorium.path)}>
                        {auditorium.name}
                    </li>
                ))}
            </ul>
            {selectedEvent && (
                <div className="event-container">
                    <h3>{selectedEvent.name}</h3>
                    <p>{selectedEvent.description}</p>
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
                    <button className="confirm-purchase" onClick={handlePurchase}>Confirmar compra</button>
                    {showQRCode && (
                        <div className="qr-container">
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







