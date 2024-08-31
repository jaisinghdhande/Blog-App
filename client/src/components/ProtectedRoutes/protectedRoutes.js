import { useContext } from "react";
import { UserContext } from "../../Provider/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../Login/login";

const ProtectedRoutes = () => {
  const { userInfo,isLoading } = useContext(UserContext);

  const isAuthenticated = userInfo && userInfo.id;

  /*
  Note: <Navigate to="/login" /> will actually route the url to login, 
  wherer as Simply putting <Login> will render the 
  compoenet to the http://localhost:3000 and not to http://localhost:3000/login 
  */
if(isLoading) return

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
