import React, { useState } from "react";
import Image from "next/image";

import optimap from "assets/logo-optimap.jpg";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Modal from "components/ModalLogout";

function Header() {
  const router = useRouter();
  const token = useSelector((state) => state.auth.userData.token);
  const profile = useSelector((state) => state.auth.profile);

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    setOpen(!open);
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };
  const handleSignup = () => {
    router.push("/auth/register");
  };
  const handleHome = () => {
    router.push("/");
  };

  return (
    <main>
      <section className="max-w-[1440px] h-20 bg-emerald-700 flex m-auto px-8 justify-between">
        <button className="flex items-center" onClick={() => handleHome()}>
          <Image
            src={optimap}
            width={30}
            height={30}
            style={{ borderRadius: "50px" }}
            alt="logo OptiMap"
          />
          <h2 className="hidden sm:block text-3xl font-primary text-white font-bold dark:text-white ml-4 cursor-pointer">
            OptiMap Quiz
          </h2>
        </button>
        {/* Navbar */}
        <nav className="flex items-center">
          {token ? (
            <div className="flex items-center">
              {/* Navbar ketika sudah login */}

              <h4 className="text-l font-primary text-white font-normal dark:text-white mr-4">
                {profile.name}
              </h4>
              <button
                className="w-20 h-8 rounded-md bg-white font-primary font-semibold text-emerald-900 hover:bg-emerald-900 hover:text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              {/* Navbar ketika belum login */}

              <button
                className="w-20 h-8 rounded-md font-primary font-semibold text-white mr-4 hover:bg-emerald-900"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="w-20 h-8 rounded-md bg-white font-primary font-semibold text-emerald-900 hover:bg-emerald-900 hover:text-white"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </div>
          )}
        </nav>
      </section>
      <Modal show={show} open={open} setOpen={setOpen} />
    </main>
  );
}

export default Header;
