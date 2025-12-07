import { Link, useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  const handleRefresh = () => {

    const currentPath = window.location.pathname;

    navigate(currentPath);
    window.location.reload();
  };
  return (
    <div className="bg-black ">
      <div className="pt-10">
        <div className=" bg-gray-200 py-4 px-8 rounded-full flex justify-between items-center shadow-md mx-44">
          {/* Logo */}
          <img
            src="./NatPower-Dark.png"
            alt="Natpower Marine Logo"
            className="h-[16px] w-[104px] object-contain cursor-pointer"
            onClick={() => {
              handleRefresh();
            }}
          />

          {/* Navigation Links */}
          <nav className="flex items-center space-x-8">
            <a
              href="https://www.natpower.uk/"
              target="_blank"
              className="text-gray-800 hover:text-black"
            >
              About Us
            </a>
            <div className="relative">
              {/* <a
                href="#"
                className="text-gray-800 hover:text-black flex items-center"
              >
                Pages
                <span className="ml-1">▾</span>
              </a> */}
              {/* Dropdown menu can be added here if needed */}
            </div>
            {/* <a href="#" className="text-gray-800 hover:text-black">
              Press & Media
            </a> */}
          </nav>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <button className="px-4 py-2 border border-gray-800 rounded-full hover:bg-gray-300">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
