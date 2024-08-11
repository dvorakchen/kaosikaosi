import { PropsWithChildren } from "react";
import { CurrentUser } from "~/global";

export function LoggedIn({ children }: PropsWithChildren) {
  return <>{CurrentUser.isLoggedIn() ? children : <></>}</>;
}
