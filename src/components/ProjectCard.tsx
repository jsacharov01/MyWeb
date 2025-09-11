import React, { FC } from "react";


interface ProjectCardProps {
name: string;
summary: string;
}


const ProjectCard: FC<ProjectCardProps> = ({ name, summary }) => {
return (
<div className="p-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow transition dark:bg-gray-800 dark:border-gray-700">
<h4 className="font-semibold">{name}</h4>
<p>{summary}</p>
</div>
);
};


export default ProjectCard;