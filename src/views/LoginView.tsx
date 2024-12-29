import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import { LoginForm } from '../types';
import api from '../utils/axios';
import { toast } from 'sonner';

export default function LoginView() {
   const initialValues: LoginForm = {
     email: '',
     password: '',
   };
 
   const [backendErrors, setBackendErrors] = useState<string[]>([]);
   const navigate = useNavigate();
 
   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm({ defaultValues: initialValues });
 
   const handleLogin = async (formData: LoginForm) => {
     setBackendErrors([]); // Limpiar errores anteriores
     try {
       const { data } = await api.post(`/auth/login`, formData);
       localStorage.setItem('jwt', data);
       navigate('/task/list');
     } catch (error) {
       if (isAxiosError(error) && error.response) {
         if (error.response.data.errors) {
           setBackendErrors(error.response.data.errors.map((err: any) => err.msg));
         } else if (error.response.data.error) {
           setBackendErrors([error.response.data.error]);
         }
         toast.error('Error en el inicio de sesión.');
       }
     }
   };
 
   return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
       <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
         <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
           Iniciar Sesión
         </h1>
         <form
           onSubmit={handleSubmit(handleLogin)}
           className="space-y-6"
           noValidate
         >
           {/* Mostrar errores del backend */}
           {backendErrors.length > 0 && (
             <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg">
               {backendErrors.map((error, index) => (
                 <p key={index} className="text-sm">
                   {error}
                 </p>
               ))}
             </div>
           )}
 
           {/* Email Field */}
           <div>
             <label htmlFor="email" className="block text-lg font-medium text-gray-600">
               E-mail
             </label>
             <input
               id="email"
               type="email"
               placeholder="Email de Registro"
               className="mt-2 w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
               {...register('email', {
                 required: 'El Email es obligatorio',
                 pattern: {
                   value: /\S+@\S+\.\S+/,
                   message: 'E-mail no válido',
                 },
               })}
             />
             {errors.email && (
               <ErrorMessage>{errors.email.message}</ErrorMessage>
             )}
           </div>
 
           {/* Password Field */}
           <div>
             <label htmlFor="password" className="block text-lg font-medium text-gray-600">
               Password
             </label>
             <input
               id="password"
               type="password"
               placeholder="Password de Registro"
               className="mt-2 w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
               {...register('password', {
                 required: 'El Password es obligatorio',
               })}
             />
             {errors.password && (
               <ErrorMessage>{errors.password.message}</ErrorMessage>
             )}
           </div>
 
           {/* Submit Button */}
           <button
             type="submit"
             className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-lg font-bold text-lg hover:from-cyan-500 hover:to-blue-600 transition-all"
           >
             Iniciar Sesión
           </button>
         </form>
 
         {/* Navigation Link */}
         <nav className="mt-6 text-center">
           <Link
             to="/auth/register"
             className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-all"
           >
             ¿No tienes una cuenta? Crea Una
           </Link>
         </nav>
       </div>
     </div>
   );
 }
 
