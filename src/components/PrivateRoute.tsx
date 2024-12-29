import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../utils/axios'; // Asegúrate de tener configurado Axios

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Estado para verificar si está autenticado

   useEffect(() => {
      const checkToken = async () => {
         try {
            const token = localStorage.getItem('jwt');

            if (!token) {
               setIsAuthenticated(false); // No hay token, no autenticado
               return;
            }

            // Verificar si el token es válido haciendo una solicitud al backend
            await api.get('/auth/verify-token'); // Ruta protegida en el backend que verifica el token
            setIsAuthenticated(true); // El token es válido
         } catch (error) {
            setIsAuthenticated(false); // El token es inválido o ha expirado
         }
      };

      checkToken();
   }, []);

   if (isAuthenticated === null) {
      // Espera hasta que la verificación de token esté completa
      return <div>Loading...</div>;
   }

   if (isAuthenticated === false) {
      // Si el token no es válido o no existe, redirige al login
      return <Navigate to="/auth/login" />;
   }

   return children; // Si el token es válido, renderiza el componente hijo
};

export default PrivateRoute;
