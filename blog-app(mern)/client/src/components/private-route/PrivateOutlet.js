import { Navigate, Outlet } from "react-router-dom";
const PrivateOutlet = () => {
//   const cookies = Cookies.get('access_token');
// //   const checkToken = cookies.get("access_token");
//   console.log(cookies);
const auth = sessionStorage.getItem('token')
  return auth ? <Outlet /> : <Navigate to="/register/login" />;
};

export default PrivateOutlet;
