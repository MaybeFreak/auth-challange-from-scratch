import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then((res) => res.json())
      .then((res) => setMovies(res.data));
    setTimeout(() => setLoading(false), 500);
  }, []);

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline();
      tl.fromTo(".movieHeading", { opacity: 0 }, { opacity: 1 }, 0.5);
      tl.fromTo(
        ".movie",
        { x: 50, clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
        {
          x: 0,
          clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
          stagger: 0.2,
        },
        1
      );
    }
  }, [loading]);

  if (loading) return <></>;

  return (
    <div className="container">
      <main>
        <div className="movieList">
          <div className="movieHeading">
            <h1>Movie list</h1>
            <NavLink to={"/movies/create"}>+</NavLink>
          </div>
          <ul>
            {movies.map((movie) => {
              return (
                <li key={movie.id} className="movie">
                  <h3 className="movieTitle">{movie.title}</h3>
                  <div className="movieContent">
                    <p>Description: {movie.description}</p>
                    <p>Runtime: {movie.runtimeMins}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
