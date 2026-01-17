import { Trash2Icon, ArrowUpRightIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { isAdmin } from "../lib/admin.js";

const ProjectCard = ({ project, setProjects }) => {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success("Project deleted successfully");
    } catch {
      toast.error("Failed to delete the project");
    }
  };

  const handleCardClick = () => navigate(`/project/${project._id}`);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleCardClick();
      }}
      className="
        group cursor-pointer overflow-hidden rounded-2xl
        border border-base-300 bg-base-100
        shadow-sm transition-all duration-200 ease-out
        hover:-translate-y-0.5 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-primary/40
      "
    >
      {/* Accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary to-primary/60" />

      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {project.featured && (
              <span className="badge badge-primary badge-sm mb-2">
                ★ Featured
              </span>
            )}

            <h3 className="text-lg font-semibold leading-snug tracking-tight">
              {project.title}
            </h3>
          </div>

          <ArrowUpRightIcon className="size-4 opacity-40 group-hover:opacity-80 transition-opacity" />
        </div>

        {/* Excerpt */}
        <p className="mt-3 text-sm leading-relaxed opacity-75 line-clamp-3">
          {project.excerpt || project.content}
        </p>

        {/* Tech stack */}
        {!!project.techStack?.length && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="badge badge-outline badge-sm opacity-70"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="badge badge-ghost badge-sm opacity-60">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-base-300/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-xs btn-primary"
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

          <div className="flex items-center gap-2">
            <span className="text-xs opacity-60">
              {formatDate(new Date(project.createdAt))}
            </span>

            {isAdmin() && (
              <button
                className="btn btn-ghost btn-xs text-error opacity-70 hover:opacity-100"
                onClick={(e) => handleDelete(e, project._id)}
                title="Delete project"
              >
                <Trash2Icon className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
