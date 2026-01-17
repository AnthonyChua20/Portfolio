import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-semibold mb-4">
        Something went wrong
      </h1>
      <p className="opacity-80 mb-6">
        An unexpected error occurred. Please try again later.
      </p>

      <Link to="/" className="underline">
        Return to home
      </Link>
    </div>
  );
};

export default ErrorPage;
