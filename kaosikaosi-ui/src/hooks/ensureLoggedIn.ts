import { useEffect } from "react";
import { isLoggedIn } from "../http/authentication";
import { CurrentUser } from "~/global";
import { useNavigate } from "react-router-dom";
import { LoggedInModel } from "~/http/models";

const cache = new (class {
  private key = "LOGGED_ID_TEMPORARY_KEY";

  public has(): boolean {
    return localStorage.getItem(this.key) !== null;
  }

  public set(newValue: LoggedInModel) {
    localStorage.setItem(this.key, JSON.stringify(newValue));
    setTimeout(() => {
      this.remove();
    }, 5000);
  }

  public get(): null | LoggedInModel {
    if (this.has()) {
      return JSON.parse(localStorage.getItem(this.key)!);
    }
    return null;
  }

  public remove() {
    localStorage.removeItem(this.key);
  }
})();

(() => {
  if (cache.has()) {
    cache.remove();
  }
})();

/**
 * ensure the user is logged in.
 *
 * if logged in, update the current user information, or redirect to authenticate page
 */
export function useEnsureLoggedIn(cb: (user: LoggedInModel) => void) {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let loggedInModel: null | LoggedInModel;
      if (cache.has()) {
        loggedInModel = cache.get();
      } else {
        loggedInModel = await isLoggedIn();
        if (loggedInModel !== null) {
          cache.set(loggedInModel);
        }
      }
      if (loggedInModel === null) {
        CurrentUser.clear();
        navigate("/authenticate");
      } else {
        CurrentUser.setLoggedIn(loggedInModel);
        cb(loggedInModel);
      }
    })();
  }, []);
}
