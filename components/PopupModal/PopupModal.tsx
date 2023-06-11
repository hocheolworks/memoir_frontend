import React, {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Children } from "@utils/types";
import { cls } from "@utils/functions";
import { ModalOptions, setModalFunctions } from "./callbackManager";

interface ModalButtonProps {
  className?: string;
  type?: "cancel" | "confirm" | "danger";
  onClick?: MouseEventHandler;
  children: Children;
}

const ModalButton: FC<ModalButtonProps> = ({
  className,
  type = "confirm",
  onClick,
  children,
}) => {
  return (
    <button
      className={cls(
        "rounded-md py-1.5 px-3.5 text-lg",
        type === "cancel"
          ? "bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700"
          : "bg-point text-white hover:brightness-110",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export interface PopupModalProps {}

export const PopupModal: FC<PopupModalProps> = ({}) => {
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);
  const [options, setOptions] = useState<ModalOptions>({
    title: "",
    message: "",
  });

  const closeModal = useCallback(() => {
    document.body.style.overflow = "unset";
    document.body.removeEventListener("keydown", escapeKeyPressHandler);
    setClosing(true);
  }, []);

  const backgroundClickHandler: MouseEventHandler = useCallback((e) => {
    e.stopPropagation();
    closeModal;
  }, []);

  const escapeKeyPressHandler = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  const onConfirmClick = useCallback(() => {
    if (options.onClickConfirm) {
      options.onClickConfirm();
    }
    closeModal();
  }, [options]);

  useEffect(() => {
    const openModal = (options: ModalOptions) => {
      document.body.style.overflow = "hidden";
      document.body.addEventListener("keydown", escapeKeyPressHandler);
      setOptions({ ...options });
      setShow(true);
    };

    setModalFunctions(openModal, closeModal);
  }, []);

  return show
    ? createPortal(
        <div
          className="flex-center full-page z-20 bg-white/[.85] dark:bg-black/[.85]"
          onClick={backgroundClickHandler}
        >
          <article
            className={cls(
              "relative h-[240px] w-[420px] rounded-xl bg-neutral-100 px-10 py-10 shadow-lg dark:bg-neutral-800",
              closing
                ? "animate-slide-out-bck-bottom"
                : "animate-slide-in-blurred-bottom"
            )}
            onAnimationEnd={() => {
              if (show && closing) {
                setClosing(false);
                setShow(false);
              }
            }}
          >
            <h3 className="pb-6 text-xl font-semibold">{options.title}</h3>
            <p className="whitespace-pre-line text-left text-lg">
              {options.message}
            </p>
            <div className="absolute bottom-6 right-8 flex gap-2">
              {options.withCancel && (
                <ModalButton type="cancel" onClick={closeModal}>
                  취소
                </ModalButton>
              )}
              <ModalButton onClick={onConfirmClick}>
                {options.buttonText ?? "확인"}
              </ModalButton>
            </div>
          </article>
        </div>,
        document.body
      )
    : null;
};
