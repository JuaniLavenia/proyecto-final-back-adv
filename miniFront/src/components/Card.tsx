// Card.tsx

import React from 'react';

interface Card {
  imageSrc: string;
  price?: number;
  onClick?: () => void
}

const Card: React.FC<Card> = ({ imageSrc, price, onClick }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', textAlign: 'center' }}>
      <img src={imageSrc} alt="Producto" style={{ maxWidth: '100%' }} />
      {price && <p>Precio: ${price.toFixed(2)}</p>}
      <button onClick={onClick} disabled={!onClick}>Agregar al carrito</button>
    </div>
  );
};

export default Card;
