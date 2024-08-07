import { useEffect } from "react";
import { isLoggedIn } from "../http/authentication";
import { CurrentUser } from "~/global";
import { useNavigate } from "react-router-dom";

/**
 * ensure the user is logged in.
 *
 * if logged in, update the current user information, or redirect to authenticate page
 */
export function useEnsureLoggedIn() {

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const loggedInModel = await isLoggedIn();
      if (loggedInModel === null) {
        CurrentUser.clear();
        navigate("/authenticate");
      } else {
        CurrentUser.setLoggedIn(loggedInModel);
      }
    })();
  }, []);
}
