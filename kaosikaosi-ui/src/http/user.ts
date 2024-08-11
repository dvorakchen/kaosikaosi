import { UserProfile } from "./models";
import { req } from "./request";

export async function getUserProfile(name: string): Promise<UserProfile> {
  const resp = await req.get(`users/${name}/profile`);

  return resp.data as UserProfile;
}
