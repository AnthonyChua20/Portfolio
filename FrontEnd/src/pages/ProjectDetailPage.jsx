import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { isAdmin } from "../lib/admin.js";
import ReactMarkdown from "react-markdown";

const ProjectDetailPage = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [techStackInput, setTechStackInput] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setProject(res.data);
        setTechStackInput(res.data.techStack?.join(", ") || "");
      } catch (error) {
        if (error.response?.status === 404) {
          navigate("/not-found", { replace: true });
        } else {
          navigate("/error", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!isAdmin()) return;
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Project deleted");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const handleSave = async () => {
    if (!isAdmin()) return;

    const updatedProject = {
      ...project,
      techStack: techStackInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, updatedProject);
      toast.success("Project updated successfully");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Failed to update project");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  // Safety fallback (should rarely trigger now)
  if (!project) {
    navigate("/not-found", { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to projects
            </Link>

            {isAdmin() && (
              <button
                onClick={handleDelete}
                className="btn btn-error btn-outline"
              >
                <Trash2Icon className="h-5 w-5" />
                Delete Project
              </button>
            )}
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              {/* Tech Stack */}
              <p className="text-xs uppercase tracking-wide text-base-content/50 mb-2">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack?.map((tech) => (
                  <span
                    key={tech}
                    className="badge badge-outline badge-sm text-base-content/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Title */}
              {!isAdmin() ? (
                <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
              ) : (
                <input
                  type="text"
                  className="input input-bordered mb-6"
                  value={project.title || ""}
                  onChange={(e) =>
                    setProject({ ...project, title: e.target.value })
                  }
                />
              )}

              {/* Description */}
              {!isAdmin() ? (
                <div className="prose max-w-none">
                  <ReactMarkdown>{project.content}</ReactMarkdown>
                </div>
              ) : (
                <textarea
                  className="textarea textarea-bordered min-h-[200px] font-mono text-sm"
                  value={project.content}
                  onChange={(e) =>
                    setProject({ ...project, content: e.target.value })
                  }
                />
              )}

              <div className="divider my-6" />

              {/* Admin Controls */}
              {isAdmin() && (
                <label className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={project.featured || false}
                    onChange={(e) =>
                      setProject({ ...project, featured: e.target.checked })
                    }
                  />
                  Featured Project
                </label>
              )}

              <input
                type="text"
                className="input input-bordered mb-4"
                disabled={!isAdmin()}
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
              />

              <div className="flex gap-3 mb-6">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline"
                  >
                    GitHub
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary"
                  >
                    Live Demo
                  </a>
                )}
              </div>

              {isAdmin() && (
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    disabled={saving}
                    onClick={handleSave}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
