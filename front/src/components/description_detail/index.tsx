// react
import React from 'react';

// next
import Link from 'next/link';


export const DescriptionDetail: React.FC = () => {
return (
   <div className="p-4 rounded-lg lg:mx-60">
        <h3 className="text-xl font-semibold mb-2">Acerca de este alojamiento</h3>
        <p className="text-gray-600 mb-4">
          Aquí va la descripción detallada del alojamiento.
        </p>
        <h3 className="text-xl font-bold mb-2">¿Qué ofrece este lugar?</h3>
        <ul className="list-disc list-inside mb-4">
          <li>WiFi</li>
          <li>Estacionamiento en el lugar</li>
          <li>Cocina</li>
          <li>Permite mascotas</li>
          <li>Permite menores</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">¿Dónde vas a estar?</h3>
        <div className="h-64 w-full rounded-lg bg-gray-300">
          Mapa aquí
        </div>
      </div>
)
}

export default DescriptionDetail