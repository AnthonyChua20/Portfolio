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
    <div className="min-h-screen bg-base-200">
      <Navbar />

      {isAdmin() && (
        <div className="badge badge-success absolute top-4 right-4 z-50">
          Admin Mode
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 pb-16">
        {/* HERO SECTION */}
        <section className="mt-6">
          <div className="rounded-2xl border border-base-300 bg-base-100 shadow-sm">
            <div className="p-6 md:p-10">
              <p className="text-xs md:text-sm uppercase tracking-widest opacity-70">
                Portfolio • Cybersecurity Focus
              </p>

              <h1 className="mt-2 text-4xl md:text-5xl font-bold leading-[1.05]">
                <span className="opacity-90">Anthony Chua</span>
                <span className="opacity-50"> — </span>
                <span className="text-primary">Cybersecurity</span>
                <span className="opacity-70"> &amp; Backend Projects</span>
              </h1>

              <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed opacity-80">
                Diploma in Information Technology (Singapore Polytechnic).
                Interested in secure software practices and risk-aware
                engineering. Internship exposure: third-party vendor risk at
                PwC.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="badge badge-primary badge-outline">
                  Cybersecurity
                </span>
                <span className="badge badge-outline">Backend</span>
                <span className="badge badge-outline">Node.js</span>
                <span className="badge badge-outline">Express</span>
                <span className="badge badge-outline">MongoDB</span>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#projects" className="btn btn-sm btn-primary">
                  View projects
                </a>
                <a
                  href="https://github.com/AnthonyChua20"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* STATUS */}
        {isRateLimited && (
          <div className="mt-6">
            <RateLimitedUi />
          </div>
        )}

        {loading && !isRateLimited && (
          <div className="mt-8">
            <div className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body">
                <p className="text-primary font-medium">Loading projects...</p>
                <p className="opacity-70 text-sm">
                  Fetching the latest list of projects.
                </p>
              </div>
            </div>
          </div>
        )}

        {!loading && projects.length === 0 && !isRateLimited && (
          <div className="mt-8">
            <NotesNotFound />
          </div>
        )}

       {/* PROJECTS SECTION */}
{!loading && projects.length > 0 && !isRateLimited && (
  <section className="mt-12">
    <div className="rounded-2xl border border-base-300 bg-base-100/40">
      <div className="p-6 md:p-8">
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <h2
              id="projects"
              className="text-2xl font-bold text-base-content"
            >
              Projects
            </h2>
            <p className="text-sm opacity-70 mt-1">
              Featured projects appear first.
            </p>
          </div>

          <div className="hidden md:block text-sm opacity-60">
            Click a project to view details
          </div>
        </div>

        <div className="divider divider-neutral my-2"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 fade-in">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              setProjects={setProjects}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
)}

        {/* CERTIFICATIONS */}
        {!isRateLimited && (
          <section className="mt-20">
            <div className="rounded-2xl border border-base-300 bg-base-100/50">
              <div className="p-6 md:p-8">
                <div className="flex items-end justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">Certifications</h2>
                    <p className="text-sm opacity-70 mt-1">
                      Selected coursework and certifications relevant to
                      security.
                    </p>
                  </div>
                </div>

                <div className="divider my-0" />

                <div className="mt-6">
                  <BadgeSection />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default HomePage;
