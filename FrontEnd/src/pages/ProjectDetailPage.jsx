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
  const [allProjects, setAllProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProjectAndList = async () => {
      try {
        // Fetch selected project + list in parallel
        const [projectRes, listRes] = await Promise.all([
          api.get(`/notes/${id}`),
          api.get("/notes"),
        ]);

        const current = projectRes.data;

        // Sort list the same way as your HomePage (featured first, newest next)
        const sorted = listRes.data.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setProject(current);
        setTechStackInput(current.techStack?.join(", ") || "");
        setAllProjects(sorted);

        const idx = sorted.findIndex((p) => p._id === current._id);
        setCurrentIndex(idx);
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

    fetchProjectAndList();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!isAdmin()) return;
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Project deleted");
      navigate("/", { replace: true });
    } catch {
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
    } catch {
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
    navigate("/not-found", { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 pt-4 pb-10">
        <div className="max-w-2xl mx-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="btn btn-ghost btn-sm">
              <ArrowLeftIcon className="h-4 w-4" />
              Back
            </Link>

            {isAdmin() && (
              <button
                onClick={handleDelete}
                className="btn btn-error btn-outline btn-sm"
              >
                <Trash2Icon className="h-4 w-4" />
                Delete
              </button>
            )}
          </div>

          <div className="card bg-base-100">
            <div className="card-body p-6 md:p-8">
              {/* Title */}
              {!isAdmin() ? (
                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                  {project.title}
                </h1>
              ) : (
                <input
                  type="text"
                  className="input input-bordered mb-4 text-lg"
                  value={project.title || ""}
                  onChange={(e) =>
                    setProject({ ...project, title: e.target.value })
                  }
                />
              )}

              {/* Meta row */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
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

                {project.featured && (
                  <span className="badge badge-primary badge-outline">
                    Featured
                  </span>
                )}
              </div>

              {/* Tech stack */}
              {!!project.techStack?.length && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="badge badge-outline badge-sm opacity-80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="divider my-6" />

              {/* Content */}
              {!isAdmin() ? (
                <div className="prose prose-base md:prose-lg max-w-none">
                  <ReactMarkdown>{project.content}</ReactMarkdown>
                </div>
              ) : (
                <textarea
                  className="textarea textarea-bordered min-h-[240px] font-mono text-sm"
                  value={project.content}
                  onChange={(e) =>
                    setProject({ ...project, content: e.target.value })
                  }
                />
              )}

              {/* Security note (polish) */}
              {!isAdmin() && (
                <div className="mt-8 rounded-xl border border-base-300 bg-base-200/40 p-5">
                  <h2 className="font-semibold mb-2">
                    Security considerations
                  </h2>
                  <ul className="list-disc pl-5 space-y-1 opacity-80">
                    <li>Input treated as untrusted and handled safely</li>
                    <li>Rate limiting used to reduce abuse</li>
                    <li>No sensitive error details exposed to users</li>
                    <li>Admin-only operations are restricted (demo gate)</li>
                  </ul>
                </div>
              )}

              {/* Admin controls */}
              {isAdmin() && (
                <>
                  <div className="divider my-6" />

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

                  <input
                    type="text"
                    className="input input-bordered mb-4"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                  />

                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      disabled={saving}
                      onClick={handleSave}
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </>
              )}
              {/* Prev / Next navigation */}
              {allProjects.length > 0 && currentIndex !== -1 && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Previous */}
                  <button
                    className="group btn btn-outline justify-start h-auto py-4 text-left disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                    disabled={currentIndex <= 0}
                    onClick={() => {
                      const prev = allProjects[currentIndex - 1];
                      if (prev?._id) navigate(`/project/${prev._id}`);
                    }}
                  >
                    <div>
                      <p className="text-xs opacity-60 mb-1">
                        ← Previous project
                      </p>
                      <p className="font-medium group-hover:underline">
                        {allProjects[currentIndex - 1]?.title || "—"}
                      </p>
                    </div>
                  </button>

                  {/* Next */}
                  <button
                    className="group btn btn-outline justify-end h-auto py-4 text-right disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                    disabled={currentIndex >= allProjects.length - 1}
                    onClick={() => {
                      const next = allProjects[currentIndex + 1];
                      if (next?._id) navigate(`/project/${next._id}`);
                    }}
                  >
                    <div>
                      <p className="text-xs opacity-60 mb-1">Next project →</p>
                      <p className="font-medium group-hover:underline">
                        {allProjects[currentIndex + 1]?.title || "—"}
                      </p>
                    </div>
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
