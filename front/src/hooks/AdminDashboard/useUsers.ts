import { useState, useEffect } from "react";
import IUser from "../../interfaces/user";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) {
          throw new Error("Error al cargar los usuarios");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleActivate = async (userId: string) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/activate`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al activar el usuario");
      }
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isActive: true } : user
        )
      );
      Swal.fire({
        icon: "success",
        title: "Usuario Activado",
        text: "El usuario ha sido activado exitosamente.",
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
      setError(err.message);
    }
  };

  const handleDesactivateUser = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Error al desactivar el usuario");
      }
      Swal.fire({
        icon: "success",
        title: "Usuario Desactivado",
        text: "El usuario ha sido desactivado exitosamente.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Hubo un problema al desactivar el usuario",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  
  return { users, loading, error, handleActivate, handleDesactivateUser };
};

export default useUsers;
