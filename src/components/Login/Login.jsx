import ASCIIText from "../ASCII-Text/ASCIIText";
import LoginForm from "../LoginForm/LoginForm";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";
import "./Login.css";

const Login = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(".LoginPage", { y: -300 }, { y: 0 }, 0.5);
    tl.fromTo(".register", { opacity: 0 }, { opacity: 1 }, 1.5);
  });

  return (
    <div className="LoginPage">
      <ASCIIText
        message={"Block Busted"}
        font={"Big Money-nw"}
        fadeType={"vertical"}
        colors={["#fb6630", "#ff748d", "#c554f3", "#6f6ff4"]}
      />
      <LoginForm />
      <div className="register">
        <p>Don't have and account?</p>
        <NavLink to="/register">Sign up here</NavLink>
      </div>
    </div>
  );
};

export default Login;
