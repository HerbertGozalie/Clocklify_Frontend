import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <main className="flex flex-col min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-base font-semibold text-white">404</p>
          <h1 className="mt-30 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-45 text-lg font-medium text-pretty text-white sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 mb-40 flex items-center justify-center gap-x-6"></div>
          <Link
            to="/timer"
            className="rounded-md  py-10 px-10 text-base font-semibold shadow-xs bg-linear-to-t from-s-light-blue to-s-lighter-blue text-white hover:opacity-90"
          >
            Back To Timer
          </Link>
        </div>
      </main>
    </>
  );
};
