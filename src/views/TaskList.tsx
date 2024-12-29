import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Task } from "../types";
import { getTasks, toggleTaskCompletion, deleteTask } from "../api/TaskManagerAPI";
import { useState } from "react";

export default function TaskList() {
    const queryClient = useQueryClient();
    const [filter, setFilter] = useState<"completed" | "pending" | "all">("all");

    // Obtener las tareas con filtro
    const { data: tasks, isLoading, error } = useQuery<Task[], Error>({
        queryKey: ["tasks", filter], // Clave dinámica
        queryFn: () => getTasks(filter === "all" ? undefined : filter),
    });

    // Mutación para cambiar el estado de completado
    const toggleCompletionMutation = useMutation({
        mutationFn: toggleTaskCompletion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks", filter] });
        },
    });

    // Mutación para eliminar una tarea
    const deleteTaskMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks", filter] });
        },
    });

    if (isLoading) {
        return <p>Loading tasks...</p>;
    }

    if (error instanceof Error) {
        return <p className="text-red-500">Error: {error.message}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-white via-gray-100 to-gray-50 rounded-xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl">
            <h1 className="text-4xl font-extrabold mb-6 text-gray-800 text-center tracking-tight">
                📝 Lista De Tareas
            </h1>
            <Link
                to="/task/form"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 hover:shadow-lg transition-transform transform hover:scale-105"
            >
                ➕ Nueva Tarea
            </Link>

            <div className="mb-6 mt-8 flex justify-center items-center space-x-4">
                <label
                    htmlFor="filter"
                    className="text-lg font-medium text-gray-700 whitespace-nowrap"
                >
                    Filtrar Tareas:
                </label>
                <select
                    id="filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as "completed" | "pending" | "all")}
                    className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm hover:shadow-md"
                >
                    <option value="all">Todas</option>
                    <option value="completed">Completas</option>
                    <option value="pending">Pendientes</option>
                </select>
            </div>

            {tasks && tasks.length > 0 ? (
                <ul className="space-y-6">
                    {tasks.map((task) => (
                        <li
                            key={task._id}
                            className="flex flex-col md:flex-row items-center justify-between bg-white p-5 rounded-xl shadow-lg hover:bg-gray-50 hover:shadow-xl transition-transform transform hover:scale-105"
                        >
                            <div className="flex-1">
                                <span
                                    className={`font-medium text-lg ${task.completed ? "line-through text-gray-500" : "text-gray-800"
                                        }`}
                                >
                                    {task.title}
                                </span>
                                <p className="text-sm text-gray-600">{task.description}</p>
                            </div>
                            <div className="flex items-center space-x-3 mt-4 md:mt-0">
                                <button
                                    onClick={() => toggleCompletionMutation.mutate(task)}
                                    className={`px-4 py-2 rounded-full text-white font-medium transition-transform transform hover:scale-105 ${task.completed
                                            ? "bg-yellow-500 hover:bg-yellow-600"
                                            : "bg-green-500 hover:bg-green-600"
                                        }`}
                                >
                                    {task.completed ? "Marcar como Pendiente" : "Marcar como Completa"}
                                </button>
                                <Link
                                    to={`/task/update/${task._id}`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105"
                                >
                                    ✏️ Actualizar
                                </Link>
                                <button
                                    onClick={() => deleteTaskMutation.mutate(task._id)}
                                    className="group relative flex h-14 w-14 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600"
                                >
                                    <svg
                                        viewBox="0 0 1.625 1.625"
                                        className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                                        height="15"
                                        width="15"
                                    >
                                        <path
                                            d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"
                                        ></path>
                                        <path
                                            d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"
                                        ></path>
                                        <path
                                            d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"
                                        ></path>
                                    </svg>
                                    <svg
                                        width="16"
                                        fill="none"
                                        viewBox="0 0 39 7"
                                        className="origin-right duration-500 group-hover:rotate-90"
                                    >
                                        <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
                                        <line
                                            stroke-width="3"
                                            stroke="white"
                                            y2="1.5"
                                            x2="26.0357"
                                            y1="1.5"
                                            x1="12"
                                        ></line>
                                    </svg>
                                    <svg width="16" fill="none" viewBox="0 0 33 39" className="">
                                        <mask fill="white" id="path-1-inside-1_8_19">
                                            <path
                                                d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                            ></path>
                                        </mask>
                                        <path
                                            mask="url(#path-1-inside-1_8_19)"
                                            fill="white"
                                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                        ></path>
                                        <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                                        <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600 text-center text-lg mt-8">
                    🚫 No hay tareas disponibles
                </p>
            )}
        </div>
    );
}
