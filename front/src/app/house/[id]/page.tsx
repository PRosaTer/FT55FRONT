import React from "react";
import ContainerDetail from "@/components/container_detail";
import { getPropertyById, getPropertyOwner } from "@/api/PropertyAPI";

// Función para obtener los datos antes de renderizar la página
export async function getServerSideProps({ params }: { params: Record<string, string> }) {
  const house = await getPropertyById(params.id);

  if (!house) {
    return { notFound: true }; // Si no se encuentra la propiedad, devuelve 404
  }

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

  return {
    props: {
      property,
      owner: owner?.user_ || undefined,
    },
  };
}

// El componente para mostrar los detalles
const HouseDetail: React.FC<{ property: any; owner: any }> = ({ property, owner }) => {
  if (!property) {
    return <div>Error: Propiedad no encontrada</div>;
  }

  return <ContainerDetail property={property} owner={owner} />;
};

export default HouseDetail;