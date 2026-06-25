import React from "react";

// Institute-style template tailored for structured academic resumes.
const NitTrichyTemplate = ({ data }) => {
  const infoItems = [
    data.personal_info?.phone,
    data.personal_info?.email
      ? { label: data.personal_info.email, href: `mailto:${data.personal_info.email}` }
      : null,
    data.personal_info?.location,
    data.personal_info?.linkedin
      ? { label: "LinkedIn", href: data.personal_info.linkedin }
      : null,
    data.personal_info?.github
      ? { label: "GitHub", href: data.personal_info.github }
      : null,
    data.personal_info?.portfolio
      ? { label: "Portfolio", href: data.personal_info.portfolio }
      : null,
  ].filter(Boolean);

  return (
    <div 
      className="max-w-4xl mx-auto bg-white text-black text-[12px] leading-tight" 
      style={{ 
        fontFamily: 'Times New Roman, serif',
        padding: '0.35in 0.45in',
        minHeight: '100vh'
      }}
    >

      {/* HEADER */}
      <div className="text-center mb-1">
        <h1 className="text-lg font-bold tracking-tight">
          {data.personal_info?.fullName || "Your Name"}
        </h1>
        <div className="mt-0.5 flex flex-wrap justify-center items-center text-[11px] gap-0.5">
          {infoItems.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="text-gray-700">|</span>}
              {typeof item === "string" ? (
                <span>{item}</span>
              ) : (
                <a href={item.href} target="_blank" rel="noreferrer" className="underline hover:text-blue-700">
                  {item.label}
                </a>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* EDUCATION */}
      {data.education?.filter(e => e.institute || e.degree).length > 0 && (
        <>
          <SectionHeading title="Education" />
          {data.education.filter(e => e.institute || e.degree).map((edu, index) => (
            <div key={index} className="mb-1.5">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-[12px]">{edu.institute}</h3>
                <span className="text-[11px] ml-2">{edu.startYear} - {edu.endYear}</span>
              </div>
              <div className="flex justify-between items-baseline italic text-[11px] text-gray-800">
                <span>{edu.degree}</span>
                {edu.cgpa && <span>CGPA: {edu.cgpa}</span>}
              </div>
              {edu.description?.filter(Boolean).length > 0 && (
                <ul className="list-disc ml-4 mt-0.5 text-[11px]">
                  {edu.description.filter(Boolean).map((point, i) => (
                    <li key={i} className="mb-0.5">{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {/* ACHIEVEMENTS */}
      {data.achievements?.filter(a => a.title).length > 0 && (
        <>
          <SectionHeading title="Achievements" />
          <ul className="list-disc ml-4 mb-1.5">
            {data.achievements.filter(a => a.title).map((item, index) => (
              <li key={index} className="mb-0.5 text-[11px]">
                <strong>{item.title}</strong>
                {item.description && ` - ${item.description}`}
                {item.link && (
                  <a href={item.link} target="_blank" rel="noreferrer" className="ml-1 underline text-[11px]">
                    Profile
                  </a>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* EXPERIENCE */}
      {data.experience?.filter(e => e.company || e.role).length > 0 && (
        <>
          <SectionHeading title="Experience" />
          {data.experience.filter(e => e.company || e.role).map((exp, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-[12px]">
                    {exp.role}
                    {exp.company && <span className="font-normal"> | {exp.company}</span>}
                    {exp.link && (
                      <a href={exp.link} target="_blank" rel="noreferrer" className="ml-1 underline font-normal text-[11px]">
                        Certificate
                      </a>
                    )}
                  </h3>
                  {exp.location && <p className="italic text-[11px] text-gray-800">{exp.location}</p>}
                </div>
                <span className="text-[11px] ml-2 flex-shrink-0">{exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}</span>
              </div>
              <ul className="list-disc ml-4 mt-0.5 text-[11px]">
                {(Array.isArray(exp.description) ? exp.description : [exp.description])
                  .filter(Boolean).map((point, i) => <li key={i} className="mb-0.5">{point}</li>)}
              </ul>
            </div>
          ))}
        </>
      )}

      {/* PROJECTS */}
      {data.projects?.filter(p => p.title).length > 0 && (
        <>
          <SectionHeading title="Projects" />
          {data.projects.filter(p => p.title).map((project, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-[12px]">
                  {project.title}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="ml-1 underline font-bold text-[11px]">
                      Github
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="ml-1 underline font-normal text-[11px]">
                      | Live
                    </a>
                  )}
                  {project.techStack && (
                    <span className="font-normal ml-1 text-[11px] text-gray-800">
                      | {Array.isArray(project.techStack) ? project.techStack.join(", ") : project.techStack}
                    </span>
                  )}
                </h3>
                {project.date && <span className="text-[11px] ml-2 flex-shrink-0">{project.date}</span>}
              </div>
              <ul className="list-disc ml-4 mt-0.5 text-[11px]">
                {(Array.isArray(project.description) ? project.description : [project.description])
                  .filter(Boolean).map((point, i) => <li key={i} className="mb-0.5">{point}</li>)}
              </ul>
            </div>
          ))}
        </>
      )}

      {/* TECHNICAL SKILLS */}
      {data.skills && (
        <>
          <SectionHeading title="Technical Skills" />
          <div className="space-y-0.5 mb-1.5 text-[11px]">
            {data.skills?.languages?.length > 0 && <p><strong>Languages:</strong> {data.skills.languages.join(", ")}</p>}
            {data.skills?.frameworks?.length > 0 && <p><strong>Frameworks & Libraries:</strong> {data.skills.frameworks.join(", ")}</p>}
            {data.skills?.databases?.length > 0 && <p><strong>Databases:</strong> {data.skills.databases.join(", ")}</p>}
            {data.skills?.tools?.length > 0 && <p><strong>Tools:</strong> {data.skills.tools.join(", ")}</p>}
            {data.skills?.coreSubjects?.length > 0 && <p><strong>Core Areas:</strong> {data.skills.coreSubjects.join(", ")}</p>}
          </div>
        </>
      )}

      {/* POSITIONS OF RESPONSIBILITY */}
      {data.positionsOfResponsibility?.filter(p => p.title).length > 0 && (
        <>
          <SectionHeading title="Positions Of Responsibility" />
          <ul className="list-disc ml-4 mb-1.5 text-[11px]">
            {data.positionsOfResponsibility.filter(p => p.title).map((item, index) => (
              <li key={index} className="mb-0.5">
                <strong>{item.title}</strong>
                {item.organization && `, ${item.organization}`}
                {Array.isArray(item.description) && item.description.filter(Boolean).length > 0 && (
                  <span> – {item.description.filter(Boolean).join("; ")}</span>
                )}
                {typeof item.description === 'string' && item.description && (
                  <span> – {item.description}</span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* CERTIFICATIONS */}
      {data.certifications?.filter(c => c.title).length > 0 && (
        <>
          <SectionHeading title="Certifications" />
          <ul className="list-disc ml-4 mb-1.5 text-[11px]">
            {data.certifications.filter(c => c.title).map((cert, index) => (
              <li key={index} className="mb-0.5">
                <strong>{cert.title}</strong>
                {cert.issuer && ` - ${cert.issuer}`}
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noreferrer" className="ml-1 underline text-[11px]">
                    View
                  </a>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* EXTRA CURRICULAR */}
      {data.extracurricularActivities?.filter(e => e.activity).length > 0 && (
        <>
          <SectionHeading title="Extra Curricular Activities" />
          <ul className="list-disc ml-4 mb-1.5 text-[11px]">
            {data.extracurricularActivities.filter(e => e.activity).map((item, index) => (
              <li key={index} className="mb-0.5">
                <strong>{item.activity}</strong>
                {item.description && ` - ${item.description}`}
              </li>
            ))}
          </ul>
        </>
      )}

    </div>
  );
};

const SectionHeading = ({ title }) => (
  <div className="mb-1 mt-1.5">
    <h2 className="font-bold text-[12px] tracking-wide uppercase">{title}</h2>
    <hr className="border-black border-t mt-0.5" />
  </div>
);

export default NitTrichyTemplate;
