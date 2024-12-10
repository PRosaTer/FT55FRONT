"use client";
import React, { useState } from "react";

type FormData = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  address: string;
  DOB: string;
};

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    DOB: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "number" ? +value : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="flex lg:flex-row items-center justify-center min-h-screen bg-gray-100">
      {/* Tarjeta de registro */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">Regístrate</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-black">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Nombre"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-black">Apellido</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Apellido"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-black">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Correo electrónico"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-black">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Contraseña"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-black">Dirección</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Dirección"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-black">Fecha de nacimiento</label>
              <input
                type="date"
                name="DOB"
                value={formData.DOB}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Regístrate
            </button>
          </form>
        </div>
      </div>

      {/* Imagen a la derecha */}
      <div className="flex-1 flex items-center justify-center bg-gray-200 h-full">
        <img
          src="https://mundosdepinceladas.net/wp-content/uploads/pintura-impresionante-paisaje-sereno-1.webp"
          alt="Imagen decorativa"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
