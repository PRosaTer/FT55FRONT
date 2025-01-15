// import React from "react";
// import ContainerDetail from "@/components/container_detail";
// import { getPropertyById, getPropertyOwner } from "@/api/PropertyAPI";

// // El componente de servidor que obtiene los datos
// export default async function HouseDetail({ params }: { params: { id: string } }) {
//   const { id } = params;

//   // Obtención de la propiedad por ID
//   const house = await getPropertyById(id);

//   if (!house) {
//     return <div>Error: Propiedad no encontrada</div>;
//   }

//   // Construcción del objeto propiedad
//   const property = {
//     ...house,
//     photos: house.image_?.map((img) => img.url) || [],
//   };

//   const ownerId = property.account_?.id;
//   let owner = null;
//   if (ownerId) {
//     owner = await getPropertyOwner(ownerId);
//   } else {
//     console.warn("No account ID found in property data.");
//   }

//   return <ContainerDetail property={property} owner={owner?.user_ || undefined} />;
// }
import React from "react";
import ContainerDetail from "@/components/container_detail";
import { getPropertyById, getPropertyOwner } from "@/api/PropertyAPI";

// El tipo Params debe coincidir con lo que espera Next.js para los parámetros de la URL
interface Params {
  id: string;
}

// El componente de servidor que obtiene los datos
export default async function HouseDetail({ params }: { params: Params }) {
  const { id } = params;

  // Obtención de la propiedad por ID
  const house = await getPropertyById(id);

  if (!house) {
    return <div>Error: Propiedad no encontrada</div>;
  }

  // Construcción del objeto propiedad
  const property = {
    ...house,
    photos: house.image_?.map((img) => img.url) || [],
  };

  const ownerId = property.account_?.id;
  let owner = null;
  if (ownerId) {
    owner = await getPropertyOwner(ownerId);
  } else {
    console.warn("No account ID found in property data.");
  }

  return <ContainerDetail property={property} owner={owner?.user_ || undefined} />;
}
