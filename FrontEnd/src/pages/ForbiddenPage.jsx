import { Link } from "react-router";
import { ArrowLeftIcon, ShieldAlertIcon } from "lucide-react";

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <ShieldAlertIcon className="size-12 text-error" />
        </div>

        <h1 className="text-3xl font-bold mb-3">Access denied</h1>
        <p className="opacity-80 mb-6">
          You don’t have permission to view this page.
        </p>

        <Link to="/" className="inline-flex items-center gap-2 btn btn-ghost">
          <ArrowLeftIcon className="h-5 w-5" />
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;