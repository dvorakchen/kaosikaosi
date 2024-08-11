import Narbar from "~/components/nav";
import { useEnsureLoggedIn } from "~/hooks";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEnsureLoggedIn((user) => {
    setIsLoggedIn(user !== null);
  });

  return <>{isLoggedIn ? <Main /> : <Skeleton />}</>;
}

function Main() {
  return (
    <main>
      <Narbar />
      <Outlet />
    </main>
  );
}

function Skeleton() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <button
          className="btn btn-ghost text-xl text-base-100 skeleton"
          disabled
        >
          考斯考斯
        </button>
      </div>
      <div className="flex-none skeleton w-32 h-12"></div>
    </div>
  );
}

export default Home;
