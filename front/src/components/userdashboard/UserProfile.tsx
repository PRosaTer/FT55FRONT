import React, { useEffect, useState } from "react";
import IUser from "@/interfaces/user";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<IUser | null>(null);

  const defaultUser: IUser = {
    id: "1",
    firstname: "Juan",
    lastname: "Pérez",
    birthdate: "1990-01-01",
    phone: "+34 123 456 789",
    email: "juan.perez@example.com",
    profileImgUrl: "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2526512481.jpg",
    registeredAt: "2023-01-01",
    active: true,
    reservations: () => null,
  };

  useEffect(() => {
    // Simulación de carga de datos
    setUser(defaultUser);
    setLoading(false);
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSaveClick = () => {
    if (editedUser) {
      setUser(editedUser);
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUser(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  return (
    <section className="bg-white p-6 rounded-md shadow-md mb-8 flex relative">
      <img
        src={user?.profileImgUrl}
        alt="Foto de perfil"
        className="w-24 h-24 rounded-full object-cover shadow-sm"
      />
      <div className="ml-6">
        <h3 className="text-xl font-bold mb-4">Mi Perfil</h3>
        {loading ? (
          <p>Cargando información del usuario...</p>
        ) : error ? (
          <p>{error}</p>
        ) : user ? (
          isEditing ? (
            <div>
              <div className="mb-4">
                <label className="block font-semibold">Nombre:</label>
                <input
                  type="text"
                  name="firstname"
                  value={editedUser?.firstname || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Apellido:</label>
                <input
                  type="text"
                  name="lastname"
                  value={editedUser?.lastname || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Correo electrónico:</label>
                <input
                  type="email"
                  name="email"
                  value={editedUser?.email || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Teléfono:</label>
                <input
                  type="text"
                  name="phone"
                  value={editedUser?.phone || ""}
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
            </div>
          ) : (
            <div className="mb-4">
              <p>
                <span className="font-semibold">Nombre:</span> {user.firstname} {user.lastname}
              </p>
              <p>
                <span className="font-semibold">Correo electrónico:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Teléfono:</span> {user.phone}
              </p>
            </div>
          )
        ) : null}
      </div>
      {!isEditing && (
        <button
          onClick={handleEditClick}
          className="py-2 px-4 bg-velvet text-white font-semibold rounded-lg shadow-md hover:bg-[#273a6e] absolute bottom-4 right-4"
        >
          Editar
        </button>
      )}
    </section>
  );
};

export default UserProfile;
