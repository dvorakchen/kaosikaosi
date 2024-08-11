export class LoggedInModel {
  id: string = "";
  email: string = "";
  name: string = "";
  profile: string = "";
}

export class UserProfile {
  id: string = "";
  name: string = "";
  profile: string = "";
  email: string = "";
  invitation: string = "";
  status: UserStatus = UserStatus.Activity;
  CreateDateTime: string = "";
}

export enum UserStatus {
  Activity = 0,
  Blocking,
  Deleted,
}
