import { Outlet, Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/utils";

const ProtectedRoutes = () => {
  const token = isLoggedIn("AdminData"); 

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
