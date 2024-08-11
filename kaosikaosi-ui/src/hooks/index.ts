import { useNavigate } from "react-router-dom";

export { useCurrentUser } from "./currentUser";
export { useEnsureLoggedIn } from "./ensureLoggedIn";

export function useToLogin() {
  const navigate = useNavigate();

  return () => {
    navigate("/authenticate");
  };
}
