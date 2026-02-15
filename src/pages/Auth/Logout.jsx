import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/", { replace: true });
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-alt">
      <p className="text-indigo-600/80">Signing out...</p>
    </div>
  );
};

export default Logout;
