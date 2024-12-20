// "use client"

// react
import React from "react";

// components
import BackButton from "@/components/back_button";
import CardDetail from "@/components/card_detail";
import DescriptionDetail from "@/components/description_detail";
import BookingDetail from "../booking_detail";
import { GoogleMaps } from "../map";
import ReviewsContainer from "../reviews_container";
import { IProperty } from '@/interfaces/IProperty';
import { user } from '@/helpers/data';

interface IPropsDetail {
  property : IProperty;
  owner?: user
}

export const ContainerDetail: React.FC<IPropsDetail> = ({property, owner}) => {
  return (
    <div className="p-4">
      {/* Volver a la Home */}
      <BackButton />

      {/* Detalles de la Propiedad */}
      <CardDetail property={property} owner={owner}/>

      <div className='flex flex-col lg:flex-row lg:gap-8 lg:mx-12 mb-8'>
      {/* Descripción */}
      <div className='lg:w-1/2'>
        <DescriptionDetail {...property}/>
      </div>
      
      {/* Calendario y cantidad de viajeros */}
      <div className='lg:w-1/2'>
        <BookingDetail/>
      </div>
      </div>

      {/* Mapa */}
      <GoogleMaps />

      <hr className="border-t border-gray-300 my-4" />

      <ReviewsContainer />
    </div>
  );
};

export default ContainerDetail;
