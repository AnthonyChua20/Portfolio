import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="opacity-80 mb-6">
        The page you’re looking for doesn’t exist.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 underline"
      >
        <ArrowLeftIcon size={18} />
        Back to home
      </Link>
    </div>
  );
};

export default NotFoundPage;
