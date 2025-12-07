import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import SidebarContent from "../Sidebar";
import { Header } from "../../components/Header/Header";
import { useSelector } from "react-redux";
import ExtendedSidebarContent from "../Extended Sidebar";
//import { AuthProvider } from '../../contexts/auth';

export default function WholeContent({ }: any) {
  // const navigate = useNavigate();

  // useEffect(() => {
  //     // const token = localStorage.getItem('X-Access-Token');
  //     const cookies = document.cookie.split(';');
  //     const hasMsalStatus = cookies.some(cookie => cookie.trim().startsWith('msal.interaction.status='));

  //     if (!hasMsalStatus) {
  //         navigate('/signin');
  //     }

  // }, []);

  const isOpen = useSelector((state: any) => state.sidebar.isOpen);
  const [contentWidth, setContentWidth] = useState(window.innerWidth);

  useEffect(() => {
    const sidebarWidth = isOpen ? 280 : 90;
    setContentWidth(window.innerWidth - sidebarWidth);
    const handleResize = () => {
      setContentWidth(window.innerWidth - sidebarWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <div className="flex h-full w-full overflow-x-hidden">
      <div>
        <ExtendedSidebarContent />
      </div>

      <div
        className="flex flex-col transition-all transition-150"
        style={{ width: contentWidth }}
      >
        <Header />
        <div
          className="flex grow overflow-y-auto "
          style={{
            scrollbarWidth: "thin",
            msOverflowStyle: "-ms-autohiding-scrollbar",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
