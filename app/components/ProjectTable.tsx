"use client";

import { useState } from "react";
import { ProjectList } from "../modules/types";
import styles from "./ProjectTable.module.css";

interface ProjectTableProps {
  data: ProjectList[];
}

export const ProjectTable = ({ data }: ProjectTableProps) => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
  const itemsPerPage = 10;
  const label = ["id", "name", "onthologyName", "numberOfImages", "created"];

  const handleRowClick = (projectId: number) => {
    setSelectedProjectId(selectedProjectId === projectId ? null : projectId);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a: any, b: any) => {
    if (!sortColumn || !sortDirection) return 0;
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Project</h1>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              {label.map(key => (
                <th key={key}>
                  <span>{key}</span>
                  <span
                    className={styles.arrow}
                    onClick={() => {
                      setSortColumn(key);
                      setSortDirection("asc");
                    }}
                  >
                    ↑
                  </span>
                  <span
                    className={styles.arrow}
                    onClick={() => {
                      setSortColumn(key);
                      setSortDirection("desc");
                    }}
                  >
                    ↓
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((project, index) => (
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
        <div className={styles.pagination}>
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => i + 1).map(
            pageNumber => (
              <button
                className={styles.button}
                key={pageNumber}
                style={currentPage === pageNumber ? { color: "red" } : undefined}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
