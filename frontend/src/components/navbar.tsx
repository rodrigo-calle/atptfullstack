import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0f141a] shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            <div className="flex-shrink-0">
              <p className="text-3xl font-bold text-white">Apuesta Total</p>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/signin">
              <button className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                Iniciar sesión
              </button>
            </Link>
            <Link to="/signup">
              <button className="text-white px-3 py-2 rounded-md text-sm font-medium bg-green-500 hover:bg-green-600">
                Registrarse
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
