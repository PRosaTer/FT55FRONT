import React, { useEffect, useState } from "react";
import { IReservationDetail } from "@/interfaces/reservationDetail";

const MyReservations: React.FC = () => {
  const [reservations, setReservations] = useState<IReservationDetail[]>([]);

  const defaultReservations: IReservationDetail[] = [
    {
      userId: "123",
      id: "1",
      reservation: {
        id: "res-001",
        property: "Apartamento moderno en el centro",
        location: "Madrid, España",
        checkIn: "2024-12-20",
        checkOut: "2024-12-25",
        guests: 4,
        state: "confirmed",
        imageUrl:
          "https://a0.muscache.com/im/pictures/miso/Hosting-904500137380173616/original/8e4f1f13-aa3d-4390-ab2b-e1257f4995a9.jpeg?im_w=1200&im_format=avif",
      },
      checkIn: "2024-12-20",
      checkOut: "2024-12-25",
      pax: 4,
      property: "Apartamento moderno en el centro",
    },
    {
      userId: "123",
      id: "2",
      reservation: {
        id: "res-002",
        property: "Casa con vista al mar",
        location: "Barcelona, España",
        checkIn: "2024-12-30",
        checkOut: "2025-01-02",
        guests: 6,
        state: "confirmed",
        imageUrl:
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1296589855292195536/original/789cc6f9-032f-4d27-acbc-cea94825be88.jpeg?im_w=1200&im_format=avif",
      },
      checkIn: "2024-12-30",
      checkOut: "2025-01-02",
      pax: 6,
      property: "Casa con vista al mar",
    },
    {
      userId: "124",
      id: "3",
      reservation: {
        id: "res-003",
        property: "Cabaña en la montaña",
        location: "Asturias, España",
        checkIn: "2025-01-10",
        checkOut: "2025-01-15",
        guests: 2,
        state: "pending",
        imageUrl: "https://a0.muscache.com/im/pictures/miso/Hosting-639859140466159074/original/c58e6ecc-6090-4251-9bbe-433c4da640c7.jpeg?im_w=1200&im_format=avif",
      },
      checkIn: "2025-01-10",
      checkOut: "2025-01-15",
      pax: 2,
      property: "Cabaña en la montaña",
    },
  ];

  useEffect(() => {
    /*
    if (user?.id) {
      const fetchReservations = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/reservations/${user.id}/user`
          );
          if (!response.ok) {
            throw new Error("Error al cargar las reservas");
          }
          const data = await response.json();
          setReservations(data);
        } catch (err: any) {
          console.error(err.message);
        }
      };
  
      fetchReservations();
    } else {
      setReservations(defaultReservations);
    }
    */

    setReservations(defaultReservations);
  }, []);

  //   if (loading) return <p>Cargando...</p>;
  //   if (error) return <p>{error}</p>;

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Mis Reservas</h2>
      <ul className="space-y-4">
        {reservations.length > 0 ? (
          reservations.map((reservationDetail) => (
            <li
              key={reservationDetail.id}
              className="flex items-center p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
            >
            <div className="w-24 h-24 mr-4">
                <img
                  src={reservationDetail.reservation.imageUrl}
                  alt={reservationDetail.property}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold">
                  {reservationDetail.property}
                </h3>
                <p className="text-gray-600">
                  Fecha de entrada:{" "}
                  <span className="text-blue-500">
                    {reservationDetail.checkIn}
                  </span>
                </p>
                <p className="text-gray-600">
                  Fecha de salida:{" "}
                  <span className="text-blue-500">
                    {reservationDetail.checkOut}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Huéspedes: {reservationDetail.pax}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p>No tienes reservas.</p>
        )}
      </ul>
    </div>
  );
};

export default MyReservations;
