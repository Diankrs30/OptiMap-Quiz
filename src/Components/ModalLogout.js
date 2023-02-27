import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authAction from "src/redux/actions/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "components/ButtonLoading";

export default function Modal(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const token = useSelector((state) => state.auth.userData.token);

  const logoutHandler = () => {
    const logoutSuccess = () => {
      toast.success("Logout success!");
      router.push("/auth/login");
    };

    dispatch(authAction.logoutThunk(token, logoutSuccess));
  };

  return (
    <>
      {props.open ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Logout</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Are you sure want to logout?
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-evenly p-6 border-t border-solid border-slate-200 rounded-b">
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <button
                      className="w-40 h-10 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={logoutHandler}
                    >
                      Yes, I&#39;m sure
                    </button>
                  )}
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setOpen(!props)}
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
    </>
  );
}
