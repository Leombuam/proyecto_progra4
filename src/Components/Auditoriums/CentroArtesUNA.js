import React, { useState } from 'react';
import './CentroArtesUNA.css'; // Crear un archivo CSS específico

function CentroArtesUNA() {
    const [seats, setSeats] = useState(Array(100).fill('disponible')); // Array de 100 asientos con estado 'disponible' inicial

    const handleSeatClick = (index) => {
        setSeats((prevSeats) => {
            const newSeats = [...prevSeats];
            newSeats[index] = newSeats[index] === 'disponible' ? 'seleccionado' : 'disponible';
            return newSeats;
        });
    };

    const handleReserve = () => {
        setSeats((prevSeats) =>
            prevSeats.map((seat) => (seat === 'seleccionado' ? 'ocupado' : seat))
        );
    };

    const handleClose = () => {
        window.close();
    };

    return (
        <div className="centro-artes-una">
            <button onClick={handleClose}>Cerrar</button>
            <h2>Vista del Centro para las Artes UNA</h2>
            <p>Esta es la página del Centro para las Artes UNA. Aquí puedes gestionar reservas y eventos.</p>
            
            <div className="screen">Escenario</div>
            
            <div className="seat-grid">
                {seats.map((seat, index) => (
                    <div
                        key={index}
                        className={`seat ${seat}`}
                        onClick={() => handleSeatClick(index)}
                    ></div>
                ))}
            </div>
            
            <button onClick={handleReserve}>Reservar</button>
            
            <div className="legend">
                <span className="legend-item disponible">Disponible</span>
                <span className="legend-item seleccionado">Seleccionado</span>
                <span className="legend-item ocupado">Ocupado</span>
            </div>
        </div>
    );
}

export default CentroArtesUNA;
