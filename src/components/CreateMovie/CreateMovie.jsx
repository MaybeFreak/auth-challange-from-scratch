import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorP from "../ErrorP/ErrorP";
import gsap from "gsap";
import "./CreateMovie.css";

const apiUrl = import.meta.env.VITE_API_URL;

const CreateMovie = () => {
  const navigate = useNavigate();
  const [movieError, setMovieError] = useState(undefined);
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    runtimeMins: 60,
  });

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(".createMovie", { opacity: 0 }, { opacity: 1 });
    tl.fromTo(
      ".formContainer",
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
      1
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateMovie(movie);
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    setMovieError(undefined);
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description, runtimeMins }),
    };
    const res = await fetch(`${apiUrl}/movie`, opts).then((res) => res.json());
    if (res.movie) {
      navigate("/");
    } else if (res.error) {
      setMovieError(res.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMovie({
      ...movie,
      [name]: name === "runtimeMins" ? parseInt(value) : value,
    });
  };

  return (
    <>
      <h1 className="createMovie">Create new Movie</h1>
      <div className="formContainer">
        <form onSubmit={handleSubmit} className="movieForm">
          <div className="labelInputPair">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={movie.title}
              onChange={handleChange}
            />
          </div>
          <div className="labelInputPair">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              rows={5}
              value={movie.description}
              onChange={handleChange}
            />
          </div>
          <div className="labelInputPair">
            <label htmlFor="runtimeMins">Runtime</label>
            <input
              type="number"
              name="runtimeMins"
              placeholder="in minutes"
              value={movie.runtimeMins}
              onChange={handleChange}
            />
          </div>
          {movieError !== undefined && <ErrorP message={movieError} />}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default CreateMovie;
