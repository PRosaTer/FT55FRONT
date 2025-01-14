// import React from "react";
// import { CivilStatusOptions, EmploymentStatusOptions } from "@/helpers/userStatus";
// import IUser from "@/interfaces/user";

// interface UserFormProps {
//     user: IUser;
//     handleImageChange: (file: File) => void;
//     saveChanges: () => void;
//     loading: boolean;
//   }

//   const FormEditUser: React.FC<UserFormProps> = ({ user, handleImageChange, saveChanges, loading }) => {
//     return (
//         <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           saveChanges();
//         }}
//         className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md"
//       >
//         <h2 className="text-2xl font-semibold text-center mb-6">Editar Perfil</h2>
//         <div>
//           <label htmlFor="name" className="block font-semibold text-gray-700">
//             Nombre
//           </label>
//           <input
//             type="text"
//             id="name"
//             value={user.name}
//             onChange={(e) => (user.name = e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="lastName" className="block font-semibold text-gray-700">
//             Apellido
//           </label>
//           <input
//             type="text"
//             id="lastName"
//             value={user.lastName}
//             onChange={(e) => (user.lastName = e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         <div>
//         <label htmlFor="phone" className="block font-semibold text-gray-700">
//           Teléfono
//         </label>
//         <input
//           type="number"
//           id="phone"
//           value={user.phone || ""}
//           onChange={(e) => (user.phone = parseInt(e.target.value, 10))}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="dni" className="block font-semibold text-gray-700">
//           DNI
//         </label>
//         <input
//           type="number"
//           id="dni"
//           value={user.dni || ""}
//           onChange={(e) => (user.dni = parseInt(e.target.value, 10))}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           required
//         />
//       </div>
//         <div>
//           <label htmlFor="email" className="block font-semibold text-gray-700">
//             Email
//           </label>
//           <input
//             type="text"
//             id="email"
//             value={user.email}
//             onChange={(e) => (user.email = e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="nationality" className="block font-semibold text-gray-700">
//             Nacionalidad
//           </label>
//           <input
//             type="text"
//             id="nationality"
//             value={user.nationality}
//             onChange={(e) => (user.nationality = e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="DOB" className="block font-semibold text-gray-700">
//             Fecha de Nacimiento
//           </label>
//           <input
//             type="text"
//             id="DOB"
//             value={user.DOB}
//             onChange={(e) => (user.DOB = e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="civilStatus" className="block font-semibold text-gray-700">
//             Estado Civil
//           </label>
//           <select
//             id="civilStatus"
//             value={user.civilStatus || ""}
//             onChange={(e) => (user.civilStatus = e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//             required
//           >
//             <option value="" disabled>
//               Seleccione una opción
//             </option>
//             {Object.entries(CivilStatusOptions).map(([key, value]) => (
//               <option key={key} value={key}>
//                 {value}
//               </option>
//             ))}
//           </select>
//         </div>
  
//         <div>
//           <label htmlFor="employmentStatus" className="block font-semibold text-gray-700">
//             Estado Laboral
//           </label>
//           <select
//             id="employmentStatus"
//             value={user.employmentStatus || ""}
//             onChange={(e) => (user.employmentStatus = e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//             required
//           >
//             <option value="" disabled>
//               Seleccione una opción
//             </option>
//             {Object.entries(EmploymentStatusOptions).map(([key, value]) => (
//               <option key={key} value={key}>
//                 {value}
//               </option>
//             ))}
//           </select>
//         </div>
  
//         <div>
//           <label htmlFor="photo" className="block font-semibold text-gray-700">Foto de Perfil</label>
//           <input
//             type="file"
//             id="photo"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e.target.files![0])}
//             className="mt-1 block w-full text-sm"
//           />
//           <div className="mt-4">
//             <img src={user.photo} alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover" />
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded-md"
//         >
//           {loading ? "Cargando..." : "Actualizar Datos"}
//         </button>
//       </form>
//     );
// };
// export default FormEditUser;

// import React, { useState } from "react";
// import { CivilStatusOptions, EmploymentStatusOptions } from "@/helpers/userStatus";
// import IUser from "@/interfaces/user";

// interface UserFormProps {
//   user: IUser;
//   handleImageChange: (file: File) => void;
//   saveChanges: (updatedUser: IUser) => void;
//   loading: boolean;
// }

// const FormEditUser: React.FC<UserFormProps> = ({ user, handleImageChange, saveChanges, loading }) => {
//   const [formData, setFormData] = useState<IUser>({ ...user });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: id === "phone" || id === "dni" ? parseInt(value, 10) || "" : value, 
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     saveChanges(formData); 
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md"
//     >
//       <h2 className="text-2xl font-semibold text-center mb-6">Editar Perfil</h2>

//       <div>
//         <label htmlFor="name" className="block font-semibold text-gray-700">Nombre</label>
//         <input
//           type="text"
//           id="name"
//           value={formData.name}
//           onChange={handleInputChange}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="lastName" className="block font-semibold text-gray-700">Apellido</label>
//         <input
//           type="text"
//           id="lastName"
//           value={formData.lastName}
//           onChange={handleInputChange}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="phone" className="block font-semibold text-gray-700">Teléfono</label>
//         <input
//           type="number"
//           id="phone"
//           value={formData.phone || ""}
//           onChange={handleInputChange}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="dni" className="block font-semibold text-gray-700">DNI</label>
//         <input
//           type="number"
//           id="dni"
//           value={formData.dni || ""}
//           onChange={handleInputChange}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="email" className="block font-semibold text-gray-700">Email</label>
//         <input
//           type="email"
//           id="email"
//           value={formData.email}
//           onChange={handleInputChange}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="nationality" className="block font-semibold text-gray-700">Nacionalidad</label>
//         <input
//           type="text"
//           id="nationality"
//           value={formData.nationality}
//           onChange={handleInputChange}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="DOB" className="block font-semibold text-gray-700">Fecha de Nacimiento</label>
//         <input
//           type="text"
//           id="DOB"
//           value={formData.DOB}
//           onChange={handleInputChange}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="civilStatus" className="block font-semibold text-gray-700">Estado Civil</label>
//         <select
//           id="civilStatus"
//           value={formData.civilStatus || ""}
//           onChange={handleInputChange}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           required
//         >
//           <option value="" disabled>Seleccione una opción</option>
//           {Object.entries(CivilStatusOptions).map(([key, value]) => (
//             <option key={key} value={key}>{value}</option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label htmlFor="employmentStatus" className="block font-semibold text-gray-700">Estado Laboral</label>
//         <select
//           id="employmentStatus"
//           value={formData.employmentStatus || ""}
//           onChange={handleInputChange}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           required
//         >
//           <option value="" disabled>Seleccione una opción</option>
//           {Object.entries(EmploymentStatusOptions).map(([key, value]) => (
//             <option key={key} value={key}>{value}</option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label htmlFor="photo" className="block font-semibold text-gray-700">Foto de Perfil</label>
//         <input
//           type="file"
//           id="photo"
//           accept="image/*"
//           onChange={(e) => handleImageChange(e.target.files![0])}
//           className="mt-1 block w-full text-sm"
//         />
//         <div className="mt-4">
//           <img src={formData.photo} alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover" />
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded-md"
//         disabled={loading}
//       >
//         {loading ? "Cargando..." : "Actualizar Datos"}
//       </button>
//     </form>
//   );
// };

// export default FormEditUser;

import React, { useState } from "react";
import { CivilStatusOptions, EmploymentStatusOptions } from "@/helpers/userStatus";
import IUser from "@/interfaces/user";

interface UserFormProps {
  user: IUser;
  handleImageChange: (file: File) => void;
  saveChanges: (updatedUser: IUser) => void;
  loading: boolean;
}

const FormEditUser: React.FC<UserFormProps> = ({ user, handleImageChange, saveChanges, loading }) => {
  const [formData, setFormData] = useState<IUser>({ ...user });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    let updatedValue = value;

    // Si el campo es phone o dni, convertir el valor a número
    if (id === "phone" || id === "dni") {
      updatedValue = value ? parseInt(value, 10) : 0; // Convertir a número
      if (isNaN(updatedValue)) {
        updatedValue = 0; // Si no es un número válido, asignar 0
      }
    }

    // Actualizar el estado del formulario
    setFormData((prev) => ({
      ...prev,
      [id]: updatedValue,
    }));
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Asegúrate de que los valores de phone y dni sean enteros antes de enviar
    const updatedUser = {
      ...formData,
      phone: formData.phone ? parseInt(formData.phone.toString(), 10) : null,
      dni: formData.dni ? parseInt(formData.dni.toString(), 10) : null,
    };
    saveChanges(updatedUser);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">Editar Perfil</h2>

      <div>
        <label htmlFor="name" className="block font-semibold text-gray-700">Nombre</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block font-semibold text-gray-700">Apellido</label>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
    <label htmlFor="phone" className="block font-semibold text-gray-700">
      Teléfono
    </label>
    <input
      type="number"
      id="phone"
      value={user.phone || 0} 
      onChange={handleInputChange} 
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
      required
    />
  </div>

  <div>
    <label htmlFor="dni" className="block font-semibold text-gray-700">
      DNI
    </label>
    <input
      type="number"
      id="dni"
      value={user.dni || 0}  
      onChange={handleInputChange}  
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
      required
    />
  </div>

      <div>
        <label htmlFor="email" className="block font-semibold text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="nationality" className="block font-semibold text-gray-700">Nacionalidad</label>
        <input
          type="text"
          id="nationality"
          value={formData.nationality}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="DOB" className="block font-semibold text-gray-700">Fecha de Nacimiento</label>
        <input
          type="text"
          id="DOB"
          value={formData.DOB}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="civilStatus" className="block font-semibold text-gray-700">Estado Civil</label>
        <select
          id="civilStatus"
          value={formData.civilStatus || ""}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>Seleccione una opción</option>
          {Object.entries(CivilStatusOptions).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="employmentStatus" className="block font-semibold text-gray-700">Estado Laboral</label>
        <select
          id="employmentStatus"
          value={formData.employmentStatus || ""}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>Seleccione una opción</option>
          {Object.entries(EmploymentStatusOptions).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="photo" className="block font-semibold text-gray-700">Foto de Perfil</label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          onChange={(e) => handleImageChange(e.target.files![0])}
          className="mt-1 block w-full text-sm"
        />
        <div className="mt-4">
          <img src={formData.photo} alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover" />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded-md"
        disabled={loading}
      >
        {loading ? "Cargando..." : "Actualizar Datos"}
      </button>
    </form>
  );
};

export default FormEditUser;
