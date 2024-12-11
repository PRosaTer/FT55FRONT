/* eslint-disable @next/next/no-img-element */
"use client";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import React, { useState } from "react";

type LoginData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const registeredUsers = [
      { email: "test@example.com", password: "password123" },
    ];

    const user = registeredUsers.find(
      (u) => u.email === loginData.email && u.password === loginData.password
    );

    if (user) {
      setIsLoggedIn(true);
      setError(null);
      console.log("Inicio de sesión exitoso:", user);
    } else {
      setIsLoggedIn(false);
      setError("Credenciales incorrectas. Verifica tu email y contraseña.");
    }
  };

  return (
    <div className="flex lg:flex-row items-center justify-center min-h-screen bg-gray-100">
      {/* Imagen a la izquierda */}
      <div className="flex-1 flex items-center justify-center bg-gray-200 h-full">
        <img
          src="https://i.postimg.cc/qBC7wtdC/pexels-rutger-van-rees-2147548108-29650203.jpg"
          alt="Imagen decorativa"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Tarjeta de inicio de sesión */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">
            Inicia sesión
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-black">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-black">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Ingresar
            </button>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <span className="flex items-center">
                <FcGoogle />
                Ingresar con Google
              </span>
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-black">
                ¿No tienes cuenta?{" "}
                <Link href="/register">
                  <span className="text-blue-600 hover:underline">
                    Regístrate aquí
                  </span>
                </Link>
              </p>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-black">
                ¿Olvidaste tu contraseña?{" "}
                <Link href="/forgotPassword">
                  <span className="text-blue-600 hover:underline">
                    Recuperala aquí
                  </span>
                </Link>
              </p>
            </div>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
