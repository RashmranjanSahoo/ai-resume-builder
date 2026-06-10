import React from "react";

const NitTrichyTemplate = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white text-black p-8 text-sm leading-relaxed">

      {/* HEADER */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold uppercase">
          {data.personal_info?.fullName || "Your Name"}
        </h1>

        <div className="mt-2 flex flex-wrap justify-center gap-3 text-[13px]">
          {data.personal_info?.phone && (
            <span>{data.personal_info.phone}</span>
          )}

          {data.personal_info?.email && (
            <span>{data.personal_info.email}</span>
          )}

          {data.personal_info?.linkedin && (
            <span>{data.personal_info.linkedin}</span>
          )}

          {data.personal_info?.github && (
            <span>{data.personal_info.github}</span>
          )}

          {data.personal_info?.portfolio && (
            <span>{data.personal_info.portfolio}</span>
          )}
        </div>
      </div>

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <>
          <SectionHeading title="Education" />

          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">

              <div className="flex justify-between">
                <h3 className="font-semibold">
                  {edu.institution}
                </h3>

                <span>
                  {edu.startYear} - {edu.endYear}
                </span>
              </div>

              <div className="flex justify-between italic">
                <span>
                  {edu.degree}
                </span>

                {edu.cgpa && (
                  <span>
                    CGPA: {edu.cgpa}
                  </span>
                )}
              </div>

            </div>
          ))}
        </>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <>
          <SectionHeading title="Experience" />

          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">

              <div className="flex justify-between">
                <h3 className="font-semibold">
                  {exp.position}
                </h3>

                <span>
                  {exp.start_date} - {exp.end_date || "Present"}
                </span>
              </div>

              <div className="flex justify-between">
                <p className="italic">
                  {exp.company}
                </p>

                {exp.location && (
                  <p>{exp.location}</p>
                )}
              </div>

              <ul className="list-disc ml-5 mt-1">
                {exp.description
                  ?.split("\n")
                  .filter(Boolean)
                  .map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
              </ul>

            </div>
          ))}
        </>
      )}

      {/* PROJECTS */}
      {data.projects?.length > 0 && (
        <>
          <SectionHeading title="Projects" />

          {data.projects.map((project, index) => (
            <div key={index} className="mb-4">

              <div className="flex justify-between">
                <h3 className="font-semibold">
                  {project.name}
                </h3>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    Link
                  </a>
                )}
              </div>

              {project.techStack && (
                <p className="italic">
                  {project.techStack}
                </p>
              )}

              <ul className="list-disc ml-5 mt-1">
                {project.description
                  ?.split("\n")
                  .filter(Boolean)
                  .map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
              </ul>

            </div>
          ))}
        </>
      )}

      {/* TECHNICAL SKILLS */}
      <SectionHeading title="Technical Skills" />

      <div className="space-y-1 mb-4">

        {data.skills?.languages?.length > 0 && (
          <p>
            <strong>Languages:</strong>{" "}
            {data.skills.languages.join(", ")}
          </p>
        )}

        {data.skills?.frameworks?.length > 0 && (
          <p>
            <strong>Frameworks:</strong>{" "}
            {data.skills.frameworks.join(", ")}
          </p>
        )}

        {data.skills?.databases?.length > 0 && (
          <p>
            <strong>Databases:</strong>{" "}
            {data.skills.databases.join(", ")}
          </p>
        )}

        {data.skills?.tools?.length > 0 && (
          <p>
            <strong>Tools:</strong>{" "}
            {data.skills.tools.join(", ")}
          </p>
        )}

        {data.skills?.coreSubjects?.length > 0 && (
          <p>
            <strong>Core Subjects:</strong>{" "}
            {data.skills.coreSubjects.join(", ")}
          </p>
        )}

      </div>

      {/* ACHIEVEMENTS */}
      {data.achievements?.length > 0 && (
        <>
          <SectionHeading title="Achievements" />

          <ul className="list-disc ml-5 mb-4">
            {data.achievements.map((item, index) => (
              <li key={index}>
                <strong>{item.title}</strong>
                {item.description && ` - ${item.description}`}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* POSITIONS OF RESPONSIBILITY */}
      {data.positionsOfResponsibility?.length > 0 && (
        <>
          <SectionHeading title="Positions Of Responsibility" />

          <ul className="list-disc ml-5 mb-4">
            {data.positionsOfResponsibility.map((item, index) => (
              <li key={index}>
                <strong>{item.position}</strong>
                {" - "}
                {item.organization}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* EXTRA CURRICULAR */}
      {data.extracurricularActivities?.length > 0 && (
        <>
          <SectionHeading title="Extra Curricular Activities" />

          <ul className="list-disc ml-5 mb-4">
            {data.extracurricularActivities.map((item, index) => (
              <li key={index}>
                {item.title || item}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* CERTIFICATIONS */}
      {data.certifications?.length > 0 && (
        <>
          <SectionHeading title="Certifications" />

          <ul className="list-disc ml-5">
            {data.certifications.map((cert, index) => (
              <li key={index}>
                {cert.name || cert}
              </li>
            ))}
          </ul>
        </>
      )}

    </div>
  );
};

const SectionHeading = ({ title }) => (
  <div className="mb-3 mt-5">
    <h2 className="uppercase font-bold text-[15px]">
      {title}
    </h2>
    <hr className="border-black mt-1" />
  </div>
);

export default NitTrichyTemplate;