import React from "react";
import useReservations from "../../hooks/AdminDashboard/useReservations";

const AllReservations: React.FC = () => {
  const { reservations, loading, error } = useReservations();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Todas las Reservas</h2>
      {reservations.length === 0 ? (
        <p className="text-gray-500 text-center">No hay reservas disponibles en este momento.</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((reservationDetail) => (
            <li
              key={reservationDetail.id}
              className="flex items-center p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold">
                  Estado: {reservationDetail.status}
                </h3>
                <p className="text-gray-600">
                  Fecha de entrada:{" "}
                  <span className="text-blue-500">
                    {new Date(reservationDetail.startDate).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-gray-600">
                  Fecha de salida:{" "}
                  <span className="text-blue-500">
                    {new Date(reservationDetail.endDate).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Huéspedes: {reservationDetail.guests}
                </p>
                <p className="text-sm text-gray-500">
                  Mascotas permitidas: {reservationDetail.pet ? "Sí" : "No"}
                </p>
                <p className="text-sm text-gray-500">
                  Menores permitidos: {reservationDetail.minor ? "Sí" : "No"}
                </p>
                <p className="text-sm text-gray-500">
                  Reservado por: {reservationDetail.account_.user_.name} {reservationDetail.account_.user_.lastName}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllReservations;

