import React, { useEffect, useState } from "react";
import IUser from "@/interfaces/user";
import Swal from "sweetalert2";
import {
  civilStatusOptions,
  employmentStatusOptions,
} from "@/helpers/userStatus";

interface OwnerDetailsFormProps {
  onComplete: (ownerDetails: IUser) => void;
}

interface OwnerDetailsFormProps {
  initialData?: Partial<IUser>;
  onComplete: (ownerDetails: IUser) => void;
}

const OwnerDetailsForm: React.FC<OwnerDetailsFormProps> = ({
  initialData = {},
  onComplete,
}) => {
  const [name, setName] = useState(initialData.name || "");
  const [lastName, setLastName] = useState(initialData.lastName || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [nationality, setNationality] = useState(initialData.nationality || "");
  const [civilStatus, setCivilStatus] = useState(initialData.civilStatus || "");
  const [employmentStatus, setEmploymentStatus] = useState(
    initialData.employmentStatus || ""
  );
  const [DOB, setDOB] = useState(initialData.DOB || "");
  const [phone, setPhone] = useState<number | string>(initialData.phone || "");
  const [dni, setDni] = useState<number | string>(initialData.dni || "");
  const [photo, setPhoto] = useState(
    initialData.photo || "https://default.photo.url"
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user) {
      setName(user.name || "");
      setLastName(user.lastName || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      setNationality(user.nationality || "");
      setDni(user.dni || "");
      setCivilStatus(user.civilStatus || "");
      setEmploymentStatus(user.employmentStatus || "");
      setDOB(user.DOB ? new Date(user.DOB).toISOString().split("T")[0] : "");
      setPhoto("");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name ||
      !lastName ||
      !email ||
      !nationality ||
      !DOB ||
      !dni ||
      !phone ||
      !civilStatus ||
      !employmentStatus ||
      !photo
    ) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos obligatorios.",
      });
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.id) {
      alert("No se encontró el usuario. Por favor, inicia sesión.");
      return;
    }

    const parsedPhone = typeof phone === "string" ? parseInt(phone, 10) : phone;
    const parsedDni = typeof dni === "string" ? parseInt(dni, 10) : dni;

    if (isNaN(parsedPhone) || isNaN(parsedDni)) {
      Swal.fire({
        icon: "error",
        title: "Error en los datos",
        text: "El DNI y el Teléfono deben ser números válidos.",
      });
      return;
    }

    const ownerDetails: IUser = {
      id: user.id,
      name,
      lastName,
      DOB,
      phone: parsedPhone,
      email,
      nationality,
      dni: parsedDni,
      civilStatus,
      employmentStatus,
      photo,
      role: "user",
      isActive: "true"
    };
    console.log("Datos a enviar:", ownerDetails);

    await handleUpdate(ownerDetails);
  };

  const handleUpdate = async (userDetails: IUser) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || !user.id) {
      console.error("No se encontró el usuario o el ID está ausente.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se encontró el usuario o el ID está ausente.",
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3002/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Datos actualizados exitosamente:", data);
        Swal.fire({
          icon: "success",
          title: "¡Actualización exitosa!",
          text: "Los datos se han actualizado correctamente.",
        });
        onComplete(userDetails);
      } else {
        console.error("Error al actualizar los datos:", response.statusText);
        Swal.fire({
          icon: "error",
          title: "Error al actualizar",
          text: "Hubo un error al actualizar los datos. Intenta nuevamente.",
        });
      }
    } catch (error) {
      console.error("Error de red:", error);
      Swal.fire({
        icon: "error",
        title: "Error de red",
        text: "No se pudo conectar al servidor. Intenta más tarde.",
      });
    }
  };

  const isReadOnly = (field: string) => {
    return field !== "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-md shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Datos Personales</h2>
      <div>
        <label className="block font-semibold">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          readOnly={isReadOnly(name)}
          className={`border border-gray-300 rounded-md p-2 w-full ${
            isReadOnly(name) ? "bg-gray-100 text-gray-500" : ""
          }`}
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Apellido:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          readOnly={isReadOnly(lastName)}
          className={`border border-gray-300 rounded-md p-2 w-full ${
            isReadOnly(lastName) ? "bg-gray-100 text-gray-500" : ""
          }`}
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Teléfono:</label>
        <input
          type="number"
          value={phone}
          onChange={(e) => setPhone(Number(e.target.value))}
          className={`border border-gray-300 rounded-md p-2 w-full`}
        />
      </div>
      <div>
        <label className="block font-semibold">Correo Electrónico:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={isReadOnly(email)}
          className={`border border-gray-300 rounded-md p-2 w-full ${
            isReadOnly(email) ? "bg-gray-100 text-gray-500" : ""
          }`}
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Nacionalidad:</label>
        <input
          type="text"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          readOnly={isReadOnly(nationality)}
          className={`border border-gray-300 rounded-md p-2 w-full ${
            isReadOnly(nationality) ? "bg-gray-100 text-gray-500" : ""
          }`}
          required
        />
      </div>
      <div>
        <label className="block font-semibold">DNI:</label>
        <input
          type="number"
          value={dni}
          onChange={(e) => setDni(Number(e.target.value))}
          className={`border border-gray-300 rounded-md p-2 w-full`}
        />
      </div>
      <div>
        <label className="block font-semibold">Fecha de Nacimiento:</label>
        <input
          type="date"
          value={DOB}
          onChange={(e) => setDOB(e.target.value)}
          readOnly={isReadOnly(DOB)}
          className={`border border-gray-300 rounded-md p-2 w-full ${
            isReadOnly(DOB) ? "bg-gray-100 text-gray-500" : ""
          }`}
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Estado Civil:</label>
        <select
          value={civilStatus}
          onChange={(e) => setCivilStatus(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          <option value="">Seleccione una opción</option>
          {civilStatusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold">Estado Laboral:</label>
        <select
          value={employmentStatus}
          onChange={(e) => setEmploymentStatus(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          <option value="">Seleccione una opción</option>
          {employmentStatusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold">Imagen de Perfil:</label>
        <input
        type="text"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full"
        placeholder="Introduce la URL de tu foto de perfil"
        />
        <p className="text-gray-500 text-sm mt-1">Te pedimos una foto para validar tu identidad.</p>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
      >
        Enviar
      </button>
    </form>
  );
};

export default OwnerDetailsForm;
