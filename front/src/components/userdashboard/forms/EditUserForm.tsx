import React from "react";
import useEditUser from "@/hooks/UserDashboard/useEditUser";
import IUser from "@/interfaces/user";
import FormEditUser from "@/components/userdashboard/forms/FormEditUser";

interface EditUserFormProps {
  initialData: IUser;  
  editableFields: string[];  
  onComplete: (updatedUser: IUser) => Promise<void>;  
}

const EditUserForm: React.FC<EditUserFormProps> = ({ initialData, editableFields, onComplete }) => {
  const { user, loading, error, handleImageChange, saveChanges } = useEditUser(onComplete);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No se encontró información del usuario.</div>;

  return (
    <FormEditUser
    user={user}
    handleImageChange={handleImageChange}
    saveChanges={saveChanges}
    loading={loading}
    />
  )
};

export default EditUserForm;

