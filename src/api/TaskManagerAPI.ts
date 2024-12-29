import { Task } from "../types";
import api from "../utils/axios";

// Función para obtener las tareas
export const getTasks = async (status?: "completed" | "pending"): Promise<Task[]> => {
    const response = await api.get("/tasks", {
      params: status ? { status } : undefined,
    });
    return response.data;
  };

// Cambiar el estado de completado de una tarea
export const toggleTaskCompletion = async (task: Task): Promise<Task> => {
    const updatedTask = { ...task, completed: !task.completed };
    const { data } = await api.put<Task>(`/tasks/${task._id}`, updatedTask);
    return data;
  };
  
// Eliminar una tarea
export const deleteTask = async (taskId: string): Promise<void> => {
    await api.delete(`/tasks/${taskId}`);
};

// Actualizar una tarea
export const updateTask = async (taskId: string, updatedTask: Partial<Task>): Promise<Task> => {
    const { data } = await api.put<Task>(`/tasks/${taskId}`, updatedTask);
    return data;
  };