import React from "react";

const NitTrichyTemplate = ({ data }) => {

  const asArray = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === "string") return value.split("\n").filter(Boolean);
    return [];
  };

  const asText = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return JSON.stringify(value);
  };

  // Format a date string/value to "Mon-YYYY"
  const formatMonthYear = (value) => {
    if (!value) return "";
    const str = value.toString();

    // YYYY-MM or YYYY-MM-DD
    const ymMatch = str.match(/^(\d{4})-(\d{2})/);
    if (ymMatch) {
      const date = new Date(Number(ymMatch[1]), Number(ymMatch[2]) - 1);
      const month = date.toLocaleDateString("en-US", { month: "short" });
      return `${month}-${ymMatch[1]}`;
    }

    // Already "Mon YYYY" or "Mon-YYYY" or similar text - try Date.parse
    const parsed = Date.parse(str);
    if (!isNaN(parsed)) {
      const date = new Date(parsed);
      const month = date.toLocaleDateString("en-US", { month: "short" });
      return `${month}-${date.getFullYear()}`;
    }

    // Just a year
    const yearMatch = str.match(/^\d{4}$/);
    if (yearMatch) return str;

    return str;
  };

  const formatRange = (start, end, isCurrent) => {
    const startStr = formatMonthYear(start);
    const endStr = isCurrent ? "Present" : formatMonthYear(end);
    if (!startStr && !endStr) return "";
    return `${startStr} - ${endStr}`;
  };

  return (
    <div
      className="max-w-3xl mx-auto bg-white text-black px-10 py-8 text-[13px] leading-snug"
      style={{ fontFamily: '"Times New Roman"' }}
    >
      {/* HEADER */}
      <div className="text-center mb-3">
        <h1 className="text-3xl font-bold">
          {data.personal_info?.fullName || "Your Name"}
        </h1>

        <div className="mt-1 flex flex-wrap justify-center gap-x-2 gap-y-0.5 text-[12px]">
          {data.personal_info?.phone && (
            <span>{data.personal_info.phone}</span>
          )}
          {data.personal_info?.email && (
            <>
              <span>|</span>
              <span>{data.personal_info.email}</span>
            </>
          )}
          {data.personal_info?.location && (
            <>
              <span>|</span>
              <span>{data.personal_info.location}</span>
            </>
          )}
          {data.personal_info?.linkedin && (
            <>
              <span>|</span>
              <a
                href={data.personal_info.linkedin}
                target="_blank"
                rel="noreferrer"
                className="underline text-black"
              >
                LinkedIn
              </a>
            </>
          )}

          {data.personal_info?.github && (
            <>
              <span>|</span>
              <a
                href={data.personal_info.github}
                target="_blank"
                rel="noreferrer"
                className="underline  text-black"
              >
                GitHub
              </a>
            </>
          )}

          {data.personal_info?.portfolio && (
            <>
              <span>|</span>
              <a
                href={data.personal_info.portfolio}
                target="_blank"
                rel="noreferrer"
                className="underline  text-black"
              >
                Portfolio
              </a>
            </>
          )}
        </div>
      </div>

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <>
          <SectionHeading title="Education" />

          {data.education.map((edu, index) => (
            <div key={index} className="mb-2">

              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-[18px]">
                  {edu.institution || edu.institute}
                </h3>
                <span className="text-[14px]">
                  {formatRange(
                    edu.startYear,
                    edu.endYear,
                    edu.is_current || edu.currentlyStudying
                  )}
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="italic text-[14px]">
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                </span>
                {(edu.cgpa || edu.gpa) && (
                  <span className="text-[12px]">CGPA: {edu.cgpa || edu.gpa}</span>
                )}
              </div>

              {edu.description?.length > 0 && (
                <ul className="list-disc ml-6 mt-1">
                  {edu.description.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              )}

            </div>
          ))}
        </>
      )}


      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <>
          <SectionHeading title="Experience" />

          {data.experience.map((exp, index) => (
            <div key={index} className="mb-3">

              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-[13px]">
                  {exp.position || exp.role}
                  {exp.company && (
                    <span className="font-normal"> | {exp.company}</span>
                  )}
                  {exp.certificate && (
                    <>
                      {" | "}
                      <a href={exp.certificate} target="_blank" rel="noreferrer" className="underline font-normal">
                        Certificate
                      </a>
                    </>
                  )}
                </h3>
                <span className="text-[12px] whitespace-nowrap ml-2">
                  {formatRange(
                    exp.start_date || exp.startDate,
                    exp.end_date || exp.endDate,
                    exp.is_current
                  )}
                </span>
              </div>

              {exp.location && (
                <p className="italic text-[12px]">{exp.location}</p>
              )}

              <ul className="list-disc ml-5 mt-0.5 space-y-0.5">
                {asArray(exp.description).map((point, i) => (
                  <li key={i}>{asText(point)}</li>
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
            <div key={index} className="mb-3">

              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-[13px]">
                  {project.name || project.title}
                  {project.link && (
                    <>
                      {" – "}
                      <a href={project.link} target="_blank" rel="noreferrer" className="underline font-normal">
                        Github Link
                      </a>
                    </>
                  )}
                  {project.techStack && (
                    <span className="font-normal italic text-[12px]">
                      {" | "}
                      {Array.isArray(project.techStack)
                        ? project.techStack.join(", ")
                        : project.techStack}
                    </span>
                  )}
                </h3>
                {project.date && (
                  <span className="text-[12px] whitespace-nowrap ml-2">
                    {formatMonthYear(project.date)}
                  </span>
                )}
              </div>

              <ul className="list-disc ml-5 mt-0.5 space-y-0.5">
                {asArray(project.description).map((point, i) => (
                  <li key={i}>{asText(point)}</li>
                ))}
              </ul>

            </div>
          ))}
        </>
      )}

      {/* TECHNICAL SKILLS */}
      {data.skills && (
        <>
          <SectionHeading title="Technical Skills" />
          <div className="mb-3 space-y-0.5">
            {data.skills.languages?.length > 0 && (
              <p><strong>Languages:</strong> {data.skills.languages.join(", ")}</p>
            )}
            {data.skills.frameworks?.length > 0 && (
              <p><strong>Frameworks &amp; Libraries:</strong> {data.skills.frameworks.join(", ")}</p>
            )}
            {data.skills.databases?.length > 0 && (
              <p><strong>Databases &amp; Data Platforms:</strong> {data.skills.databases.join(", ")}</p>
            )}
            {data.skills.tools?.length > 0 && (
              <p><strong>Tools &amp; Technologies:</strong> {data.skills.tools.join(", ")}</p>
            )}
            {data.skills.coreSubjects?.length > 0 && (
              <p><strong>Core Areas:</strong> {data.skills.coreSubjects.join(", ")}</p>
            )}
          </div>
        </>
      )}

      {/* ACHIEVEMENTS */}
      {data.achievements?.length > 0 && (
        <>
          <SectionHeading title="Achievements" />
          <ul className="list-disc ml-5 mb-2 space-y-0.5">
            {data.achievements.map((item, index) => (
              <li key={index}>
                {typeof item === "string"
                  ? item
                  : (
                    <>
                      {item.title && <strong>{item.title}</strong>}
                      {item.description && ` - ${item.description}`}
                      {item.link && (
                        <>
                          {"  "}
                          <a href={item.link} target="_blank" rel="noreferrer" className="underline">
                            Profile
                          </a>
                        </>
                      )}
                    </>
                  )}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* POSITIONS OF RESPONSIBILITY */}
      {data.positionsOfResponsibility?.length > 0 && (
        <>
          <SectionHeading title="Positions Of Responsibility" />
          <ul className="list-disc ml-5 mb-3 space-y-0.5">
            {data.positionsOfResponsibility.map((item, index) => (
              <li key={index}>
                {typeof item === "string"
                  ? item
                  : (
                    <>
                      {item.position && <strong>{item.position}</strong>}
                      {item.organization && `, ${item.organization}`}
                      {item.description && ` – ${item.description}`}
                    </>
                  )}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* CERTIFICATIONS */}
      {data.certifications?.length > 0 && (
        <>
          <SectionHeading title="Certifications" />
          <ul className="list-disc ml-5 mb-3 space-y-0.5">
            {data.certifications.map((cert, index) => (
              <li key={index}>
                <strong>{cert.title}</strong>
                {cert.issuer && ` - ${cert.issuer}`}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* EXTRA CURRICULAR */}
      {data.extracurricularActivities?.length > 0 && (
        <>
          <SectionHeading title="Extra Curricular Activities" />
          <ul className="list-disc ml-5 mb-3 space-y-0.5">
            {data.extracurricularActivities.map((item, index) => (
              <li key={index}>
                {typeof item === "string"
                  ? item
                  : `${item.activity || item.title || ""} ${item.description ? "– " + item.description : ""}`}
              </li>
            ))}
          </ul>
        </>
      )}

    </div>
  );
};

const SectionHeading = ({ title }) => (
  <div className="mb-2 mt-4">
    <h2 className="uppercase font-bold text-[13px] tracking-wide" style={{ fontVariant: "small-caps" }}>
      {title}
    </h2>
    <hr className="border-black border-t mt-0.5" />
  </div>
);

export default NitTrichyTemplate;