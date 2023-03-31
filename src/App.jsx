import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./context/auth";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CreateMovie from "./components/CreateMovie/CreateMovie";

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="movies/create"
          element={
            <ProtectedRoute>
              <CreateMovie />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
