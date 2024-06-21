import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, selectDarkMode } from "../../Store/DarkModeSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import { auth } from "../../firebase/config";

function Header() {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  const [refresh, setRefresh] = useState(false);
  const {
    data: [data],
    isPending,
    error,
  } = useGetData("cart", refresh);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [theme, setTheme] = useState(
    localStorage.getItem("darkmode") || "light"
  );
  const { items: products } = useSelector((state) => state.cart);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("darkmode", theme);
  }, [theme]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleToggleDarkMode = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    dispatch(toggleDarkMode());
  };
  const user1 = auth?.currentUser?.providerData[0];
  console.log(user1);

  return (
    <header className="bg-base-300">
      <div className="container navbar">
        <div className="navbar-start">
          <div className="dropdown rounded-lg bg-[#057AFF] width={48} height={48}">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-badge">
              {user && user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="user icon"
                  width={40}
                  height={40}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width={48}
                  height={48}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14.5a5 5 0 1 0-10 0 5 5 0 0 0 10 0zM14.5 3a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zM12 14.5a5 5 0 1 0-10 0 5 5 0 0 0 10 0zM20.5 14.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"
                  />
                </svg>
              )}
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <p>Name: {user.displayName}</p>
                <p>Email: {user.email}</p>
                <div className="card-actions">
                  <button
                    className="btn btn-sm btn-primary btn-block"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-center flex items-center justify-between gap-5">
          <NavLink to={"/"} className="nav-link text-[14px]">
            Home
          </NavLink>
          <NavLink to={"/products"} className="nav-link text-[14px]">
            Products
          </NavLink>
          <NavLink to={"/cart"} className="nav-link text-[14px]">
            Cart
          </NavLink>
        </div>
        <div className="navbar-end">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              onChange={handleToggleDarkMode}
              checked={darkMode}
            />
            <svg
              className="swap-off fill-current w-[26px] h-[26px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              className="swap-on fill-current w-[26px] h-[26px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.69,5.78,8,8,0,0,1,10.42,2,1,1,0,0,0,9.43.52,10,10,0,1,0,22,14.58,1,1,0,0,0,21.64,13Z" />
            </svg>
          </label>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
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
                <span className="badge badge-sm indicator-item">
                  {products.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  {products.reduce((total, item) => total + item.quantity, 0)}{" "}
                  Items
                </span>
                <span className="text-info">
                  Subtotal: $
                  {products
                    .reduce(
                      (total, item) => total + item.quantity * item.price,
                      0
                    )
                    .toFixed(2)}
                </span>
                <div className="card-actions">
                  <Link to={"/cart"} className="btn btn-primary btn-block">
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
