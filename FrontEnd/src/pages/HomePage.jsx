import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUi from "../components/RateLimitedUi";
import toast from "react-hot-toast";
import ProjectCard from "../components/ProjectCard";
import api from "../lib/axios";
import NotesNotFound from "../components/ProjectsNotFound";
import { isAdmin } from "../lib/admin";
import BadgeSection from "../components/BadgeSection";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/notes");

        const sorted = res.data.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setProjects(sorted);
        setIsRateLimited(false);
      } catch (error) {
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

      {isAdmin() && (
        <div className="badge badge-success absolute top-4 right-4 z-50">
          Admin Mode
        </div>
      )}

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

        {/* Projects */}
        {projects.length > 0 && !isRateLimited && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-base-content">
              Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  setProjects={setProjects}
                />
              ))}
            </div>
          </>
        )}

        {/* Certifications */}
        <section className="mt-24 border-t border-base-300 pt-12">
          {!isRateLimited && <BadgeSection />}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
