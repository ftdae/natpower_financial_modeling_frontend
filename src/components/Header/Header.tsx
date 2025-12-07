import { useState, useEffect, useRef } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { logoutAsync, selectAuth } from "../../store/slices/authSlice";
import { useSelector } from "react-redux";
import { openSidebar, closeSidebar } from "../../store/slices/sidebarSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { selectParam } from "../../store/slices/parameterSlice";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userRef = useRef(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isOpen = useSelector((state: any) => state.sidebar.isOpen);
  const { currentProjectType, currentParameterId, parameters } =
    useAppSelector(selectParam);
  const { user } =
    useAppSelector(selectAuth);
  const currentProjectName = parameters.find((parameter) => parameter.id == currentParameterId)?.title

  const logout = async () => {
    try {
      await dispatch(logoutAsync());
      console.log("User logged out successfully");
      localStorage.removeItem("X-Access-Token");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      userRef.current &&
      !userRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div className={` transition-all transition-150 h-[70px] shadow-lg flex justify-between items-center px-5 relative`}>
      {isOpen ? (
        <GoSidebarExpand
          className="text-neutral-500 h-6 w-6 cursor-pointer"
          onClick={() => dispatch(closeSidebar())}
        />
      ) : (
        <GoSidebarCollapse
          className="text-neutral-500 h-6 w-6 cursor-pointer"
          onClick={() => dispatch(openSidebar())}
        />
      )}
      <div className="flex-grow text-left" style={{ paddingLeft: '20px', fontFamily: 'serif', fontWeight: 'bold', fontSize: '25px' }}>
        {currentProjectName || "No project selected"}
      </div>
      <div className="flex-grow text-right" style={{ paddingRight: '20px', fontFamily: 'serif' }}>
        {user.email || "No project selected"}
      </div>
      <div
        className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
        onClick={toggleDropdown}
        ref={userRef}
      >
        <svg
          className="absolute w-12 h-12 text-gray-400 -left-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-5 top-12 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
        >
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Settings
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={logout}
            >
              <FiLogOut size="16" color="red" /> Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
