"use client";

import React, { useEffect, useState } from "react";
import { ProjectList } from "../modules/types";
import styles from "./ProjectTable.module.css";
import { TABLE_CONTAINER_HEIGHT } from "../modules/constants";
import { CreateProjectModal } from "./CreateProjectModal";
import { useAtom } from "jotai";
import { showCreateModalAtom } from "../modules/atoms";

interface ProjectTableProps {
  data: ProjectList[];
}

export const ProjectTable = ({ data }: ProjectTableProps) => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const label = ["", "id", "name", "onthologyName", "numberOfImages", "created"];
  const [tableContainerHeight, setTableContainerHeight] = useState<number>(TABLE_CONTAINER_HEIGHT);
  const [showCreateModal, setShowCreateModal] = useAtom<boolean>(showCreateModalAtom);

  const handleRowClick = (projectId: number) => {
    setSelectedProjectId(selectedProjectId === projectId ? null : projectId);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
  };

  useEffect(() => {
    if (itemsPerPage === 15) {
      setTableContainerHeight(TABLE_CONTAINER_HEIGHT * 1.4);
    }

    if (itemsPerPage === 20) {
      setTableContainerHeight(TABLE_CONTAINER_HEIGHT * 1.8);
    }
  }, [itemsPerPage]);

  return (
    <div className={styles.container}>
      {showCreateModal && <CreateProjectModal />}
      <div className={styles.header}>
        <h1 className={styles.title}>Project</h1>
        <button
          className={styles.newProjectButton}
          onClick={() => {
            setShowCreateModal(true);
          }}
        >
          New Project
        </button>
      </div>
      <div
        className={styles.tableContainer}
        style={{
          height: selectedProjectId
            ? `${tableContainerHeight + 170}px`
            : `${tableContainerHeight}px`,
        }}
      >
        <table>
          <thead>
            <tr>
              {label.map(key => {
                const clonedDataRow =
                  key === "onthologyName" || key === "numberOfImages" || key === "";
                return (
                  <th key={key}>
                    <span>{key}</span>
                    {!clonedDataRow && (
                      <>
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
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((project, index) => {
              const isRowSelected = selectedProjectId === project.id;
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td
                      className={styles.detailToggleButton}
                      onClick={() => handleRowClick(project.id)}
                    >
                      {isRowSelected ? "▼" : "▶"}
                    </td>
                    <td>{project.id}</td>
                    <td>{project.name}</td>
                    <td>{project.ontologyName}</td>
                    <td>{project.numberOfImages}</td>
                    <td>{project.created}</td>
                  </tr>
                  {isRowSelected && (
                    <tr>
                      <td colSpan={5}>
                        <h2>Selected Project Details</h2>
                        <p>Id: {project.id}</p>
                        <p>Name: {project.name}</p>
                        <p>Ontology: {project.ontology}</p>
                        <p>OnthologyName: {project.ontologyName}</p>
                        <p>Number of Images: {project.numberOfImages}</p>
                        <p>Created: {project.created}</p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        <div className={styles.tableFooter}>
          <select
            className={styles.perPageInput}
            value={itemsPerPage}
            onChange={handlePerPageChange}
          >
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
            <option value={20}>20 per page</option>
          </select>
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
    </div>
  );
};
