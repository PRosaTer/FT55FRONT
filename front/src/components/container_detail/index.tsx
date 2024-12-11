// react
import React from 'react';

// components
import BackButton from '@/components/back_button';
import CardDetail from '@/components/card_detail';
import DescriptionDetail from '@/components/description_detail';



export const ContainerDetail: React.FC = () => {
console.log("eestoy en el contenedor");

    const propiedad_prueba = {
        place: "Bogotá, Colombia",
        guests: 4,
        bedrooms: 2,
        beds: 3,
        price: 10,
        checkin:"",
        checkout:"",
        owner: "user",
        img:[""],
        description:"",
        options: []

    }

  return (
    <div className="p-4">

      {/* Volver a la Home */}
      <BackButton />

      {/* Detalles de la Propiedad */}
      <CardDetail/>

      {/* Descripción y Mapa */}
      <DescriptionDetail/>
      
    </div>
  );
}

export default ContainerDetail;