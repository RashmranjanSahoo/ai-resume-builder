import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";

// Traditional resume layout focused on readability and familiar recruiter scanning.
const ClassicTemplate = ({ data, accentColor }) => {
    // Format a date string/value to "Mon-YYYY"
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const str = dateStr.toString();

        const ymMatch = str.match(/^(\d{4})-(\d{2})/);
        if (ymMatch) {
            const date = new Date(Number(ymMatch[1]), Number(ymMatch[2]) - 1);
            const month = date.toLocaleDateString("en-US", { month: "short" });
            return `${month}-${ymMatch[1]}`;
        }

        const parsed = Date.parse(str);
        if (!isNaN(parsed)) {
            const date = new Date(parsed);
            const month = date.toLocaleDateString("en-US", { month: "short" });
            return `${month}-${date.getFullYear()}`;
        }

        if (/^\d{4}$/.test(str)) return str;

        return str;
    };

    const formatRange = (start, end, isCurrent) => {
        const startStr = formatDate(start);
        const endStr = isCurrent ? "Present" : formatDate(end);
        if (!startStr && !endStr) return "";
        return `${startStr} - ${endStr}`;
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
            {/* Header */}
            <header
                className="text-center mb-8 pb-6 border-b-2"
                style={{ borderColor: accentColor }}
            >
                <h1
                    className="text-3xl font-bold mb-2"
                    style={{ color: accentColor }}
                >
                    {data.personal_info?.fullName || "Your Name"}
                </h1>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">

                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}

                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}

                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}

                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1">
                            <Link className="size-4" />
                            <span>{data.personal_info.linkedin}</span>
                        </div>
                    )}

                    {data.personal_info?.github && (
                        <div className="flex items-center gap-1">
                            <Globe className="size-4" />
                            <span>{data.personal_info.github}</span>
                        </div>
                    )}

                    {data.personal_info?.portfolio && (
                        <div className="flex items-center gap-1">
                            <Globe className="size-4" />
                            <span>{data.personal_info.portfolio}</span>
                        </div>
                    )}

                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        PROFESSIONAL EXPERIENCE
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                                        <p className="text-gray-700 font-medium">{exp.company}</p>
                                    </div>
                                    <div className="text-right text-sm text-gray-600">
                                        <p>{formatRange(exp.start_date, exp.end_date, exp.is_current)}</p>
                                    </div>
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
            {data.projects?.length > 0 && (
                <section className="mb-6">

                    <h2
                        className="text-xl font-semibold mb-4"
                        style={{ color: accentColor }}
                    >
                        PROJECTS
                    </h2>

                    <div className="space-y-5">

                        {data.projects.map((project, index) => (
                            <div
                                key={index}
                                className="border-l-4 pl-4"
                                style={{ borderColor: accentColor }}
                            >

                                <div className="flex justify-between items-start">

                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            {project.name}
                                        </h3>

                                        {project.techStack && (
                                            <p className="text-sm italic text-gray-600">
                                                {project.techStack}
                                            </p>
                                        )}
                                    </div>

                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm underline"
                                            style={{ color: accentColor }}
                                        >
                                            View Project
                                        </a>
                                    )}

                                </div>

                                <div className="mt-2 whitespace-pre-line text-gray-700">
                                    {project.description}
                                </div>

                            </div>
                        ))}

                    </div>

                </section>
            )}

            {/* Education */}
            {data.education?.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                        EDUCATION
                    </h2>

                    <div className="space-y-4 text-sm">
                        {data.education.map((edu, index) => (
                            <div key={index}>
                                <p className="font-semibold">
                                    {edu.degree}
                                </p>

                                <p>
                                    {edu.institution}
                                </p>

                                {edu.cgpa && (
                                    <p className="text-zinc-600">
                                        CGPA: {edu.cgpa}
                                    </p>
                                )}

                                <p className="text-xs text-zinc-500">
                                    {formatRange(
                                        edu.startYear,
                                        edu.endYear,
                                        edu.is_current || edu.currentlyStudying
                                    )}
                                </p>

                                {edu.description?.length > 0 && (
                                    <ul className="list-disc ml-5 mt-2 space-y-1 text-zinc-700">
                                        {edu.description.map((point, idx) => (
                                            <li key={idx}>{point}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && (
                <section className="mb-6">

                    <h2
                        className="text-xl font-semibold mb-4"
                        style={{ color: accentColor }}
                    >
                        TECHNICAL SKILLS
                    </h2>

                    <div className="space-y-2 text-gray-700">

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

                </section>
            )}

            {/*achievements*/}
            {data.achievements?.length > 0 && (
                <section className="mb-6">

                    <h2
                        className="text-xl font-semibold mb-4"
                        style={{ color: accentColor }}
                    >
                        ACHIEVEMENTS
                    </h2>

                    <ul className="list-disc ml-5 space-y-2">

                        {data.achievements.map((item, index) => (
                            <li key={index}>
                                <strong>{item.title}</strong>
                                {item.description &&
                                    ` - ${item.description}`}
                            </li>
                        ))}

                    </ul>

                </section>
            )}

            {/*POSITIONS OF RESPONSIBILITY */}
            {data.positionsOfResponsibility?.length > 0 && (
                <section className="mb-6">

                    <h2
                        className="text-xl font-semibold mb-4"
                        style={{ color: accentColor }}
                    >
                        POSITIONS OF RESPONSIBILITY
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
            {/*EXTRA CURRICULAR ACTIVITIES */}
            {data.extracurricularActivities?.length > 0 && (
                <section className="mb-6">
                    <h2
                        className="text-xl font-semibold mb-4"
                        style={{ color: accentColor }}
                    >
                        EXTRA CURRICULAR ACTIVITIES
                    </h2>

                    <ul className="list-disc ml-5 space-y-2">
                        {data.extracurricularActivities.map((item, index) => (
                            <li key={index}>
                                <span className="font-medium">{item.activity}</span>
                                {item.description && (
                                    <span> — {item.description}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            {/*Certifications */}
            {data.certifications?.length > 0 && (
                <section className="mb-6">

                    <h2
                        className="text-xl font-semibold mb-4"
                        style={{ color: accentColor }}
                    >
                        CERTIFICATIONS
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
        </div>
    );
}

export default ClassicTemplate;
