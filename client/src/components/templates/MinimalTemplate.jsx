
const MinimalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light">
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-4xl font-thin mb-4 tracking-wide">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
                    {data.personal_info?.location && <span>{data.personal_info.location}</span>}
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
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-10">
                    <p className=" text-gray-700">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Experience
                    </h2>

                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-medium">{exp.position}</h3>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <div className="mb-2">

                                    <p className="text-gray-600">
                                        {exp.company}
                                    </p>

                                    {exp.location && (
                                        <p className="text-xs text-gray-500">
                                            {exp.location}
                                        </p>
                                    )}

                                </div>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Projects
                    </h2>

                    <div className="space-y-4">
                        {data.project.map((proj, index) => (
                            <div key={index}>

                                <div className="flex justify-between items-center">

                                    <div>
                                        <h3 className="text-lg font-medium">
                                            {proj.name}
                                        </h3>

                                        {proj.techStack && (
                                            <p className="text-sm text-gray-500 italic">
                                                {proj.techStack}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex gap-3">

                                        {proj.github && (
                                            <a
                                                href={proj.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-sm underline"
                                            >
                                                Github
                                            </a>
                                        )}

                                        {proj.link && (
                                            <a
                                                href={proj.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-sm underline"
                                            >
                                                Live
                                            </a>
                                        )}

                                    </div>

                                </div>

                                <div className="mt-2 whitespace-pre-line text-gray-700">
                                    {proj.description}
                                </div>

                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Education
                    </h2>

                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-medium">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600">{edu.institution}</p>
                                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section>
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Skills
                    </h2>

                    <div className="text-gray-700">
                        <div className="space-y-2">

                            {data.skills.languages?.length > 0 && (
                                <p>
                                    <strong>Languages:</strong>{" "}
                                    {data.skills.languages.join(", ")}
                                </p>
                            )}

                            {data.skills.frameworks?.length > 0 && (
                                <p>
                                    <strong>Frameworks:</strong>{" "}
                                    {data.skills.frameworks.join(", ")}
                                </p>
                            )}

                            {data.skills.databases?.length > 0 && (
                                <p>
                                    <strong>Databases:</strong>{" "}
                                    {data.skills.databases.join(", ")}
                                </p>
                            )}

                            {data.skills.tools?.length > 0 && (
                                <p>
                                    <strong>Tools:</strong>{" "}
                                    {data.skills.tools.join(", ")}
                                </p>
                            )}

                            {data.skills.coreSubjects?.length > 0 && (
                                <p>
                                    <strong>Core Subjects:</strong>{" "}
                                    {data.skills.coreSubjects.join(", ")}
                                </p>
                            )}

                        </div>
                    </div>
                </section>
            )}
            {/*Achievements */}
            {data.achievements?.length > 0 && (
                <section className="mt-10">

                    <h2
                        className="text-sm uppercase tracking-widest mb-6 font-medium"
                        style={{ color: accentColor }}
                    >
                        Achievements
                    </h2>

                    <ul className="list-disc ml-5 space-y-2">

                        {data.achievements.map((item, index) => (
                            <li key={index}>
                                <strong>{item.title}</strong>
                                {item.description &&
                                    ` - ${item.description}`
                                }
                            </li>
                        ))}

                    </ul>

                </section>
            )}
            {/*POR */}
            {data.positionsOfResponsibility?.length > 0 && (
                <section className="mt-10">

                    <h2
                        className="text-sm uppercase tracking-widest mb-6 font-medium"
                        style={{ color: accentColor }}
                    >
                        Positions Of Responsibility
                    </h2>

                    <ul className="list-disc ml-5 space-y-2">

                        {data.positionsOfResponsibility.map((item, index) => (
                            <li key={index}>
                                <strong>{item.position}</strong>
                                {" - "}
                                {item.organization}
                            </li>
                        ))}

                    </ul>

                </section>
            )}
/*certifications*/
            {data.certifications?.length > 0 && (
                <section className="mt-10">

                    <h2
                        className="text-sm uppercase tracking-widest mb-6 font-medium"
                        style={{ color: accentColor }}
                    >
                        Certifications
                    </h2>

                    <ul className="list-disc ml-5 space-y-2">

                        {data.certifications.map((cert, index) => (
                            <li key={index}>
                                <span className="font-medium">{cert.title}</span>
                                {cert.issuer && <span> — {cert.issuer}</span>}
                            </li>
                        ))}

                    </ul>

                </section>
            )}
            {/*Extra-curricular */}
            {data.extracurricularActivities?.length > 0 && (
                <section className="mt-10">
                    <h2
                        className="text-sm uppercase tracking-widest mb-6 font-medium"
                        style={{ color: accentColor }}
                    >
                        Extra Curricular Activities
                    </h2>

                    <ul className="list-disc ml-5 space-y-2">
                        {data.extracurricularActivities.map((item, index) => (
                            <li key={index}>
                                <span className="font-medium">
                                    {item.activity || item.title}
                                </span>
                                {item.description && (
                                    <span> — {item.description}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}

export default MinimalTemplate;