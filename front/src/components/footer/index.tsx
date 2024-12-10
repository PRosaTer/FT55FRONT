// react
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Henry FT55, grupo 5 App. Todos los derechos reservados.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-gray-400">Políticas de privacidad</a>
          <a href="#" className="hover:text-gray-400">Terminos de servicio</a>
          <a href="#" className="hover:text-gray-400">Contactenos</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;