import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
//import { AuthProvider } from '../../contexts/auth';



export default function Index({ }: any) {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // const token = localStorage.getItem('X-Access-Token');
  //   const cookies = document.cookie.split(';');
  //   const hasMsalStatus = cookies.some(cookie => cookie.trim().startsWith('msal.interaction.status='));

  //   if (!hasMsalStatus) {
  //     navigate('/auth');
  //   }

  // }, []);

  return (
    <div className="bg-zinc-100 min-h-screen">
      <Navbar />
      <Outlet />
    </div>
    // <AuthProvider>
    //   <div className="bg-zinc-100 h-screen">
    //     <Navbar />
    //     <Outlet />
    //   </div>
    // </AuthProvider>
  );
}
