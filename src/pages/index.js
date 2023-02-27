import Footer from "components/Footer";
import Header from "components/Header";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authAction from "src/redux/actions/auth";

export default function Home() {
  const router = useRouter();
  const token = useSelector((state) => state.auth.userData.token);
  const dispatch = useDispatch();

  const handleSignup = () => {
    router.push("/auth/register");
  };

  const handleStart = () => {
    if (token) {
      return router.push("quiz-intro/");
    }
    if (!token) {
      return router.push("/auth/login");
    }
  };

  useEffect(() => {
    dispatch(authAction.getProfileThunk(token));
  }, []);

  return (
    <div className="max-w-[1440px] m-auto flex flex-col">
      <Layout></Layout>
      <Header></Header>
      <div className="h-[38rem] sm:h-[825px] px-6 pt-2 sm:px-32 sm:pt-32 border-2 border-gray-100">
        <div className="flex h-40 items-center justify-center mt-2 sm:mt-20">
          <p className="text-4xl sm:text-6xl text-gray-600 font-extrabold dark:text-white leading-[3rem] sm:leading-[5rem]">
            Challenge yourself in{" "}
            <span className="text-emerald-900">OptiMap Quiz</span>
          </p>
          <i className="hidden sm:block fa-solid fa-rocket text-[350px] text-amber-500"></i>
        </div>
        <div className="mt-20">
          {token ? (
            <div></div>
          ) : (
            <button
              className="w-full sm:w-[300px] h-14 sm:h-16 border-2 drop-shadow-[0_8px_8px_rgba(0,0,0,0.3)] border-emerald-900 text-emerald-900 font-bold text-xl sm:text-2xl rounded-xl bg-white mr-14 hover:bg-gray-300 mb-8 sm:mb-0"
              onClick={handleSignup}
            >
              Sign up for free
            </button>
          )}

          <button
            className="w-full sm:w-[300px] h-14 sm:h-16 border-2 drop-shadow-[0_8px_8px_rgba(0,0,0,0.3)] border-emerald-900 text-emerald-900 font-bold text-xl sm:text-2xl rounded-xl bg-amber-400 hover:bg-amber-500"
            onClick={handleStart}
          >
            Get started
          </button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
