import React, { useState } from "react";
import styles from "./PostCard.module.css";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import ConfirmModal from "../ConfirmModal";

const OptionsMenu = ({ onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.optionsWrapper}>
      <button
        className={styles.optionsBtn}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setShowMenu((prev) => !prev);
        }}
      >
        <ThreeDotsVertical size={20} />
      </button>

      {showMenu && (
        <div className={styles.menu}>
          <button className={styles.menuItem} onClick={onEdit}>
            Edit
          </button>
          <button
            className={styles.menuItemDelete}
            onClick={() => setShowModal(true)}
          >
            Delete
          </button>
        </div>
      )}

      {showModal && (
        <ConfirmModal
          show={showModal}
          setShow={setShowModal}
          onConfirm={onDelete}
          title="Delete Post"
          text="Are you sure you want to delete this post?"
          variant="danger"
        />
      )}

      {}
    </div>
  );
};

export default OptionsMenu;
