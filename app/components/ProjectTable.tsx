"use client";

import { ProjectList } from "../modules/types";

interface ProjectTableProps {
  data: ProjectList[];
}

export const ProjectTable = ({ data }: ProjectTableProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number of Images</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {data.map((project, index) => (
            <tr key={index}>
              <td>{project.name}</td>
              <td>{project.numberOfImages}</td>
              <td>{project.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
