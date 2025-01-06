//

import { Card } from "flowbite-react";
import Image from "next/image";

export default function CardProperties({
  name,
  id,
  city,
  price,
  photos,
  state,
  bedrooms,
  capacity,
}) {
  return (
    <div className="py-3 px-8 w-[500px] max-w-md">
      <Card key={id} className="my-auto">
        <Image width={300} height={300} src={photos} alt={name} />
        <h3 className="line-clamp-1 text-lg font-bold">{name}</h3>
        <p className="mt-2 mb-2 text-lg font-semibold">
          {city} - {state}
        </p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <span className="text-sm font-bold">Habitaciones</span>
          <p className="text-sm font-bold mb-2">{bedrooms}</p>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <span className="text-sm font-bold">Huéspedes</span>
          <p className="text-sm font-bold mb-2">{capacity}</p>
        </div>
        <span className="text-xl text-[#239b56] font-bold">
          ${price} Por noche
        </span>
      </Card>
    </div>
  );
}
