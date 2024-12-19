import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react'; 
import './PurchasePage.css';

function PurchasePage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentDetails, setPaymentDetails] = useState('');
    const [vipCode, setVipCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);
    const [finalTotal, setFinalTotal] = useState(state?.total || 0);
    const previousPath = state?.previousPath || '/defaultPath';

    if (!state) {
        return <h1>No se encontraron datos de la compra</h1>;
    }

    const { selectedEvent, total, selectedSeats, prices } = state;

    const handleApplyVipCode = () => {
        if (vipCode === '202412') {
            const discountedTotal = total * 0.8;
            setFinalTotal(discountedTotal);
            setDiscountApplied(true);
            alert('¡Código VIP aplicado! Se ha descontado un 20% del total.');
        } else {
            alert('El código VIP ingresado no es válido.');
        }
    };

    const handleConfirmPurchase = () => {
        if (!paymentMethod) {
            alert('Por favor, seleccione un método de pago.');
            return;
        }
    
        if ((paymentMethod === 'tarjeta' || paymentMethod === 'sinpemovil') && !paymentDetails) {
            alert(`Por favor, ingrese los datos requeridos para el método de pago: ${paymentMethod}`);
            return;
        }
    
        const generatedOrderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
        setOrderId(generatedOrderId);
    
        setTimeout(() => {
            alert(`Compra confirmada con el número de orden: ${generatedOrderId}`);
            navigate(('/UserView'), { state: { reservationSuccess: true } }); 
        }, 1500);
    };
   

    const renderPaymentForm = () => {
        if (paymentMethod === 'tarjeta') {
            return (
                <div>
                    <label>
                        Número de Tarjeta:
                        <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={paymentDetails}
                            onChange={(e) => setPaymentDetails(e.target.value)}
                        />
                    </label>
                </div>
            );
        }

        if (paymentMethod === 'sinpemovil') {
            return (
                <div>
                    <label>
                        Número de Teléfono (Sinpe Móvil):
                        <input
                            type="text"
                            placeholder="8888 8888"
                            value={paymentDetails}
                            onChange={(e) => setPaymentDetails(e.target.value)}
                        />
                    </label>
                </div>
            );
        }

        if (paymentMethod === 'paypal') {
            return <p>Serás redirigido a PayPal para completar tu compra.</p>;
        }

        return null;
    };

    const generateQRData = () => {
        return JSON.stringify({
            orderId,
            selectedEvent,
            selectedSeats,
            total: finalTotal,
            paymentMethod,
        });
    };

    return (
        <div className="purchase-page-container">
            <h1>Confirmación de Compra</h1>
            <h2>Evento: {selectedEvent}</h2>

            <div className="purchase-details">
                <h3>Asientos seleccionados:</h3>
                <ul>
                    {selectedSeats.map((seat, index) => (
                        <li key={index}>
                            <strong>
                                Asiento: {seat.section.charAt(0).toUpperCase() + seat.section.slice(1)}
                            </strong>
                            <span>¢{prices[seat.section]}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="purchase-total">
                <p>Total: ¢{discountApplied ? <del>{total}</del> : total} {discountApplied && <strong>¢{finalTotal}</strong>}</p>
            </div>

            <div className="vip-code-section">
                <h3>¿Tienes un código VIP?</h3>
                <input
                    type="text"
                    placeholder="Ingresa tu código VIP"
                    value={vipCode}
                    onChange={(e) => setVipCode(e.target.value)}
                />
                <button onClick={handleApplyVipCode}>Aplicar Código</button>
            </div>

            <div className="payment-methods">
                <h3>Seleccione un método de pago:</h3>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="tarjeta"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Tarjeta (Ingrese su número de tarjeta)
                </label>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="sinpemovil"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Sinpe Móvil (Ingrese su número de teléfono)
                </label>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    PayPal (Serás redirigido a PayPal)
                </label>

                {renderPaymentForm()}
            </div>

            {orderId && (
                <div className="confirmation-message">
                    <p>Compra confirmada con el número de orden:</p>
                    <p>{orderId}</p>
                    <div className="qr-code">
                        <QRCodeCanvas value={generateQRData()} size={200} />
                        <p>Escanea este código QR para guardar tu compra.</p>
                    </div>
                </div>
            )}

            <button className="purchase-confirm-button" onClick={handleConfirmPurchase}>
                Confirmar Compra
            </button>
        </div>
    );
}

export default PurchasePage;
