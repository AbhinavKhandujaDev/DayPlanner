import { createPortal } from "react-dom";

const Modal = ({ children, onClick }) => {
  return createPortal(
    <div
      id="modal"
      style={{ background: "rgba(0,0,0, 0.3)" }}
      className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center z-10"
      onClick={(e) => {
        if (e.target.id === "modal") onClick && onClick();
      }}
    >
      {children}
    </div>,
    document.querySelector("#myportal")
  );
};

export default Modal;
