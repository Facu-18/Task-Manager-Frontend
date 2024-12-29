import { Outlet, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

export default function AuthLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          <Logo />

          {/* Mobile Menu */}
          <button
            className="md:hidden text-white focus:outline-none"
            aria-label="Abrir menú de navegación"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/task/list"
              className="text-lg font-medium hover:text-blue-200 transition-all"
            >
              Tareas
            </a>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg text-white font-medium hover:bg-red-600 transition-all"
            >
              Cerrar Sesión
            </button>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <nav className="bg-indigo-700 text-white p-4 flex flex-col space-y-4">
            <a href="/task/list" className="hover:text-blue-200 transition">
              Tareas
            </a>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg text-white font-medium hover:bg-red-600 transition"
            >
              Cerrar Sesión
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-sm py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>
            © 2024 <span className="text-white font-semibold">Mi Aplicación</span>. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
