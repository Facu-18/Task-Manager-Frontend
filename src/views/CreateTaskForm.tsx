import { useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { TaskForm } from "../types";
import api from '../utils/axios';

export default function CreateTaskForm() {
  const navigate = useNavigate();

  const initialValues: TaskForm = {
    title: '',
    description: ''
  };

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  const handleCreate = async (formData: TaskForm) => {
    try {
      await api.post(`/tasks`, formData);
      toast.success('Tarea Creada Correctamente');
      navigate('/task/list');
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-white to-gray-50 shadow-xl rounded-lg transition-transform transform hover:scale-105">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">
        ✨ Crear Nueva Tarea
      </h1>
      <form onSubmit={handleSubmit(handleCreate)} className="space-y-6">
        {/* Título */}
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            id="title"
            type="text"
            placeholder="Título de la tarea"
            className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            {...register('title', {
              required: 'El título es obligatorio',
            })}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            id="description"
            placeholder="Descripción de la tarea"
            className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            {...register('description')}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="relative flex items-center justify-center w-full px-6 py-3 font-medium text-white transition-transform bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 hover:shadow-lg transform hover:scale-105"
        >
          <span className="absolute inset-0 transition-transform transform bg-indigo-700 rounded-lg opacity-50 scale-105 group-hover:opacity-100"></span>
          Crear Tarea
        </button>
      </form>
    </div>
  );
}
