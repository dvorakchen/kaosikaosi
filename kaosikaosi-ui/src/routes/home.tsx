import { useNavigate } from "react-router-dom";
import { useEnsureLoggedIn } from "~/hooks";
import { logout } from "~/http/authentication";
import { CurrentUser } from "~/global";
import { useCurrentUser } from "~/hooks";
import { useState } from "react";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEnsureLoggedIn((user) => {
    setIsLoggedIn(user !== null);
  });useEnsureLoggedIn((user) => {
  });

  return <>{isLoggedIn ? <Narbar /> : <Skeleton />}</>;
}

function Narbar() {
  const user = useCurrentUser();

  return (
    <nav className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          考斯考斯
        </a>
      </div>
      {/* operating */}
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt={user?.name} src={user?.profile} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                个人信息
                <span className="badge badge-primary">New</span>
              </a>
            </li>
            <li>
              <a>设置</a>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Logout() {
  const navigate = useNavigate();

  async function handleLogout() {
    logout();
    CurrentUser.clear();
    navigate("/authenticate");
  }

  return <a onClick={handleLogout}>Logout</a>;
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
      <div className="flex-none skeleton w-32 h-12">
      </div>
    </div>
  );
}

export default Home;
