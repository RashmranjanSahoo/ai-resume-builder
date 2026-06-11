import { Mail, Phone, MapPin } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-zinc-800">
            <div className="grid grid-cols-3">

                <div className="col-span-1  py-10">
                    {/* Image */}
                    {data.personal_info?.image && typeof data.personal_info.image === 'string' ? (
                        <div className="mb-6">
                            <img src={data.personal_info.image} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto" style={{ background: accentColor + '70' }} />
                        </div>
                    ) : (
                        data.personal_info?.image && typeof data.personal_info.image === 'object' ? (
                            <div className="mb-6">
                                <img src={URL.createObjectURL(data.personal_info.image)} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto" />
                            </div>
                        ) : null
                    )}
                </div>

                {/* Name + Title */}
                <div className="col-span-2 flex flex-col justify-center py-10 px-8">
                    <h1 className="text-4xl font-bold text-zinc-700 tracking-widest">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="uppercase text-zinc-600 font-medium text-sm tracking-widest">
                        {data?.personal_info?.profession || "Profession"}
                    </p>
                </div>

                {/* Left Sidebar */}
                <aside className="col-span-1 border-r border-zinc-400 p-6 pt-0">


                    {/* Contact */}
                    <section className="mb-8">
                        <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                            CONTACT
                        </h2>

                        <div className="space-y-2 text-sm">

                            {data.personal_info?.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone size={14} style={{ color: accentColor }} />
                                    <span>{data.personal_info.phone}</span>
                                </div>
                            )}

                            {data.personal_info?.email && (
                                <div className="flex items-center gap-2">
                                    <Mail size={14} style={{ color: accentColor }} />
                                    <span>{data.personal_info.email}</span>
                                </div>
                            )}

                            {data.personal_info?.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} style={{ color: accentColor }} />
                                    <span>{data.personal_info.location}</span>
                                </div>
                            )}

                            {data.personal_info?.linkedin && (
                                <div className="break-all">
                                    <strong>LinkedIn:</strong><br />
                                    {data.personal_info.linkedin}
                                </div>
                            )}

                            {data.personal_info?.github && (
                                <div className="break-all">
                                    <strong>GitHub:</strong><br />
                                    {data.personal_info.github}
                                </div>
                            )}

                            {data.personal_info?.portfolio && (
                                <div className="break-all">
                                    <strong>Portfolio:</strong><br />
                                    {data.personal_info.portfolio}
                                </div>
                            )}

                        </div>
                    </section>

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
                                            {edu.startYear} - {edu.endYear}
                                        </p>

                                    </div>
                                ))}

                            </div>
                        </section>
                    )}


                    {/* Skills */}
                    {data.skills && (
                        <section className="mb-8">

                            <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                                SKILLS
                            </h2>

                            <div className="space-y-2 text-sm">

                                {data.skills.languages?.length > 0 && (
                                    <p>
                                        <strong>Languages:</strong><br />
                                        {data.skills.languages.join(", ")}
                                    </p>
                                )}

                                {data.skills.frameworks?.length > 0 && (
                                    <p>
                                        <strong>Frameworks:</strong><br />
                                        {data.skills.frameworks.join(", ")}
                                    </p>
                                )}

                                {data.skills.databases?.length > 0 && (
                                    <p>
                                        <strong>Databases:</strong><br />
                                        {data.skills.databases.join(", ")}
                                    </p>
                                )}

                                {data.skills.tools?.length > 0 && (
                                    <p>
                                        <strong>Tools:</strong><br />
                                        {data.skills.tools.join(", ")}
                                    </p>
                                )}

                            </div>

                        </section>
                    )}
                </aside>

                {/* Right Content */}
                <main className="col-span-2 p-8 pt-0">

                    {/* Summary */}
                    {data.professional_summary && (
                        <section className="mb-8">
                            <h2 className="text-sm font-semibold tracking-widest mb-3" style={{ color: accentColor }} >
                                SUMMARY
                            </h2>
                            <p className="text-zinc-700 leading-relaxed">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-semibold tracking-widest mb-4" style={{ color: accentColor }} >
                                EXPERIENCE
                            </h2>
                            <div className="space-y-6 mb-8">
                                {data.experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-semibold text-zinc-900">
                                                {exp.position}
                                            </h3>
                                            <span className="text-xs text-zinc-500">
                                                {formatDate(exp.start_date)} -{" "}
                                                {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-sm mb-2" style={{ color: accentColor }} >
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <ul className="list-disc list-inside text-sm text-zinc-700 leading-relaxed space-y-1">
                                                {Array.isArray(exp.description)
                                                    ? exp.description.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))
                                                    : exp.description?.split("\n").map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))
                                                }
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.project && data.project.length > 0 && (
                        <section>
                            <h2 className="text-sm uppercase tracking-widest font-semibold" style={{ color: accentColor }}>
                                PROJECTS
                            </h2>
                            <div className="space-y-4">
                                {data.project.map((project, index) => (
                                    <div key={index}>
                                        <h3 className="text-md font-medium text-zinc-800 mt-3">{project.name}</h3>
                                        <p className="text-sm mb-1" style={{ color: accentColor }} >
                                            {project.type}
                                        </p>
                                        {project.description && (
                                            <ul className="list-disc list-inside text-sm text-zinc-700  space-y-1">
                                                {project.description.split("\n").map((line, i) => (
                                                    <li key={i}>{line}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {/* Achievements */}
                    {data.achievements?.length > 0 && (
                        <section className="mb-8">

                            <h2
                                className="text-sm uppercase tracking-widest font-semibold"
                                style={{ color: accentColor }}
                            >
                                ACHIEVEMENTS
                            </h2>

                            <ul className="list-disc ml-5 mt-3 space-y-1">

                                {data.achievements.map((item, index) => (
                                    <li key={index}>
                                        <strong>{item.title}</strong>
                                        {item.description && ` - ${item.description}`}
                                    </li>
                                ))}

                            </ul>

                        </section>
                    )}
                    {/* POR */}
                    {data.positionsOfResponsibility?.length > 0 && (
                        <section className="mb-8">

                            <h2
                                className="text-sm uppercase tracking-widest font-semibold"
                                style={{ color: accentColor }}
                            >
                                POSITIONS OF RESPONSIBILITY
                            </h2>

                            <ul className="list-disc ml-5 mt-3 space-y-1">

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
                    {/* Certifications */}
                    {data.certifications?.length > 0 && (
                        <section className="mb-8">

                            <h2
                                className="text-sm uppercase tracking-widest font-semibold"
                                style={{ color: accentColor }}
                            >
                                CERTIFICATIONS
                            </h2>

                            <ul className="list-disc ml-5 mt-3 space-y-1">

                                {data.certifications.map((cert, index) => (
                                    <li key={index}>
                                        <span className="font-medium">{cert.title}</span>
                                        {cert.issuer && <span> — {cert.issuer}</span>}
                                    </li>
                                ))}

                            </ul>

                        </section>
                    )}
                    {/* Extra Curricular */}
                    {data.extracurricularActivities?.length > 0 && (
                        <section className="mb-8">
                            <h2
                                className="text-sm uppercase tracking-widest font-semibold"
                                style={{ color: accentColor }}
                            >
                                EXTRA CURRICULAR ACTIVITIES
                            </h2>

                            <ul className="list-disc ml-5 mt-3 space-y-1">
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
                </main>
            </div>
        </div>
    );
}


export default MinimalImageTemplate;