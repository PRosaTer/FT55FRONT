import React, { useState } from "react";
import useUserProfile from "@/hooks/UserDashboard/useUserProfile";
import usePhotoUpload from "@/hooks/UserDashboard/usePhotoUpload";
import UserEditForm from "./UserEditForm";
import IUser from "@/interfaces/user";

const UserProfile: React.FC = () => {
  const { user, loading, error, setUser, saveUser } = useUserProfile();
  const { uploadPhoto, loading: photoLoading, error: photoError } = usePhotoUpload();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

  const handleEditClick = () => setIsEditing(true);

  const handleSave = async (updatedUser: IUser) => {
    try {
      const savedUser = await saveUser(updatedUser);

      if (selectedPhoto) {
        await uploadPhoto(savedUser.id, selectedPhoto, setUser);
      }
      setIsEditing(false);
    } catch (err) {
      console.error("Error al guardar los cambios:", err);
    }
  };

  if (loading) return <p>Cargando información...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      {isEditing ? (
        <UserEditForm
          user={user!}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          onPhotoChange={setSelectedPhoto}
        />
      ) : (
        <div>
          <img
            src={user?.photo || "https://cdn-icons-png.flaticon.com/512/61/61205.png"}
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full"
          />
          <h3 className="text-xl font-bold">{user?.name}</h3>
          <button onClick={handleEditClick} className="btn">
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;