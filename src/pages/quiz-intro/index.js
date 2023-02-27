import React from "react";
import Layout from "components/Layout";
import Header from "components/Header";
import Footer from "components/Footer";
import { useRouter } from "next/router";

function QuizIntro() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/quiz");
  };
  return (
    <div className="max-w-[1440px] m-auto flex flex-col">
      <Layout title="Quiz intro"></Layout>
      <Header></Header>
      <section className="h-[38rem] sm:h-[825px] flex items-center justify-center bg-gray-100 p-4 sm:p-20">
        <div className="w-full p-6 sm:p-20 border-2 rounded-lg bg-white">
          <h2 className="text-3xl font-primary text-emerald-900 font-bold dark:text-white cursor-pointer mb-6">
            Science: Computers
          </h2>
          <div className="text-lg mb-20">
            <div>
              <i className="fa-solid fa-list mr-4"></i>
              <span>10 true or false questions</span>
            </div>
            <div>
              <i className="fa-regular fa-clock mr-4"></i>
              <span>15 minutes for all questions</span>
            </div>
          </div>
          <div className="flex justify-between text-lg">
            <p>Language: English</p>
            <button
              className="w-40 h-10 rounded-lg bg-emerald-700 font-primary font-semibold text-white hover:bg-emerald-900"
              onClick={handleStart}
            >
              Start
            </button>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}

export default QuizIntro;
