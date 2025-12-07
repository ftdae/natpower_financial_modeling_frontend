import { Navigate, useLocation } from 'react-router-dom';
import { selectAuth } from '../store/slices/authSlice';
import { useAppSelector } from '../hooks/hooks';

interface PrivateRouteProps {
  children: JSX.Element;
  redirectPath?: string; // Optional prop for custom redirect path
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, redirectPath = "/login" }) => {
  const { isLoggedIn } = useAppSelector(selectAuth);
  const location = useLocation();

  if (!isLoggedIn) {
    // Not logged in, redirect to the specified path with the return URL
    return <Navigate to={redirectPath} state={{ from: location }} />;
  }

  // Authorized, return child components
  return children;
};

export default PrivateRoute;
