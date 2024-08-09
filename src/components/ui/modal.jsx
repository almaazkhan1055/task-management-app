"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function Modal({ tasks }) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleClick = (assignee) => {
    router.push(`/filteredTask?assignee=${assignee}`);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 dark:bg-gray-800"
          >
            <div>
              <h2 className="filterIwrp text-black text-center text-2xl dark:text-white">
                Assigned to
              </h2>
              <div className="mt-3 text-center sm:mt-5 ">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6"
                >
                  {[...new Set(tasks.map((task) => task.assignee))].map(
                    (assignee, index) => (
                      <div
                        key={index}
                        className="text-black text-left cursor-pointer text-xl px-2 dark:text-white "
                      >
                        <span onClick={() => handleClick(assignee)}>
                          {assignee}
                        </span>
                      </div>
                    )
                  )}
                </DialogTitle>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back to App
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
