import React from "react";
import { useSetAtom } from "jotai";
import styles from "./CreateProjectModal.module.css";
import { showCreateModalAtom } from "../modules/atoms";

export const CreateProjectModal = () => {
  const setShowCreateModal = useSetAtom(showCreateModalAtom);

  const handleSave = () => {
    console.log("Save clicked");
  };

  const handleCancel = () => {
    setShowCreateModal(false);
  };

  return (
    <div className={styles.dimWrapper}>
      <div className={styles.createProjectContainer}>
        <div className={styles.modalActions}>
          <button onClick={handleCancel} className={styles.buttonCancel}>
            Cancel
          </button>
          <button onClick={handleSave} className={styles.buttonSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
