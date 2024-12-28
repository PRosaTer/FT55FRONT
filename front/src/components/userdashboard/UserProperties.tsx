import React, { useEffect, useState } from "react";
import { IPropiedad } from "@/interfaces/properties";
import RentPropertyForm from "@/components/propertyForm/page";
import PropertyDetail from "@/components/propertyDetail/page";
import { FiEdit } from "react-icons/fi";

const MyProperties: React.FC = () => {
  const [properties, setProperties] = useState<IPropiedad[]>([]);
  const [editingProperty, setEditingProperty] = useState<IPropiedad | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<IPropiedad | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          throw new Error("No se encontró información del usuario en el localStorage.");
        }

        const user = JSON.parse(storedUser);
        const userId = user.id;

        const response = await fetch(`http://localhost:3002/property/owner/${userId}`);
        if (!response.ok) {
          throw new Error("Error al obtener las propiedades.");
        }

        const data: IPropiedad[] = await response.json();
        setProperties(data);
      } catch (error: any) {
        console.error("Error al cargar las propiedades:", error);
        setError(error.message || "Ocurrió un error.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handlePropertyClick = (property: IPropiedad) => {
    setSelectedProperty(property); 
  };

  const handleEditClick = (property: IPropiedad) => {
    setEditingProperty(property);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (editingProperty) {
      const { name, value } = e.target;
      setEditingProperty((prev) =>
        prev
          ? { ...prev, [name]: name === "price" ? [Number(value)] : value }
          : null
      );
    }
  };

  const handleSaveClick = () => {
    if (editingProperty) {
      setProperties((prev) =>
        prev.map((property) =>
          property.id === editingProperty.id ? editingProperty : property
        )
      );
      setEditingProperty(null);
    }
  };

  const handleCancelClick = () => {
    setEditingProperty(null);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };


  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
    <h2 className="text-2xl font-bold mb-4">Mis Propiedades</h2>

    {loading && <p>Cargando propiedades...</p>}
    {error && <p className="text-red-500">{error}</p>}

    {selectedProperty ? (
      <PropertyDetail
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    ) : (
      <ul className="space-y-4">
        {properties.map((property) =>
          editingProperty && editingProperty.id === property.id ? (
            <li
              key={property.id}
              className="relative p-4 border border-gray-200 rounded-md shadow-sm"
            >
              <div className="mb-4">
                <label className="block font-semibold">Título:</label>
                <input
                  type="text"
                  name="title"
                  value={editingProperty.title}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Descripción:</label>
                <textarea
                  name="description"
                  value={editingProperty.description}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Precio:</label>
                <input
                  type="number"
                  name="price"
                  value={editingProperty.price?.[0] || 0}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <button
                onClick={handleSaveClick}
                className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
              >
                Guardar
              </button>
              <button
                onClick={handleCancelClick}
                className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 ml-2"
              >
                Cancelar
              </button>
            </li>
          ) : (
            <li
              key={property.id}
              className="relative p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
              onClick={() => handlePropertyClick(property)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick(property);
                }}
                className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-900"
              >
                <FiEdit />
              </button>
              <div className="flex items-center">
                <img
                  src={property.photos[0]}
                  alt={property.title}
                  className="w-48 h-48 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{property.title}</h3>
                  <p className="text-gray-600">{property.city}</p>
                  <p className="font-medium">
                    Precio por noche:{" "}
                    <span className="text-green-500">
                      ${property.price?.[0]}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Capacidad: {property.capacity} personas,{" "}
                    {property.bedrooms?.[0]} habitaciones,{" "}
                    {property.bathrooms} baño(s)
                  </p>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    )}

    <div className="flex justify-end mt-4">
      <button
        onClick={toggleFormVisibility}
        className="w-60 py-2 px-4 bg-velvet text-white font-semibold rounded-lg shadow-md hover:bg-[#273a6e] focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        {isFormVisible ? "Ocultar Formulario" : "Agregar Propiedad"}
      </button>
    </div>

    {isFormVisible && <RentPropertyForm />}
  </div>
    // <div className="bg-white p-6 rounded-md shadow-md mb-8">
    //   <h2 className="text-2xl font-bold mb-4">Mis Propiedades</h2>

    //   <ul className="space-y-4">
    //     {properties.map((property) =>
    //       editingProperty && editingProperty.id === property.id ? (
    //         <li
    //           key={property.id}
    //           className="relative p-4 border border-gray-200 rounded-md shadow-sm"
    //         >
    //           <div className="mb-4">
    //             <label className="block font-semibold">Título:</label>
    //             <input
    //               type="text"
    //               name="title"
    //               value={editingProperty.title}
    //               onChange={handleInputChange}
    //               className="border border-gray-300 rounded-md p-2 w-full"
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label className="block font-semibold">Descripción:</label>
    //             <textarea
    //               name="description"
    //               value={editingProperty.description}
    //               onChange={handleInputChange}
    //               className="border border-gray-300 rounded-md p-2 w-full"
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label className="block font-semibold">Precio:</label>
    //             <input
    //               type="number"
    //               name="price"
    //               value={editingProperty.price?.[0] || 0}
    //               onChange={handleInputChange}
    //               className="border border-gray-300 rounded-md p-2 w-full"
    //             />
    //           </div>
    //           <button
    //             onClick={handleSaveClick}
    //             className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
    //           >
    //             Guardar
    //           </button>
    //           <button
    //             onClick={handleCancelClick}
    //             className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 ml-2"
    //           >
    //             Cancelar
    //           </button>
    //         </li>
    //       ) : (
    //         <li
    //           key={property.id}
    //           className="relative p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
    //           onClick={() => handlePropertyClick(property)}
    //         >
    //           <button
    //             onClick={(e) => {
    //               e.stopPropagation();
    //               handleEditClick(property);
    //             }}
    //             className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-900"
    //           >
    //             <FiEdit />
    //           </button>
    //           <div className="flex items-center">
    //             <img
    //               src={property.photos[0]}
    //               alt={property.title}
    //               className="w-48 h-48 object-cover rounded-md mr-4"
    //             />
    //             <div>
    //               <h3 className="text-xl font-semibold">{property.title}</h3>
    //               <p className="text-gray-600">{property.city}</p>
    //               <p className="font-medium">
    //                 Precio por noche:{" "}
    //                 <span className="text-green-500">
    //                   ${property.price?.[0]}
    //                 </span>
    //               </p>
    //               <p className="text-sm text-gray-500">
    //                 Capacidad: {property.capacity} personas,{" "}
    //                 {property.bedrooms?.[0]} habitaciones, {property.bathrooms}{" "}
    //                 baño(s)
    //               </p>
    //             </div>
    //           </div>
    //         </li>
    //       )
    //     )}
    //   </ul>

    //   {selectedProperty && (
    //     <div className="mt-8 p-6 border border-gray-300 rounded-md shadow-md">
    //       <h3 className="text-2xl font-bold">{selectedProperty.title}</h3>
    //       <img
    //         src={selectedProperty.photos[0]}
    //         alt={selectedProperty.title}
    //         className="w-full h-64 object-cover rounded-md mt-4"
    //       />
    //       <p className="mt-4">{selectedProperty.description}</p>
    //       <p className="mt-2 font-semibold">
    //         Precio por noche: $
    //         {selectedProperty.price?.[0] !== undefined
    //         ? selectedProperty.price[0]
    //         : "No disponible"}
    //       </p>
    //       <p className="text-gray-600">
    //         Capacidad: {selectedProperty.capacity} personas,{" "}
    //         {selectedProperty.bedrooms?.[0]} habitaciones,{" "}
    //         {selectedProperty.bathrooms} baño(s)
    //       </p>
    //       <button
    //         onClick={() => setSelectedProperty(null)}
    //         className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
    //       >
    //         Cerrar
    //       </button>
    //     </div>
    //   )}


    //   <div className="flex justify-end mt-4">
    //     <button
    //       onClick={toggleFormVisibility}
    //       className="w-60 py-2 px-4 bg-velvet text-white font-semibold rounded-lg shadow-md hover:bg-[#273a6e] focus:outline-none focus:ring-2 focus:ring-gray-500"
    //     >
    //       {isFormVisible ? "Ocultar Formulario" : "Agregar Propiedad"}
    //     </button>
    //   </div>

    //   {isFormVisible && <RentPropertyForm />}
    // </div>
  );
};

export default MyProperties;




//CAMBIOS PARA FORMULARIO DE DATOS DEL PROPIETARIO

// MyProperties.tsx
// import React, { useState } from "react";
// import OwnerDetailsForm, { OwnerDetails } from "@/components/OwnerDetailsForm";
// import RentPropertyForm from "@/components/propertyForm/RentPropertyForm";
// import { IPropiedad } from "@/interfaces/properties";
// import { FiEdit } from "react-icons/fi";

// const MyProperties: React.FC = () => {
//   const [isOwnerDetailsComplete, setIsOwnerDetailsComplete] = useState(false);
//   const [ownerDetails, setOwnerDetails] = useState<OwnerDetails | null>(null);
//   const [properties, setProperties] = useState<IPropiedad[]>([]);
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   const handleOwnerDetailsComplete = (details: OwnerDetails) => {
//     setOwnerDetails(details);
//     setIsOwnerDetailsComplete(true);
//   };

//   const handleAddProperty = (newProperty: IPropiedad) => {
//     setProperties((prev) => [...prev, newProperty]);
//   };

//   const toggleFormVisibility = () => {
//     setIsFormVisible(!isFormVisible);
//   };

//   if (!isOwnerDetailsComplete) {
//     return (
//       <div className="container mx-auto mt-8">
//         <OwnerDetailsForm onComplete={handleOwnerDetailsComplete} />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto mt-8">
//       <h2 className="text-2xl font-bold mb-4">Mis Propiedades</h2>
//       <ul className="space-y-4">
//         {properties.map((property) => (
//           <li
//             key={property.id}
//             className="relative p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
//           >
//             <button
//               onClick={() => alert("Editar propiedad")}
//               className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-900"
//             >
//               <FiEdit />
//             </button>
//             <div className="flex items-center">
//               <img
//                 src={property.photos[0]}
//                 alt={property.title}
//                 className="w-48 h-48 object-cover rounded-md mr-4"
//               />
//               <div>
//                 <h3 className="text-xl font-semibold">{property.title}</h3>
//                 <p className="text-gray-600">{property.city}</p>
//                 <p className="font-medium">
//                   Precio por noche:{" "}
//                   <span className="text-green-500">${property.price?.[0]}</span>
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Capacidad: {property.capacity} personas,{" "}
//                   {property.bedrooms?.[0]} habitaciones, {property.bathrooms} baño(s)
//                 </p>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div className="flex justify-end mt-4">
//         <button
//           onClick={toggleFormVisibility}
//           className="w-60 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
//         >
//           {isFormVisible ? "Ocultar Formulario" : "Agregar Propiedad"}
//         </button>
//       </div>
//       {isFormVisible && <RentPropertyForm onComplete={handleAddProperty} />}
//     </div>
//   );
// };

// export default MyProperties;

