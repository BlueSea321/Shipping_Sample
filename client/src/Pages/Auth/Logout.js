import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/Auth";

export default function Logout() {
  const navigate = useNavigate();
  const { setIsLogin } = useAuthContext()

  React.useEffect(() => {
    localStorage.removeItem("transport_token")
    localStorage.removeItem("transport_user_name")
    setIsLogin(false);
    navigate("/login");
  });
  
  return <div>Logout</div>;
}
