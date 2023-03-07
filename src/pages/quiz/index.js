import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import Header from "components/Header";
import Footer from "components/Footer";
import Timer from "components/Timer";
// import Modal from "components/ModalResult";
import dataAction from "src/redux/actions/data";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

function Quiz() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;
  const data = useSelector((state) => state.data.data);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [correct, setCorect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(1);

  // const handlePagination = (pageIndex) => {
  //   let p = pageIndex >= 1 ? pageIndex : 1;
  //   router.replace(`?page=${p}&limit=${limit}`);
  // };

  const handleAnswer = (e, idx, question) => {
    const answer = { id: idx, question: question, answer: e.target.value };

    setSelect([...select, answer]);
  };
  // console.log(select);

  const handleResult = async () => {
    setOpen(!open);

    let score = 0;
    let correct_answer = 0;
    let incorrect_answer = 0;
    data.map((item, idx) => {
      const answer = select[idx];
      console.log(select[idx]);
      if (answer) {
        if (item.correct_answer === answer.answer) {
          score += 10;
          correct_answer += 1;
        } else {
          incorrect_answer += 1;
        }
      }
    });
    
    setCorect(correct_answer)
    setIncorrect(incorrect_answer)
    setTotalScore(score)
  };
  console.log(select);

  useEffect(() => {
    // if (query.page) {
    //   let p = Number(query.page) >= 1 ? query.page : 1;
    //   setPage(Number(p));
    // }
    // console.log(query);

    dispatch(dataAction.dataThunk());
  }, [query, dispatch]);

  return (
    <div className="max-w-[1440px] m-auto flex flex-col">
      <Layout title="Quiz"></Layout>
      <Header></Header>
      <section className="flex bg-gray-100 p-4 sm:p-20">
        <div className="flex flex-col w-full p-4 sm:p-14 border-2 rounded-lg bg-white">
          <div className="flex flex-col flex-1 items-center justify-between mb-2">
            <form className="flex flex-col w-full">
              {data.map((item, idx) => (
                <fieldset className="flex flex-1 flex-col" key={idx}>
                  <legend className="text-lg font-primary text-emerald-900 dark:text-white cursor-pointer mb-4">
                    {item.question}
                  </legend>
                  <div className="mb-4 cursor-pointer">
                    <input
                      // id="true"
                      className="peer/true mr-4"
                      type="radio"
                      name={idx}
                      value="True"
                      onChange={(e) => handleAnswer(e, idx, item.question)}
                    />
                    <label
                      htmlFor="true"
                      className="peer-checked/true:text-sky-500 cursor-pointer"
                    >
                      True
                    </label>
                  </div>
                  <div className="cursor-pointer mb-10">
                    <input
                      // id="false"
                      className="peer/false mr-4"
                      type="radio"
                      name={idx}
                      value="False"
                      onChange={(e) => handleAnswer(e, idx, item.question)}
                    />
                    <label
                      htmlFor="false"
                      className="peer-checked/false:text-sky-500 cursor-pointer"
                    >
                      False
                    </label>
                  </div>

                  {/* <div className="hidden peer-checked/true:block">
                    Drafts are only visible to administrators.
                  </div>
                  <div className="hidden peer-checked/false:block">
                    Your post will be publicly visible on your site.
                  </div> */}
                </fieldset>
              ))}
            </form>
            {/* <div className="flex-none">
              <div className="flex">
                <button
                  className="w-10 h-10 cursor-pointer active:bg-slate-400 text-center rounded-full border-2"
                  aria-label="prev"
                  onClick={() => handlePagination(page - 1)}
                >
                  <i className="fa-solid fa-chevron-left text-xl"></i>
                </button>
                <span className="mx-10">{page}</span>
                <button
                  className="w-10 h-10 cursor-pointer active:bg-slate-400 text-center rounded-full border-2"
                  aria-label="next"
                  onClick={() => handlePagination(page + 1)}
                >
                  <i className="fa-solid fa-chevron-right text-xl"></i>
                </button>
              </div>
            </div> */}
          </div>
          <div className="flex-none text-lg mt-2">
            <div className="flex items-center">
              <p className="mr-4">Timer : </p>
              <Timer></Timer>
            </div>
            <div className="text-right">
              <button
                className="w-full sm:w-40 h-10 rounded-lg bg-emerald-700 font-primary font-semibold text-white hover:bg-emerald-900 mt-4"
                onClick={handleResult}
              >
                Result
              </button>
              {open ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-6xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Quiz Result
                          </h3>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          <p className="my-4 text-black text-lg leading-relaxed text-left">
                            Correct : {correct}
                          </p>
                          <p className="my-4 text-black text-lg leading-relaxed text-left">
                            Inorrect : {incorrect}
                          </p>
                          <p className="my-4 text-black font-bold text-xl leading-relaxed text-left">
                            Point : {totalScore}
                          </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-evenly p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => {
                              setOpen(!setOpen);
                              router.push("/");
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </div>
          </div>
        </div>
        {/* <Modal show={show} open={open} setOpen={setOpen} /> */}
      </section>
      <Footer></Footer>
    </div>
  );
}

export default Quiz;
