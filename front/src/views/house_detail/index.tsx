import React from "react";
import ContainerDetail from "@/components/container_detail";
import { getPropertyById, getPropertyOwner } from "@/api/PropertyAPI";

// Tipo para props
interface HouseDetailProps {
  params: { id: string };
}

const HouseDetail: React.FC<HouseDetailProps> = async ({ params }) => {
  try {
    // Obtener la propiedad por ID
    const house = await getPropertyById(params.id);

    if (!house) {
      return <div>Error: Propiedad no encontrada</div>;
    }

    // Construir objeto propiedad
    const property = {
      ...house,
      photos: house.image_?.map((img) => img.url) || [],
    };

    // Obtener el propietario si está disponible
    const ownerId = property.account_?.id;
    let owner = null;
    if (ownerId) {
      owner = await getPropertyOwner(ownerId);
      console.log("Propietario:", owner);
    } else {
      console.warn("No account ID found in property data.");
    }

    // Renderizar el componente con los datos
    return <ContainerDetail property={property} owner={owner?.user_} />;
  } catch (error) {
    console.error("Error cargando los detalles de la propiedad:", error);
    return <div>Error al cargar la propiedad</div>;
  }
};

export default HouseDetail;
