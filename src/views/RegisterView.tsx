import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import type { RegisterForm } from '../types';
import ErrorMessage from '../components/ErrorMessage';
import api from '../utils/axios';

export default function RegisterForm() {
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
    password_confirmation: '',
  };

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ defaultValues: initialValues });

  const password = watch('password');

  const handleRegister = async (formData: RegisterForm) => {
    try {
      const { data } = await api.post(`/auth/register`, formData);
      toast.success(data);
      reset();
      navigate('/auth/login');
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 px-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-700 text-center mb-6">
          Crea tu Cuenta
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          ¡Empieza a gestionar tus tareas de forma eficiente!
        </p>
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="Ingresa tu correo"
              className="w-full mt-2 p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('email', {
                required: 'El correo es obligatorio',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Correo no válido',
                },
              })}
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Crea una contraseña"
              className="w-full mt-2 p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 8,
                  message: 'Debe tener al menos 8 caracteres',
                },
              })}
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="password_confirmation"
              className="block text-lg font-medium text-gray-700"
            >
              Repetir Contraseña
            </label>
            <input
              id="password_confirmation"
              type="password"
              placeholder="Repite tu contraseña"
              className="w-full mt-2 p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('password_confirmation', {
                required: 'Repite la contraseña',
                validate: (value) => value === password || 'Las contraseñas no coinciden',
              })}
            />
            {errors.password_confirmation && (
              <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-3 rounded-lg text-lg font-semibold hover:from-green-500 hover:to-green-600 transition-all shadow-lg"
          >
            Registrarme
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/auth/login"
              className="text-blue-500 hover:underline font-medium"
            >
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
