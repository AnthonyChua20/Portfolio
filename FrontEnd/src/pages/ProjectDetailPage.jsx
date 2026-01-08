import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const ProjectDetailPage = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setProject(res.data);
      } catch (error) {
        toast.error("Failed to fetch project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleDelete = async () => {
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
    if (!project.title.trim() || !project.content.trim()) {
      toast.error("Please add a project title and description");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, project);
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

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to projects
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Project
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Project Title</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Notes API (MERN Stack)"
                  className="input input-bordered"
                  value={project.title || ""}
                  onChange={(e) =>
                    setProject({ ...project, title: e.target.value })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Project Description</span>
                </label>
                <textarea
                  placeholder="Describe what you built, technologies used, and what you learned"
                  className="textarea textarea-bordered h-32"
                  value={project.content || ""}
                  onChange={(e) =>
                    setProject({ ...project, content: e.target.value })
                  }
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">
                    Tech Stack (comma separated)
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={project.techStack?.join(", ") || ""}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      techStack: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Live Demo URL</span>
                </label>
                <input
                  type="url"
                  className="input input-bordered"
                  value={project.liveUrl || ""}
                  onChange={(e) =>
                    setProject({ ...project, liveUrl: e.target.value })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">GitHub Repository URL</span>
                </label>
                <input
                  type="url"
                  className="input input-bordered"
                  value={project.githubUrl || ""}
                  onChange={(e) =>
                    setProject({ ...project, githubUrl: e.target.value })
                  }
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
