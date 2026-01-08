import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUi from "../components/RateLimitedUi";
import toast from "react-hot-toast";
import ProjectCard from "../components/ProjectCard";
import api from "../lib/axios";
import NotesNotFound from "../components/ProjectsNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/notes");
        setProjects(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching projects");
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load projects");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUi />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading Projects...
          </div>
        )}

        {!loading && projects.length === 0 && !isRateLimited && (
          <NotesNotFound />
        )}

        {projects.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                setProjects={setProjects}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
