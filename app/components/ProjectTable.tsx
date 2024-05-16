"use client";

import { ProjectList } from "../modules/types";
import styles from "./ProjectTable.module.css";

interface ProjectTableProps {
  data: ProjectList[];
}

export const ProjectTable = ({ data }: ProjectTableProps) => {
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
            <tr key={index}>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.ontologyName}</td>
              <td>{project.numberOfImages}</td>
              <td>{project.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
