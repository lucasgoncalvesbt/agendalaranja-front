import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Nav() {
  const { logout } = useAuth();

  function handlerClick() {
    logout();
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/estacao">Estação</Link>
      <Link to="/login">Login</Link>
      <Link to="/agendamento">Agendamento</Link>
      <button onClick={handlerClick}>Loggout</button>
    </nav>
  )
}