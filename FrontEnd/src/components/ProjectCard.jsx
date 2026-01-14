import { Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { isAdmin } from "../lib/admin.js";

const ProjectCard = ({ project, setProjects }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // Prevent navigation behavior

    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await api.delete(`/notes/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Failed to delete the project");
    }
  };

  return (
    <Link
      to={`/project/${project._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D] hover:-translate-y-1 shadow-xl"
    >
      <div className="card-body">
        {project.featured && (
          <span className="badge badge-primary badge-sm">★ Featured</span>
        )}
        <h3 className="card-title text-base-content">{project.title}</h3>

        <p className="text-base-content/70 line-clamp-3">{project.content}</p>

        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {project.techStack?.slice(0, 3).map((tech) => (
              <span key={tech} className="badge badge-outline badge-sm">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="card-actions justify-between items-center mt-4">
          <div className="flex gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-xs btn-outline"
                onClick={(e) => e.stopPropagation()}
              >
                Live
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-xs btn-outline"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </a>
            )}
          </div>
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(project.createdAt))}
          </span>

          {isAdmin() && (
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, project._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
