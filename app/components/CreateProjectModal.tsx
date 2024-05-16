import React, { useState } from "react";
import { useSetAtom } from "jotai";
import styles from "./CreateProjectModal.module.css";
import { showCreateModalAtom } from "../modules/atoms";

export const CreateProjectModal = () => {
  const setShowCreateModal = useSetAtom(showCreateModalAtom);
  const [name, setName] = useState<string>("");
  const [currentOntology, setCurrentOntology] = useState("34955997_test_ontology");

  const handleSave = () => {
    console.log("Save clicked");
  };

  const handleCancel = () => {
    setShowCreateModal(false);
  };

  const handleSelectOntology = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentOntology(e.target.value);
  };

  return (
    <div className={styles.dimWrapper}>
      <div className={styles.createProjectContainer}>
        <div className={styles.inputBlockWrapper}>
          <div>Name</div>
          <input
            className={styles.input}
            placeholder="create a new project by typing its name and pressing Enter"
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputBlockWrapper}>
          <div>Ontology</div>
          <select className={styles.input} onChange={handleSelectOntology}>
            <option value="34955997_test_ontology">34955997_test_ontology</option>
          </select>
        </div>
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
