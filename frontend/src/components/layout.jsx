import { Outlet, useNavigate } from "react-router-dom";
import Header from "./header";
const Layout = ({ isLoggedIn, handleLogout }) => {
   const navigate = useNavigate();

   const handleLogoutWithNavigate = () => {
     handleLogout();
     navigate("/"); // Now you can use navigate here
   };

  return (
    <>
      <Header handleLogout={handleLogoutWithNavigate} isLoggedIn={isLoggedIn} />
      <Outlet />
    </>
  );
};
export default Layout;
