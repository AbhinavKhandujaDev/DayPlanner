import { createPortal } from "react-dom";
import { renderToStaticMarkup } from "react-dom/server";

interface ModalProps {
  onClick?: () => void;
  children?: JSX.Element;
}

const Modal = (props: ModalProps) => {
  const { onClick, children } = props;
  return createPortal(
    <div
      id="modal"
      style={{ background: "rgba(0,0,0, 0.3)" }}
      className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center z-10"
      onMouseDown={(e: any) => {
        if (e.target.id === "modal") onClick && onClick();
      }}
    >
      {children}
    </div>,
    document.querySelector("#myportal")
  );
};

export function showModal(render: JSX.Element, onClick?: () => void) {
  let ele = document.createElement("div");
  ele.id = "modal";
  ele.onclick = () => onClick && onClick();
  ele.className =
    "w-screen h-screen absolute top-0 left-0 flex items-center justify-center z-10";
  ele.style.background = "rgba(0,0,0, 0.3)";
  ele.innerHTML = renderToStaticMarkup(render);
  let portal = document.querySelector("#myportal");
  portal?.appendChild(ele);
  if (!portal) {
    document.body.appendChild(portal!);
  }
}

export default Modal;
