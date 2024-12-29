import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to={'/'}>
            <div className="flex items-center space-x-3">
            <img
              src="/logo.svg"
              alt="Logo"
              className="w-10 h-10"
            />
            <h1 className="text-xl font-semibold tracking-wide">Task Manager</h1>
          </div>
        </Link>
    );
}

