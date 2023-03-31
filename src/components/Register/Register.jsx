import { NavLink } from "react-router-dom";
import ASCIIText from "../ASCII-Text/ASCIIText";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useEffect } from "react";
import gsap from "gsap";
import "./Register.css";

const Login = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(".LoginPage", { y: -300 }, { y: 0 }, 0.5);
    tl.fromTo(".login", { opacity: 0 }, { opacity: 1 }, 1.5);
  });

  return (
    <div className="LoginPage">
      <ASCIIText
        message={"Block Busted"}
        font={"Big Money-nw"}
        fadeType={"vertical"}
        colors={["#fb6630", "#ff748d", "#c554f3", "#6f6ff4"]}
      />
      <RegisterForm />
      <div className="login">
        <p>Already have an account?</p>
        <NavLink to={"/login"}>Login here</NavLink>
      </div>
    </div>
  );
};

export default Login;
