"use client";

import { useState } from "react";
import { ProjectList } from "../modules/types";
import styles from "./ProjectTable.module.css";

interface ProjectTableProps {
  data: ProjectList[];
}

export const ProjectTable = ({ data }: ProjectTableProps) => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const handleRowClick = (projectId: number) => {
    setSelectedProjectId(selectedProjectId === projectId ? null : projectId);
  };

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>OnthologyName</th>
            <th>Number of Images</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {data.map((project, index) => (
            <>
              <tr key={index} onClick={() => handleRowClick(project.id)}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.ontologyName}</td>
                <td>{project.numberOfImages}</td>
                <td>{project.created}</td>
              </tr>
              {selectedProjectId === project.id && (
                <tr key={"new"}>
                  <td colSpan={5}>
                    <h2>Selected Project Details</h2>
                    <p>Id: {project.id}</p>
                    <p>Name: {project.name}</p>
                    <p>OnthologyName: {project.ontologyName}</p>
                    <p>Number of Images: {project.numberOfImages}</p>
                    <p>Created: {project.created}</p>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
