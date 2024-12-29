import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

export default function HomeView() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/task/list');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex flex-col">
      <header className="bg-transparent py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex space-x-6">
            <Link to="/task/list" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              Tus Tareas
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center text-center">
        <div className="max-w-3xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Bienvenido a <span className="text-yellow-400">TaskManager</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-blue-100">
            Organiza, prioriza y gestiona tus tareas de manera sencilla. 
            ¡Lleva tu productividad al siguiente nivel!
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-yellow-400 text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-yellow-500 transition"
            >
              Comenzar Ahora
            </button>
            <Link
              to="/auth/register"
              className="bg-transparent border-2 border-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Crear Cuenta
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white text-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">¿Por qué elegir TaskManager?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5 4a9 9 0 11-6.219-8.56"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Fácil de Usar</h3>
              <p className="mt-2 text-sm text-gray-600">
                Diseñado para simplificar tu flujo de trabajo sin complicaciones.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Eficiencia Garantizada</h3>
              <p className="mt-2 text-sm text-gray-600">
                Organiza tus tareas para maximizar tu tiempo y esfuerzo.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v2a2 2 0 002 2h2a2 2 0 002-2v-2m-3-8h.01M4 16.5A6.5 6.5 0 0110.5 10h3a6.5 6.5 0 016.5 6.5V17a6.5 6.5 0 01-6.5 6.5h-3A6.5 6.5 0 014 17v-.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Soporte Completo</h3>
              <p className="mt-2 text-sm text-gray-600">
                Nuestro equipo está listo para ayudarte en cualquier momento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-sm py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>
            © 2024 <span className="text-white font-semibold">TaskManager</span>. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
