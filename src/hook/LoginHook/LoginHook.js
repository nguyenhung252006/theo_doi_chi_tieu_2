import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function LoginHook() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const id = localStorage.getItem("id");


    const publicPaths = ["/login", "/create"];

    if (!id && !publicPaths.includes(location.pathname)) {
      navigate("/login");
    }

    if (id && publicPaths.includes(location.pathname)) {
      navigate("/");
    }

  }, [location, navigate]);

  return null;
}

export default LoginHook
