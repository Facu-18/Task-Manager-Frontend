import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'sonner';
import { TaskForm, Task } from "../types";  // Asegúrate de importar correctamente el tipo Task
import { useEffect, useState } from "react";
import api from "../utils/axios";
import { updateTask } from "../api/TaskManagerAPI";

export default function UpdateFormTask() {
    const navigate = useNavigate();
    const { taskId } = useParams(); // Obtener el ID de la tarea de la URL

    const [task, setTask] = useState<Task | null>(null);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<TaskForm>({
        defaultValues: { title: "", description: "" },
    });

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await api.get(`/tasks/${taskId}`);
                setTask(response.data);
                setValue("title", response.data.title);
                setValue("description", response.data.description);
            } catch (error) {
                toast.error("No se pudo cargar la tarea");
                navigate("/task/list");
            }
        };

        if (taskId) {
            fetchTask();
        }
    }, [taskId, setValue, navigate]);

    const handleUpdate = async (formData: TaskForm) => {
        if (!taskId) return;

        try {
            await updateTask(taskId, formData); // Aquí utilizas updatedTask correctamente
            toast.success('Tarea actualizada correctamente');
            navigate('/task/list');
        } catch (error) {
            toast.error('Error al actualizar la tarea');
        }
    };

    if (!task) {
        return <p>Cargando tarea...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-8 bg-gradient-to-b from-white to-gray-100 shadow-lg rounded-2xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center tracking-tight">
                ✏️ Actualizar Tarea
            </h1>
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
                {/* Título */}
                <div>
                    <label
                        htmlFor="title"
                        className="block text-lg font-semibold text-gray-700 mb-2"
                    >
                        Título <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Título de la tarea"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300 placeholder-gray-400 text-gray-800 transition"
                        {...register('title', {
                            required: 'El título es obligatorio',
                        })}
                    />
                    {errors.title && (
                        <p className="text-red-600 text-sm mt-2">{errors.title.message}</p>
                    )}
                </div>

                {/* Descripción */}
                <div>
                    <label
                        htmlFor="description"
                        className="block text-lg font-semibold text-gray-700 mb-2"
                    >
                        Descripción <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        placeholder="Descripción de la tarea"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300 placeholder-gray-400 text-gray-800 transition resize-none h-32"
                        {...register('description', {
                            required: 'La descripción es obligatoria',
                        })}
                    />
                    {errors.description && (
                        <p className="text-red-600 text-sm mt-2">{errors.description.message}</p>
                    )}
                </div>

                {/* Botón */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                >
                    Actualizar Tarea
                </button>
            </form>
        </div>

    );
}
