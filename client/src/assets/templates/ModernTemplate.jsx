import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short"
		});
	};

	return (
		<div className="max-w-4xl mx-auto bg-white text-gray-800">
			{/* Header */}
			<header className="p-8 text-white" style={{ backgroundColor: accentColor }}>
				<h1 className="text-4xl font-light mb-3">
					<h1 className="text-4xl font-light mb-2">
						{data.personal_info?.full_name ||
							data.personal_info?.fullName ||
							"Your Name"}
					</h1>

					{data.personal_info?.profession && (
						<p className="text-lg opacity-90">
							{data.personal_info.profession}
						</p>
					)} </h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm ">
					{data.personal_info?.email && (
						<div className="flex items-center gap-2">
							<Mail className="size-4" />
							<span>{data.personal_info.email}</span>
						</div>
					)}
					{data.personal_info?.phone && (
						<div className="flex items-center gap-2">
							<Phone className="size-4" />
							<span>{data.personal_info.phone}</span>
						</div>
					)}
					{data.personal_info?.location && (
						<div className="flex items-center gap-2">
							<MapPin className="size-4" />
							<span>{data.personal_info.location}</span>
						</div>
					)}
					{data.personal_info?.linkedin && (
						<a target="_blank" href={data.personal_info?.linkedin} className="flex items-center gap-2">
							<Linkedin className="size-4" />
							<span className="break-all text-xs">{data.personal_info.linkedin.split("https://www.")[1] ? data.personal_info.linkedin.split("https://www.")[1] : data.personal_info.linkedin}</span>
						</a>
					)}
					{data.personal_info?.github && (
						<a
							target="_blank"
							href={data.personal_info.github}
							className="flex items-center gap-2"
						>
							<Globe className="size-4" />
							<span className="break-all text-xs">
								Github
							</span>
						</a>
					)}

					{data.personal_info?.portfolio && (
						<a
							target="_blank"
							href={data.personal_info.portfolio}
							className="flex items-center gap-2"
						>
							<Globe className="size-4" />
							<span className="break-all text-xs">
								Portfolio
							</span>
						</a>
					)}
				</div>
			</header>

			<div className="p-8">
				{/* Professional Summary */}
				{data.professional_summary && (
					<section className="mb-8">
						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
							Professional Summary
						</h2>
						<p className="text-gray-700 ">{data.professional_summary}</p>
					</section>
				)}

				{/* Experience */}
				{data.experience && data.experience.length > 0 && (
					<section className="mb-8">
						<h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">
							Experience
						</h2>

						<div className="space-y-6">
							{data.experience.map((exp, index) => (
								<div key={index} className="relative pl-6 border-l border-gray-200">

									<div className="flex justify-between items-start mb-2">
										<div>
											<h3 className="text-xl font-medium text-gray-900">{exp.position}</h3>
											<p className="font-medium" style={{ color: accentColor }}>{exp.company}</p>
										</div>
										<div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
											{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
										</div>
									</div>
									{exp.description && (
										<div className="text-gray-700 leading-relaxed mt-3 whitespace-pre-line">
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
					<section className="mb-8">
						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
							Projects
						</h2>

						<div className="space-y-6">
							{data.projects.map((p, index) => (
								<div
									key={index}
									className="relative pl-6 border-l-2"
									style={{ borderLeftColor: accentColor }}
								>
									<div className="flex justify-between items-start">

										<div>
											<h3 className="text-lg font-medium">
												{p.name}
											</h3>

											{p.techStack && (
												<p className="text-sm italic text-gray-500">
													{p.techStack}
												</p>
											)}
										</div>

										{p.link && (
											<a
												href={p.link}
												target="_blank"
												rel="noreferrer"
												className="text-sm underline"
												style={{ color: accentColor }}
											>
												View Project
											</a>
										)}
									</div>

									<div className="text-gray-700 text-sm mt-3 whitespace-pre-line">
										{p.description}
									</div>
								</div>
							))}
						</div>
					</section>
				)}

				<div className="grid sm:grid-cols-2 gap-8">
					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section>
							<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
								Education
							</h2>

							<div className="space-y-4">
								{data.education.map((edu, index) => (
									<div key={index}>
										<h3 className="font-semibold text-gray-900">
											{edu.degree} {edu.field && `in ${edu.field}`}
										</h3>
										<p style={{ color: accentColor }}>{edu.institution}</p>
										<div className="flex justify-between items-center text-sm text-gray-600">
											<span>{formatDate(edu.graduation_date)}</span>
											{edu.gpa && <span>GPA: {edu.gpa}</span>}
										</div>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Skills */}
					{data.skills && (
						<section>
							<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
								Technical Skills
							</h2>

							<div className="space-y-2 text-sm">

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
				</div>

				{/* Achievements */}
				{data.achievements?.length > 0 && (
					<section className="mb-8">
						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
							Achievements
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

				{/* Positions Of Responsibility */}
				{data.positionsOfResponsibility?.length > 0 && (
					<section className="mb-8">
						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
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

				{/* Certifications */}
				{data.certifications?.length > 0 && (
					<section className="mb-8">
						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
							Certifications
						</h2>

						<ul className="list-disc ml-5 space-y-2">
							{data.certifications.map((cert, index) => (
								<li key={index}>
									{cert.name || cert}
								</li>
							))}
						</ul>
					</section>
				)}

				{/* Extra Curricular Activities */}
				{data.extracurricularActivities?.length > 0 && (
					<section className="mb-8">
						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
							Extra Curricular Activities
						</h2>

						<ul className="list-disc ml-5 space-y-2">
							{data.extracurricularActivities.map((item, index) => (
								<li key={index}>
									{item.title || item}
								</li>
							))}
						</ul>
					</section>
				)}

			</div>
		</div>
	);
}

export default ModernTemplate;