import React from "react";

const ExperienceSection = () => {
  const experiences = [
    {
      title: "Third Party Threat Intern",
      org: "PwC Singapore",
      date: "August 2022 - Feb 2023",
      desc: "Specialising in Cyber Security & Privacy. Responsible for assessing third-party vendor risks, identifying potential supply chain vulnerabilities, and ensuring alignment with security governance frameworks.",
      tags: [
        "TPRM",
        "Vulnerability Assessment",
        "Cyber Governance",
        "Risk Mitigation",
      ],
    },
    {
      title: "Diploma in Information Technology",
      org: "Singapore Polytechnic",
      date: "2021 - 2023",
      desc: "Core focus on Software Engineering and Backend Development. Developed a strong foundation in secure coding, database management (NoSQL/SQL), and full-stack architecture.",
      tags: [
        "MERN/Pern Stack",
        "Fullstack Development",
        "Data Structures",
        "Software Design",
        "Agile Framework",
        "Database Engineering",
        "Enterprise System Security",
      ],
    },
  ];

  return (
    <section className="mt-12">
      <div className="rounded-2xl border border-base-300 bg-base-100/40">
        <div className="p-6 md:p-8">
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <h2
                id="experience"
                className="text-2xl font-bold text-base-content"
              >
                Professional & Academic Experience
              </h2>
              <p className="text-sm opacity-70 mt-1">
                My journey through industry and formal technical education.
              </p>
            </div>
          </div>

          <div className="divider divider-neutral my-2"></div>

          <div className="space-y-8 mt-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="group relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-base-300 hover:before:bg-primary transition-colors"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-base-300 group-hover:bg-primary transition-colors border-2 border-base-100"></div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <div>
                    <h3 className="text-lg font-bold text-primary tracking-tight">
                      {exp.title}
                    </h3>
                    <p className="font-semibold text-base-content/90">
                      {exp.org}
                    </p>
                  </div>
                  <span className="text-[11px] md:text-xs uppercase tracking-[0.15em] opacity-50 font-bold sm:text-right">
                    {exp.date}
                  </span>
                </div>

                <p className="mt-3 text-sm opacity-80 leading-relaxed max-w-3xl">
                  {exp.desc}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
