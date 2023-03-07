import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authAction from "src/redux/actions/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "components/Footer";
import Layout from "components/Layout";
import Loading from "components/ButtonLoading";
import optimap from "assets/logo-optimap.jpg";
import Link from "next/link";

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const [body, setBody] = useState({});

  const changeHandler = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const handleHome = () => {
    router.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!body.email && !body.password) {
      return toast.error("Fill your data correctly!");
    }

    if (!body.email) {
      return toast.error("Input your email!");
    }

    if (!body.password) {
      return toast.error("Input your password!");
    }

    const loginSuccess = () => {
      toast.success("Login success!");
      router.push("/");
    };

    const loginDenied = (error) => {
      toast.error(`Login failed! ${error.response.data.status}`);
    };

    dispatch(authAction.loginThunk(body, loginSuccess, loginDenied));
  };

  return (
    <div className="max-w-[1440px] m-auto flex flex-col">
      <Layout title="Login"></Layout>
      <header className="flex items-center bg-emerald-700 h-20 px-8">
        <Image
          src={optimap}
          width={30}
          height={30}
          style={{ borderRadius: "50px" }}
          alt="logo OptiMap"
        />
        <h2
          className="text-xl sm:text-3xl font-primary text-white font-bold dark:text-white ml-4 cursor-pointer"
          onClick={() => handleHome()}
        >
          OptiMap Quiz
        </h2>
      </header>
      <section className="h-[38rem] sm:h-[825px] flex items-center justify-center bg-gray-100">
        <div className="w-[500px] p-14 border-2 rounded-lg bg-white">
          <h2 className="text-3xl font-primary text-emerald-900 font-bold dark:text-white cursor-pointer mb-10">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-8">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 font-primary block text-base font-medium text-slate-700">
                Email
              </span>
              <input
                type="text"
                name="email"
                placeholder="Enter your e-mail"
                className="font-primary text-md mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-red-500 invalid:text-red-600
    "
                onChange={changeHandler}
              />
            </label>
            <label className="block mb-10">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 font-primary block text-base font-medium text-slate-700">
                Password
              </span>
              {/* <!-- Using form state modifiers, the classes can be identical for every input --> */}
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="font-primary text-md mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-red-500 invalid:text-red-600
    "
                onChange={changeHandler}
              />
            </label>
            <div className="flex flex-row-reverse">
              {isLoading ? (
                <Loading></Loading>
              ) : (
                <button className="w-full sm:w-40 h-10 rounded-md bg-emerald-700 font-primary font-semibold text-white hover:bg-emerald-900">
                  Login
                </button>
              )}
            </div>
          </form>
          <p className="w-full text-center mt-20">
            Don&#39;t have an account? Let&#39;s{" "}
            <Link href={"/auth/register"}>
              <span className="text-blue-700 hover:underline">Sign Up</span>
            </Link>
          </p>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Login;
