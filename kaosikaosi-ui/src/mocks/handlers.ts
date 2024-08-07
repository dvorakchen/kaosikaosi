import { delay, http, HttpResponse } from "msw";
import { LoggedInModel } from "~/http/models";

const API_URL = import.meta.env.VITE_API_URL;

export const handlers = [
  http.post(`${API_URL}api/users/SendCAPTCHAFromEmail`, async () => {
    await delay(1000);
    return HttpResponse.text();
  }),

  http.post(`${API_URL}api/users/ValidCAPTCHA`, async () => {
    await delay(1000);
    return HttpResponse.text(null, {
      headers: {
        "Set-Cookie": "mySecret=COOKIE-PLACEHOLDER",
      },
    });
  }),

  http.post(`${API_URL}api/users/IsLoggedIn`, ({ cookies }) => {
    if (cookies.mySecret) {
      return HttpResponse.json({
        id: "548312b6-a7ec-496b-ab7c-cc4c16060882",
        name: "Dvorak",
        email: "birenchens@163.com",
        profile: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      } as LoggedInModel);
    } else {
      return HttpResponse.json("检测到账号异常，请重新登陆", {
        status: 401,
      });
    }
  }),

  http.post(`${API_URL}api/users/logout`, () => {
    return HttpResponse.json(null, {
      headers: {
        "Set-Cookie": "mySecret=",
      },
    });
  }),
];
