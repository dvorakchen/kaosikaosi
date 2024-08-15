import { delay, http, HttpResponse } from "msw";
import { isAllowedPhoto } from "~/global";
import { LoggedInModel, UserProfile, UserStatus } from "~/http/models";

const API_URL = import.meta.env.VITE_API_URL;

const users = [
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
        profile:
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
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

  http.get(`${API_URL}api/users/:id/profile`, () => {
    return HttpResponse.json({
      id: "548312b6-a7ec-496b-ab7c-cc4c16060882",
      name: "Dvorak",
      email: "birenchens@163.com",
      profile:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      invitation: "548312b6-a7ec-496b-ab7c-cc4c16060883",
      status: UserStatus.Activity,
      CreateDateTime: "2024-08-08 12:25:20",
    } as UserProfile);
  }),
];

const posts = [
  http.post(`${API_URL}api/posts/:id`, async ({ request }) => {
    const files = await request.formData();

    let len = 0;
    for (const file of files) {
      try {
        if (isAllowedPhoto(file[0]) && file[1] instanceof File) {
          len++;
        } else {
          continue;
        }
      } catch (error) {
        console.error(error);
        continue;
      }
    }
    if (len === 0) {
      return HttpResponse.text("没有上传任何文件", { status: 400 });
    }

    await delay(2000);
    return HttpResponse.json(null);
  }),
];

export const handlers = [...users, ...posts];
