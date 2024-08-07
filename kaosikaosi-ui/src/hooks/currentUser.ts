import { CurrentUser } from "~/global";

export function useCurrentUser() {
  return CurrentUser.getLoggedIn();
}
