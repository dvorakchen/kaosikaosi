import { Error } from "./errors";
import { req } from "./request";
import { LoggedInModel } from "./models";

let headers = new Headers();
headers.append("Content-Type", "application/json");

export async function sendCAPTCHA(email: string): Promise<Error> {
  let resp = await req.post(
    "users/SendCAPTCHAFromEmail",
    JSON.stringify(email)
  );
  if (resp.status === 200) {
    return null;
  }

  return await resp.data;
}

export async function validCAPTCHA(
  email: string,
  captcha: string
): Promise<Error> {
  let resp = await req.post(
    "/users/ValidCAPTCHA",
    JSON.stringify({ email, captcha })
  );

  if (resp.status === 200) {
    return null;
  }

  return await resp.data;
}

/**
 * check the current user if logged in
 * @returns <LoggedInModel> if current user logged in, otherwise null
 */
export async function isLoggedIn(): Promise<LoggedInModel | null> {
  let resp = await req.post("/users/IsLoggedIn");
  switch (resp.status) {
    case 200:
      return resp.data as LoggedInModel;
    case 401: {
      console.warn(`401: ${resp.data}`);
    }; break;
    default:
      {
        console.error(`unexpected response: ${resp.status}`);
      }
      break;
  }

  return null;
}

export async function logout() {
  await req.post('/users/logout');
}