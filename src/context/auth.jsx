import { useEffect } from "react";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import ASCIIText from "../components/ASCII-Text/ASCIIText";
import gsap from "gsap";

const ProtectedRoute = ({ children }) => {
  const token = window.localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo("header", { y: -100 }, { y: 0 }, 0.5);
  }, []);

  const handelLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  if (!token) {
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }

  return (
    <>
      <header>
        <ASCIIText
          message={"Block Busted"}
          font={"Slant"}
          fadeType={"vertical"}
          colors={["#fb6630", "#ff748d", "#c554f3", "#6f6ff4"]}
        />
        <nav>
          <NavLink to={"/"}>Home</NavLink>
          <button className="logout" onClick={handelLogout}>
            Log out
          </button>
        </nav>
      </header>
      {children}
    </>
  );
};

export { ProtectedRoute };
