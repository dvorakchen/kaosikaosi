import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/users/SendCAPTCHAFromEmail", async () => {
    await delay(1000);
    return HttpResponse.text();
  }),

  http.post("/api/users/ValidCAPTCHA", async () => {
    await delay(1000);
    return HttpResponse.text();
  }),

  http.post("/users/IsLoggedIn", async () => {
    return HttpResponse.json({
      id: "548312b6-a7ec-496b-ab7c-cc4c16060882",
      name: "Dvorak",
      email: "birenchens@163.com",
    });
  }),
];
