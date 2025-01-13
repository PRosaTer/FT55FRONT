import React, { useState } from "react";
import { IPropiedad } from "@/interfaces/properties";
import PropertyForm from "./forms/PropertyForm"
import PropertyEditForm from "./forms/PropertyEditForm";
import useProperties from "@/hooks/UserDashboard/useProperties";
import { FiEdit } from "react-icons/fi";

const MyProperties: React.FC = () => {
  const { properties, loading, error } = useProperties();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingProperty, setEditingProperty] = useState<IPropiedad | null>(null);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    setEditingProperty(null);
  };

  const handleEditClick = (property: IPropiedad) => {
    setEditingProperty(property);
  };

  if (loading) return <p>Cargando propiedades...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
    <h2 className="text-2xl font-bold mb-4">Mis Propiedades</h2>

    {editingProperty ? (
      <PropertyEditForm
        property={editingProperty}
        onCancel={() => setEditingProperty(null)}
      />
    ) : (
      <>
        <ul className="space-y-4">
          {properties.map((property) => {
            const imageUrl =
              property.image_ && property.image_.length > 0
                ? property.image_[0].url
                : "/placeholder-image.png";
            return (
              <li
                key={property.id}
                className="relative p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200 cursor-pointer"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(property);
                  }}
                  className="absolute top-2 right-2 p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                >
                  <FiEdit />
                </button>
                <img
                  src={imageUrl}
                  alt={`Imagen de ${property.name}`}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold">{property.name}</h3>
                <p className="text-gray-600">{property.city}</p>
                <p className="font-medium">
                  Precio por noche:{" "}
                  <span className="text-green-500">${property.price}</span>
                </p>
              </li>
            );
          })}
        </ul>
        {isFormVisible && editingProperty && (
          <PropertyForm
            property={editingProperty}
            onCancel={() => setIsFormVisible(false)}
          />
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={toggleFormVisibility}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg"
          >
            {isFormVisible ? "Cancelar" : "Añadir Nueva Propiedad"}
          </button>
        </div>
      </>
    )}
  </div>
);
};

export default MyProperties;