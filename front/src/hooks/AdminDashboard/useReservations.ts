import { useState, useEffect } from "react";
import { IReservationDetail } from "../../interfaces/reservationDetail";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useReservations = () => {
  const [reservations, setReservations] = useState<IReservationDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`${API_URL}/contract`);
        if (!response.ok) {
          throw new Error("Error al obtener reservas");
        }
        const data = await response.json();
        setReservations(data);
      } catch (err: any) {
        setError(err.message || "Error al obtener reservas");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return { reservations, loading, error };
};

export default useReservations;
