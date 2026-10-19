import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-box" role="dialog" aria-modal="true">
        <h2>Dish Details</h2>
        <p>Kitfo — 350 ETB</p>

        <button ref={closeButtonRef} onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;