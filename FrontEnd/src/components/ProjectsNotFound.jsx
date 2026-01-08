import { FolderPlusIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <FolderPlusIcon className="size-10 text-primary" />
      </div>

      <h3 className="text-2xl font-bold">No projects yet</h3>

      <p className="text-base-content/70">
        This is where your work will shine. Add your first project to start
        showcasing your skills and experience.
      </p>

      <Link to="/create" className="btn btn-primary">
        Add Your First Project
      </Link>
    </div>
  );
};

export default NotesNotFound;
