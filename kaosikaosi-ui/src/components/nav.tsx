import { Link, useNavigate } from "react-router-dom";
import { logout } from "~/http/authentication";
import { CurrentUser } from "~/global";
import { useCurrentUser } from "~/hooks";
import { useRef } from "react";
import { PublishPost } from "./publish-post";

export default function Narbar() {
  const user = useCurrentUser();
  let publishPost = useRef<HTMLDialogElement>(null);

  function handleOpenPublishDialog() {
    publishPost.current!.showModal();
  }

  return (
    <>
      <nav className="navbar bg-base-100 shadow">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" href="/">
            考斯考斯
          </a>
        </div>
        {/* operating */}
        <div className="flex-none space-x-2">
          <button className="btn btn-primary" onClick={handleOpenPublishDialog}>
            发布
          </button>
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

      <dialog id="publishPost" className="modal items-end" ref={publishPost}>
        <div
          className="modal-box w-full h-5/6 md:w-11/12 md:max-w-5xl py-0
          flex flex-col"
        >
          <div className="sticky top-0 z-10 flex flex-row-reverse h-14 items-center bg-base-100 py-4">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost" title="关闭">
                ✕
              </button>
            </form>
          </div>
          <div className="flex-grow">
            <PublishPost />
          </div>
        </div>
      </dialog>
    </>
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
