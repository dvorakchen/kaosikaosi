import { Link, useNavigate } from "react-router-dom";
import { logout } from "~/http/authentication";
import { CurrentUser } from "~/global";
import { useCurrentUser } from "~/hooks";
import { LoggedIn } from "./logged-in";

export default function Narbar() {
  const user = useCurrentUser();

  return (
    <nav className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          考斯考斯
        </a>
      </div>
      {/* operating */}
      <div className="flex-none space-x-2">
        <LoggedIn>
          <button className="btn btn-primary">发布</button>
        </LoggedIn>
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
              <Link to={`/${user?.name}`} className="justify-between">
                个人信息
                <span className="badge badge-primary">New</span>
              </Link>
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
