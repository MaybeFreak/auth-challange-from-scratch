import { useEffect, useState } from "react";
import "./RegisterForm.css";
import ErrorP from "../ErrorP/ErrorP";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const apiUrl = import.meta.env.VITE_API_URL;

const RegisterForm = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [RegisterError, setRegisterError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".formContainer",
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
      1
    );
  }, []);

  const handelSubmit = (e) => {
    e.preventDefault();
    handelRegister(user);
  };

  const handelRegister = async ({ username, password }) => {
    setLoading(true);
    setRegisterError(undefined);

    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    const res = await fetch(`${apiUrl}/user/register`, opts).then((res) =>
      res.json()
    );

    if (res.error) {
      setRegisterError(res.error);
      setLoading(false);
    }
    if (res.token) {
      window.localStorage.setItem("token", res.token);
      navigate("/");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="formContainer">
      <form onSubmit={handelSubmit} className="registerForm">
        <div className="labelInputPair">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="labelInputPair">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        {RegisterError !== undefined && <ErrorP message={RegisterError} />}
        {!loading && <button type="submit">Sign up</button>}
      </form>
    </div>
  );
};

export default RegisterForm;
