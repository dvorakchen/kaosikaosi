import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToLogin } from "~/hooks";
import { UserProfile } from "~/http/models";
import { getUserProfile } from "~/http/user";

export default function Profile() {
  const { username } = useParams();
  const toLogin = useToLogin();
  const [userProfile, setUserProfile] = useState<null | UserProfile>(null);

  if (username === undefined) {
    toLogin();
    return;
  }

  useEffect(() => {
    (async () => {
      const res = await getUserProfile(username);
      setUserProfile(res);
    })();
  }, []);

  return (
    <>
      {userProfile === null ? <Skeleton /> : <Main userProfile={userProfile} />}
    </>
  );
}

function Main({ userProfile }: { userProfile: UserProfile }) {
  return (
    <div className="hero bg-base-200 min-h-40 sm:min-h-60">
      <div className="hero-content w-9/12 flex-col md:flex-row md:justify-start md:items-end space-x-4">
        <div className="w-24 sm:w-36 rounded-full">
          <img
            src={userProfile.profile}
            className="w-full h-full rounded-full shadow-2xl"
          />
        </div>

        <div className="h-full">
          <h1 className="text-5xl font-bold">{userProfile.name}</h1>
          <p className="py-6">Coser</p>
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return <div>Skeleton</div>;
}
