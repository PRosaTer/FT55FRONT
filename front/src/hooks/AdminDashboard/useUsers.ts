import { useState, useEffect } from "react";
import IUser from "../../interfaces/user";
import Swal from "sweetalert2";

const useUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3002/users");
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
      const response = await fetch(`http://localhost:3002/users/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al activar el usuario");
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isActive: true } : user
        )
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDesactivateUser = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3002/users/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Error al desactivar el usuario");
      }
      Swal.fire({
        icon: "success",
        title: "Usuario desactivado exitosamente",
        showConfirmButton: false,
        timer: 1500,
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
