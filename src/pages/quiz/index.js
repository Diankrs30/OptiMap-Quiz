import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import Header from "components/Header";
import Footer from "components/Footer";
import Timer from "components/Timer";
import Modal from "components/ModalResult";
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
  const [select, setSelect] = useState('False');
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(1);

  // const handlePagination = (pageIndex) => {
  //   let p = pageIndex >= 1 ? pageIndex : 1;
  //   router.replace(`?page=${p}&limit=${limit}`);
  // };

  const handleResult = async () => {
    setOpen(!open);
  };

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
      <Layout title="Quiz intro"></Layout>
      <Header></Header>
      <section className="flex bg-gray-100 p-4 sm:p-20">
        <div className="flex flex-col w-full p-4 sm:p-14 border-2 rounded-lg bg-white">
          <div className="flex flex-col flex-1 items-center justify-between mb-2">
            <form className="flex flex-col w-full" >
              {data.map((item, idx) => (
                <fieldset
                  className="flex flex-1 flex-col"
                  key={idx} 
                >
                  <legend className="text-lg font-primary text-emerald-900 dark:text-white cursor-pointer mb-4">
                    {item.question}
                  </legend>
                  <div className="mb-4 cursor-pointer">
                    <input
                      id="True"
                      className="peer/True mr-4"
                      type="radio"
                      name="status"
                      onChange={e => setSelect(e.target.value)}
                    />
                    <label
                      htmlFor="True"
                      className="peer-checked/True:text-sky-500 cursor-pointer"
                    >
                      True
                    </label>
                  </div>
                  <div className="cursor-pointer mb-10">
                    <input
                      id="False"
                      className="peer/False mr-4"
                      type="radio"
                      name="status"
                      onChange={e => setSelect(e.target.value)}
                    />
                    <label
                      htmlFor="False"
                      className="peer-checked/False:text-sky-500 cursor-pointer"
                    >
                      False
                    </label>
                  </div>

                  {/* <div className="hidden peer-checked/True:block">
                    Drafts are only visible to administrators.
                  </div>
                  <div className="hidden peer-checked/False:block">
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
            </div>
          </div>
        </div>
        <Modal show={show} open={open} setOpen={setOpen} />
      </section>
      <Footer></Footer>
    </div>
  );
}

export default Quiz;
