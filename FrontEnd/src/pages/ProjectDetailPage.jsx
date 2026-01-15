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
        toast.error("Failed to fetch project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    if (!isAdmin()) return;
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Project deleted");
      navigate("/");
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
      navigate("/");
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
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-error">Project not found</p>
      </div>
    );
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
              {/* Title */}
              <p className="text-xs uppercase tracking-wide text-base-content/50 mb-2">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
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
                <h1 className="text-3xl font-bold text-base-content mb-4">
                  {project.title}
                </h1>
              ) : (
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text">Project Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={project.title || ""}
                    onChange={(e) =>
                      setProject({ ...project, title: e.target.value })
                    }
                  />
                </div>
              )}

              {/* Description */}
              {!isAdmin() ? (
                <div className="prose max-w-none text-base-content">
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
              <div className="divider my-6"></div>

              {/* Tech Stack */}
              {isAdmin() && (
                <div className="form-control mb-4">
                  <label className="cursor-pointer flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={project.featured || false}
                      onChange={(e) =>
                        setProject({ ...project, featured: e.target.checked })
                      }
                    />
                    <span className="label-text">Featured Project</span>
                  </label>
                </div>
              )}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">
                    Tech Stack (comma separated)
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered disabled:bg-base-200"
                  disabled={!isAdmin()}
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                />
              </div>

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

              {/* Save */}
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
