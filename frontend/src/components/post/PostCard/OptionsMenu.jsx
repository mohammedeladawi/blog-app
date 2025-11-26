import { useEffect, useRef, useState } from "react";
import styles from "./PostCard.module.css";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import ConfirmModal from "components/common/ConfirmModal";
import EditPostModal from "../EditPostModal";

const OptionsMenu = ({ postSlug, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [action, setAction] = useState(null); // edit, delete, null
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const closeModal = () => setAction(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <div className={styles.optionsWrapper}>
        <button
          ref={btnRef}
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
          <div className={styles.menu} ref={menuRef}>
            <button
              className={styles.menuItem}
              onClick={() => {
                setShowMenu(false);
                setAction("edit");
              }}
            >
              Edit
            </button>
            <button
              className={styles.menuItemDelete}
              onClick={() => {
                setShowMenu(false);
                setAction("delete");
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {action === "delete" && (
        <ConfirmModal
          onClose={closeModal}
          onConfirm={onDelete}
          title="Delete Post"
          text="Are you sure you want to delete this post?"
          variant="danger"
        />
      )}

      {action === "edit" && (
        <EditPostModal
          postSlug={postSlug}
          onClose={closeModal}
          onSubmit={onEdit}
        />
      )}
    </>
  );
};

export default OptionsMenu;
