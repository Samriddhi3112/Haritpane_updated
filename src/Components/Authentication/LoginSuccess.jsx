import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = sessionStorage.getItem("AdminData");
    if (!storedData) {
      navigate("/login", { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="login-welcome">
      <div className="LoginArea">
        <div className="LoginBox">
          <div className="LoginLeft">
            <p>Redirecting to your dashboard...</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginSuccess;
