import React from "react";

const Fotter = () => {
  return (
    <footer className="bg-white shadow-sm bg-zinc-900 ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://Legion Gears.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Legion Gears
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 text-white sm:mx-autolg:my-8" />
        <span className="block text-sm text-white sm:text-center">
          © 2023{" "}
          <a href="https://Legion Gears.com/" className="hover:underline">
            Legion Gears™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Fotter;
