import { LoggedInModel } from "./http/models";

class User {
  private loggedInModel: LoggedInModel | null = null;

  public getLoggedIn = () => {
    return this.loggedInModel;
  }

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
