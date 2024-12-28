import React, { useState } from "react";

interface OwnerDetailsFormProps {
  onComplete: (ownerDetails: OwnerDetails) => void;
}

export interface OwnerDetails {
  name: string;
  lastName: string;
  phone: string;
  email: string;
}

const OwnerDetailsForm: React.FC<OwnerDetailsFormProps> = ({ onComplete }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !lastName || !phone || !email) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const ownerDetails: OwnerDetails = { name, lastName, phone, email };

    onComplete(ownerDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Datos Personales</h2>
      <div>
        <label className="block font-semibold">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Apellido:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Teléfono:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Correo Electrónico:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
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
