// // import { useState, useEffect } from "react";
// // import { IPropiedad } from "@/interfaces/properties";

// // const useProperties = () => {
// //   const [properties, setProperties] = useState<IPropiedad[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const fetchProperties = async () => {
// //       setLoading(true);
// //       setError(null);

// //       try {
// //         const storedUser = localStorage.getItem("user");
// //         if (!storedUser) {
// //           throw new Error("No se encontró información del usuario en el localStorage.");
// //         }

// //         const user = JSON.parse(storedUser);
// //         const userId = user?.id;

// //         const response = await fetch(`http://localhost:3002/property/owner/${userId}`);
// //         if (!response.ok) {
// //           throw new Error("Error al obtener las propiedades.");
// //         }

// //         const data: IPropiedad[] = await response.json();
// //         setProperties(data);
// //       } catch (error: any) {
// //         console.error("Error al cargar las propiedades:", error);
// //         setError(error.message || "Ocurrió un error.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProperties();
// //   }, []);

// //   return { properties, loading, error, setProperties };
// // };

// // export default useProperties;
// import { useState, useEffect } from "react";
// import { IPropiedad } from "@/interfaces/properties";

// const useProperties = () => {
//   const [properties, setProperties] = useState<IPropiedad[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  

//   useEffect(() => {
//     const fetchProperties = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         // Obtener el id del usuario desde localStorage (suponiendo que está almacenado allí)
//         const storedUser = localStorage.getItem("user");
//         if (!storedUser) {
//           throw new Error("No se encontró información del usuario en el localStorage.");
//         }

//         const user = JSON.parse(storedUser);  // Parseamos el objeto.
//         const userId = user?.id;  // Obtenemos el ID del usuario.

//         // Si tienes el `id` del usuario, puedes hacer la solicitud para obtener su información.
//         const response = await fetch(`http://localhost:3002/user/${userId}`);
//         if (!response.ok) {
//           throw new Error("Error al obtener el usuario.");
//         }

//         const userData = await response.json();  // Obtenemos la información del usuario.
//         setUser(userData);  // Guardamos la información del usuario en el estado.

//         // Ahora, puedes usar `userData.account_.id` si necesitas el `account_id`
//         const accountId = userData.account_?.id;
//         console.log("Account ID:", accountId);  
      

//         const responseUser = await fetch(`http://localhost:3002/property/owner/${accountId}`);
//         if (!response.ok) {
//           throw new Error("Error al obtener las propiedades.");
//         }

//         const data: IPropiedad[] = await response.json();
//         setProperties(data);
//       } catch (error: any) {
//         console.error("Error al cargar las propiedades:", error);
//         setError(error.message || "Ocurrió un error.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   return { properties, loading, error, setProperties };
// };

// export default useProperties;


import { useState, useEffect } from "react";
import { IPropiedad } from "@/interfaces/properties";

const useProperties = () => {
  const [properties, setProperties] = useState<IPropiedad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);  

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          throw new Error("No se encontró información del usuario en el localStorage.");
        }

        const user = JSON.parse(storedUser);  
        const userId = user?.id;  

        const response = await fetch(`http://localhost:3002/users/${userId}`);
        if (!response.ok) {
          throw new Error("Error al obtener el usuario.");
        }

        const userData = await response.json();  
        setUser(userData); 

        const accountId = userData.account_?.id;
        console.log("Account ID:", accountId);

        const propertiesResponse = await fetch(`http://localhost:3002/property/owner/${accountId}`);
        if (!propertiesResponse.ok) {
          throw new Error("Error al obtener las propiedades.");
        }

        const propertiesData = await propertiesResponse.json();
        setProperties(propertiesData); 
        
      } catch (error: any) {
        console.error("Error al cargar la información:", error);
        setError(error.message || "Ocurrió un error.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, error, setProperties, user };
};

export default useProperties;
