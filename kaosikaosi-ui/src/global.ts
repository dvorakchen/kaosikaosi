import { LoggedInModel } from "./http/models";

class User {
  private loggedInModel: LoggedInModel | null = null;

  public getLoggedIn = () => {
    return this.loggedInModel;
  };

  public setLoggedIn = (model: LoggedInModel) => {
    this.loggedInModel = model;
  };

  public isLoggedIn = () => {
    return this.loggedInModel !== null;
  };

  public clear = () => {
    this.loggedInModel = null;
  };
}

export const CurrentUser: User = new User();

export const ALLOWED_PHOTO_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
]);

export function isAllowedPhoto(photo: string): boolean {
  const t = photo.split(".");
  return (
    t.length > 1 &&
    ALLOWED_PHOTO_EXTENSIONS.has(t[t.length - 1].toLowerCase().trim())
  );
}
