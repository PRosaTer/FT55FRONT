import React, { useEffect, useState } from "react";
import { IPropiedad } from "@/interfaces/properties";
import RentPropertyForm from "@/components/propertyForm/page";
import { FiEdit } from "react-icons/fi";

const MyProperties: React.FC = () => {
  const [properties, setProperties] = useState<IPropiedad[]>([]);
  const [editingProperty, setEditingProperty] = useState<IPropiedad | null>(
    null
  );
  const [isFormVisible, setIsFormVisible] = useState(false);

  const hardcodedProperties: IPropiedad[] = [
    {
      id: 1,
      owner: {
        id: "123",
        firstname: "Juan",
        lastname: "Pérez",
        birthdate: "1990-01-01",
        phone: "+34 123 456 789",
        email: "juan.perez@example.com",
        profileImgUrl:
          "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2526512481.jpg",
        registeredAt: "2023-01-01",
        active: true,
        reservations: () => null,
      },
      active: true,
      title: "Casa en la playa",
      description: "Hermosa casa frente al mar",
      state: "Cataluña",
      city: "Barcelona",
      price: [150],
      bedrooms: [3],
      bathrooms: 2,
      isAvailable: true,
      capacity: 6,
      photos: [
        "https://a0.muscache.com/im/pictures/64343448/7332d0e8_original.jpg?im_w=1200&im_format=avif",
      ],
      stripeProductId: "prod_123",
      stripePriceId: "price_123",
      reviews: [],
      reservationDetail: {
        userId: "123",
        id: "res_1",
        reservation: {} as any,
        checkIn: "2023-12-01",
        checkOut: "2023-12-15",
        pax: 4,
        property: "1",
      },
      latitude: 41.3879,
      longitude: 2.16992,
    },
    {
      id: 2,
      owner: {
        id: "123",
        firstname: "Juan",
        lastname: "Pérez",
        birthdate: "1990-01-01",
        phone: "+34 123 456 789",
        email: "juan.perez@example.com",
        profileImgUrl:
          "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2526512481.jpg",
        registeredAt: "2023-01-01",
        active: true,
        reservations: () => null,
      },
      active: true,
      title: "Apartamento en la ciudad",
      description: "Moderno apartamento en el centro",
      state: "Madrid",
      city: "Madrid",
      price: [100],
      bedrooms: [2],
      bathrooms: 1,
      isAvailable: true,
      capacity: 4,
      photos: [
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1249940128911646366/original/851209c8-4cbd-4251-acf2-d4ce12e66034.jpeg?im_w=1200&im_format=avif",
      ],
      stripeProductId: "prod_124",
      stripePriceId: "price_124",
      reviews: [],
      reservationDetail: {
        userId: "123",
        id: "res_2",
        reservation: {} as any,
        checkIn: "2023-12-20",
        checkOut: "2023-12-30",
        pax: 2,
        property: "2",
      },
      latitude: 40.4168,
      longitude: -3.7038,
    },
  ];

  useEffect(() => {
    setProperties(hardcodedProperties);
  }, []);

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
            >
              <button
                onClick={() => handleEditClick(property)}
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
                    {property.bedrooms?.[0]} habitaciones, {property.bathrooms}{" "}
                    baño(s)
                  </p>
                </div>
              </div>
              <button
                onClick={() => alert("Ver reservas de esta propiedad")}
                className="absolute bottom-2 right-2 py-2 px-4 bg-champagne text-white font-semibold rounded-lg shadow-md hover:bg-[#e2c395]"
              >
                Ver Reservas
              </button>
            </li>
          )
        )}
      </ul>
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
  );
};

export default MyProperties;
