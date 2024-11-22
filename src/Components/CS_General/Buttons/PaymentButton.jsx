import React, { useState, useEffect } from 'react';
import { Wallet } from '@mercadopago/sdk-react';
import { createPreference } from '../../../Services/mercadoPagoService';

const PaymentButton = () => {
    const [preferenceId, setPreferenceId] = useState(null);

    useEffect(() => {
        const fetchPreference = async () => {
            const userBuyer = {
                title: 'Producto de ejemplo',
                quantity: 1,
                unit_price: 100, // Precio en soles
            };

            try {
                const id = await createPreference(userBuyer); // Llama a tu backend para obtener el ID de la preferencia
                setPreferenceId(id);
            } catch (error) {
                console.error('Error al crear la preferencia:', error);
            }
        };

        fetchPreference();
    }, []);

    return (
        <div>
            <h2>Pagar con Mercado Pago</h2>
            {preferenceId ? (
                <Wallet
                    initialization={{
                        preferenceId: preferenceId, // ID de la preferencia desde el backend
                    }}
                    customization={{
                        texts: { valueProp: 'smart_option' }, // Personalización del texto
                    }}
                />
            ) : (
                <p>Generando preferencia de pago...</p>
            )}
        </div>
    );
};

export default PaymentButton;
