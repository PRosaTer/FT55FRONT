// import React from "react";
// import ContainerDetail from "@/components/container_detail";
// import { getPropertyById, getPropertyOwner } from "@/api/PropertyAPI";

// // Tipo para props
// interface HouseDetailProps {
//   params: { id: string };
// }

// const HouseDetail: React.FC<HouseDetailProps> = async ({ params }) => {
//   try {
//     // Obtener la propiedad por ID
//     const house = await getPropertyById(params.id);

//     if (!house) {
//       return <div>Error: Propiedad no encontrada</div>;
//     }

//     // Construir objeto propiedad
//     const property = {
//       ...house,
//       photos: house.image_?.map((img) => img.url) || [],
//     };

//     // Obtener el propietario si está disponible
//     const ownerId = property.account_?.id;
//     let owner = null;
//     if (ownerId) {
//       owner = await getPropertyOwner(ownerId);
//       console.log("Propietario:", owner);
//     } else {
//       console.warn("No account ID found in property data.");
//     }

//     // Renderizar el componente con los datos
//     return <ContainerDetail property={property} owner={owner?.user_} />;
//   } catch (error) {
//     console.error("Error cargando los detalles de la propiedad:", error);
//     return <div>Error al cargar la propiedad</div>;
//   }
// };

// export default HouseDetail;

import React from "react";
import ContainerDetail from "@/components/container_detail";
import { getPropertyById, getPropertyOwner } from "@/api/PropertyAPI";

// Esta función se ejecutará en el servidor para obtener los datos antes de renderizar la página
export async function getServerSideProps({ params }: { params: { id: string } }) {
  const house = await getPropertyById(params.id);

    if (!house) {
      return <div>Error: Propiedad no encontrada</div>;
    }

    // Construir objeto propiedad
    const property = {
      ...house,
      photos: house.image_?.map((img) => img.url) || [],
    };

  if (!property) {
    return { notFound: true }; // Si no se encuentra la propiedad, se devuelve un 404
  }

  const ownerId = property.account_?.id;
  let owner = null;
  if (ownerId) {
    owner = await getPropertyOwner(ownerId);
  } else {
    console.warn("No account ID found in property data.");
  }

  return {
    props: {
      property,
      owner: owner?.user_ || null,
    },
  };
}

// El componente que renderiza la propiedad y su propietario
const HouseDetail: React.FC<{ property: any; owner: any }> = ({ property, owner }) => {
  if (!property) {
    return <div>Error: Propiedad no encontrada</div>;
  }

  return <ContainerDetail property={property} owner={owner} />;
};

export default HouseDetail;
