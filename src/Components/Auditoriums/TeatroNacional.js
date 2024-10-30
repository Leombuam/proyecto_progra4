import React, { useState } from 'react'; // Asegúrate de importar useState
import './TeatroNacional.css'; 

function TeatroNacional() {
    const [seats, setSeats] = useState(Array(100).fill('disponible')); 

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
        <div className="teatro-nacional">
            <button onClick={handleClose}>Cerrar</button>
            <h2>Vista del Teatro Nacional</h2>
            <p>Esta es la página del Teatro Nacional. Aquí puedes gestionar reservas y eventos.</p>
            
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

export default TeatroNacional;