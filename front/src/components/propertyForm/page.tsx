import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios'

interface IUser {
  id: string;
}

interface IFormData {
  title: string;
  description: string;
  price: number;
  state: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  capacity: number;
  latitude: number;
  longitude: number;
  hasMinor: boolean;
  pets: boolean;
  accountId: string;
  images: string[];
  address: string;
  wifi: boolean;
  tv: boolean;
  airConditioning: boolean;
  piscina: boolean;
  parqueadero: boolean;
  cocina: boolean;

  [key: string]: string | number | boolean | string[];
}

interface PropertyFormProps {
  user: IUser;
}

const PropertyForm: React.FC<PropertyFormProps> = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    description: "",
    price: 0,
    state: "",
    city: "",
    bedrooms: 0,
    bathrooms: 0,
    capacity: 0,
    latitude: 0,
    longitude: 0,
    hasMinor: false,
    pets: false,
    accountId: "",
    images: [],
    address: "",
    wifi: false,
    tv: false,
    airConditioning: false,
    piscina: false,
    parqueadero: false,
    cocina: false,
    isActive: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
  
    if (!formData.titel) {
      newErrors.titel= "El título no debe estar vacío";
    } else if (formData.title.length < 8) {
      newErrors.titel = "El título debe tener al menos 8 caracteres";
    } else if (formData.title.length > 50) {
      newErrors.titel = "El título debe tener un máximo de 50 caracteres";
    }
  
    if (typeof formData.price !== "number" || formData.price <= 0) {
      newErrors.price = "El precio debe ser un número positivo";
    }

    if (!formData.state) {
      newErrors.state = "La provincia no debe estar vacía";
    }
    if (!formData.city) {
      newErrors.city = "La ciudad no debe estar vacía";
    }
    if (typeof formData.bedrooms !== "number" || formData.bedrooms <= 0) {
      newErrors.bedrooms = "El número de habitaciones debe ser positivo";
    }
    if (typeof formData.bathrooms !== "number" || formData.bathrooms <= 0) {
      newErrors.bathrooms = "El número de baños debe ser positivo";
    }
    if (typeof formData.capacity !== "number" || formData.capacity <= 0) {
      newErrors.capacity = "La capacidad debe ser positiva";
    }
  
    if (typeof formData.wifi !== "boolean") {
      newErrors.wifi = "El campo wifi debe ser un valor booleano";
    }
    if (typeof formData.tv !== "boolean") {
      newErrors.tv = "El campo tv debe ser un valor booleano";
    }
    if (typeof formData.airConditioning !== "boolean") {
      newErrors.airConditioning = "El campo aire acondicionado debe ser un valor booleano";
    }
    if (typeof formData.piscina !== "boolean") {
      newErrors.piscina = "El campo piscina debe ser un valor booleano";
    }
    if (typeof formData.parqueadero !== "boolean") {
      newErrors.parqueadero = "El campo parqueadero debe ser un valor booleano";
    }
    if (typeof formData.cocina !== "boolean") {
      newErrors.cocina = "El campo cocina debe ser un valor booleano";
    }
  
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        accountId: user.id,
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
  
    if (target instanceof HTMLInputElement) {
      const value = target.type === "checkbox" ? target.checked : target.value;
  
      if (target.name === 'price' || target.name === 'bedrooms' || target.name === 'bathrooms' || target.name === 'capacity') {
        setFormData({ ...formData, [target.name]: value ? Number(value) : 0 });
      } else {
        setFormData({ ...formData, [target.name]: value });
      }
    } else if (target instanceof HTMLTextAreaElement) {
      setFormData({ ...formData, [target.name]: target.value });
    }
  
    console.log("Formulario actualizado:", formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const urls = files.map((file: File) => URL.createObjectURL(file));
      setFormData({ ...formData, images: urls });
    }
  };

  const handleImageUpload = async (file:any) => {
    const formData = new FormData();
    formData.append('file', file); 
    formData.append('upload_preset', 'tu_upload_preset'); 
  
    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/tu_cuenta/image/upload', formData);
      console.log('Imagen subida:', response.data.secure_url);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setFormData({ ...formData, address });

    if (address) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
        );
        const data = await response.json();
        const location = data.results[0]?.geometry.location;
        if (location) {
          setFormData((prevData) => ({
            ...prevData,
            latitude: location.lat,
            longitude: location.lng,
          }));
        }
      } catch (error) {
        console.error("Error al obtener las coordenadas:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Errores en el formulario",
        text: "Por favor, revisa los errores e intenta nuevamente.",
      });
      return;
    }
  
    if (!user?.id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se encontró el usuario.",
      });
      return;
    }

    setIsLoading(true);
    const requestData = { ...formData, accountId: user.id };

    console.log("Datos que se enviarán:", requestData);
    try {
      const response = await fetch("http://localhost:3002/property", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      const responseData = await response.json();
      console.log("Datos a enviar:", responseData);
  
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Propiedad creada exitosamente!",
          text: responseData.message || "La propiedad se ha creado correctamente.",
        });
      } else {
        throw new Error(responseData.message || "Error en el servidor");
      }
    } catch (error: unknown) {
      console.error("Error al enviar la propiedad:", error);
      Swal.fire({
        icon: "error",
        title: "Hubo un error al crear la propiedad.",
        text: (error as Error).message || "Inténtalo nuevamente.",
      });
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Crear Propiedad</h2>

      <div className="mb-4">
            <label className="block text-gray-800 text-lg">Título de la Propiedad:</label>
           <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.titel && <p className="text-red-500 text-sm">{errors.titel}</p>}
          </div>
    
          <div className="mb-4">
            <label className="block text-gray-800 text-lg">Descripción:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
    
          <div className="mb-4">
            <label className="block text-gray-800 text-lg">Precio:</label>
            <input
              type="number"
              name="price"
              min="0" step="any"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>
    
          <div className="mb-4">
            <label className="block text-gray-800 text-lg">Pais:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
              className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>
    
          <div className="mb-4">
            <label className="block text-gray-800 text-lg">Ciudad:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">Dirección:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleAddressChange} 
          required
          className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
      </div>
           <div className="mb-4">
             <label className="block text-gray-800 text-lg">Habitaciones:</label>
            <input
              type="number"
              name="bedrooms"
              min="0" step="any"
              value={formData.bedrooms}
              onChange={handleInputChange}
              required
              className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.bedrooms && <p className="text-red-500 text-sm">{errors.bedrooms}</p>}
          </div>
    
          <div className="mb-4">
            <label className="block text-gray-800 text-lg">Baños:</label>
            <input
              type="number"
              name="bathrooms"
              min="0" step="any"
              value={formData.bathrooms}
              onChange={handleInputChange}
              required
              className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.bathrooms && <p className="text-red-500 text-sm">{errors.bathrooms}</p>}
          </div>
    
          <div className="mb-4">
            <label className="block text-gray-800 text-lg">Capacidad:</label>
            <input
              type="number"
              name="capacity"
              min="0" step="any"
              value={formData.capacity}
              onChange={handleInputChange}
              required
              className="mt-2 w-full p-3 bg-white text-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity}</p>}
          </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">¿Tiene wifi?</label>
        <input
          type="checkbox"
          name="wifi"
          checked={formData.wifi}
          onChange={handleInputChange}
          className="mt-2"
        />
        {errors.wifi && <p className="text-red-500 text-sm">{errors.wifi}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">¿Tiene TV?</label>
        <input
          type="checkbox"
          name="tv"
          checked={formData.tv}
          onChange={handleInputChange}
          className="mt-2"
        />
        {errors.tv && <p className="text-red-500 text-sm">{errors.tv}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">¿Tiene aire acondicionado?</label>
        <input
          type="checkbox"
          name="airConditioning"
          checked={formData.airConditioning}
          onChange={handleInputChange}
          className="mt-2"
        />
        {errors.airConditioning && <p className="text-red-500 text-sm">{errors.airConditioning}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">¿Tiene piscina?</label>
        <input
          type="checkbox"
          name="piscina"
          checked={formData.piscina}
          onChange={handleInputChange}
          className="mt-2"
        />
         {errors.piscina && <p className="text-red-500 text-sm">{errors.piscina}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">¿Tiene parqueadero?</label>
        <input
          type="checkbox"
          name="parqueadero"
          checked={formData.parqueadero}
          onChange={handleInputChange}
          className="mt-2"
        />
         {errors.parqueadero && <p className="text-red-500 text-sm">{errors.parqueadero}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 text-lg">¿Tiene cocina?</label>
        <input
          type="checkbox"
          name="cocina"
          checked={formData.cocina}
          onChange={handleInputChange}
          className="mt-2"
        />
         {errors.kitchen && <p className="text-red-500 text-sm">{errors.kitchen}</p>}
      </div>

           <div className="mb-4">
            <label className="block text-gray-800 text-lg">¿Se permiten menores?</label>
             <input
              type="checkbox"
              name="hasMinor"
              checked={formData.hasMinor}
              onChange={handleInputChange}
              className="mt-2"
            />
             {errors.hasMinor && <p className="text-red-500 text-sm">{errors.hasMinor}</p>}
          </div>
    
          <div className="mb-4">
            <label className="block text-gray-800 text-lg">¿Se permiten mascotas?</label>
            <input
              type="checkbox"
              name="pets"
              checked={formData.pets}
              onChange={handleInputChange}
              className="mt-2"
            />
             {errors.pets && <p className="text-red-500 text-sm">{errors.pets}</p>}
          </div>
    
          <div className="mb-4">
            <label className="block text-gray-800 text-lg">Imágenes de la propiedad:</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-2 w-full"
            />
             {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
          </div>

          {formData.images.length > 0 && (
          <div className="mt-4">
          {formData.images.map((image, index) => (
          <img key={index} src={image} alt={`Imagen ${index + 1}`} className="w-24 h-24 object-cover" />
          ))}
          </div>
)}

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
         {isLoading ? "Cargando..." : "Crear Propiedad"}
      </button>
    </form>
  );
};

export default PropertyForm;
