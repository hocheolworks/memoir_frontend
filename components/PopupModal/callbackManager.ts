export interface ModalOptions {
  title: string;
  message: string;
  withCancel?: boolean;
  buttonText?: string;
  buttonType?: "confirm" | "danger";
  onClickConfirm?: () => void;
}

type OpenModal = (options: ModalOptions) => void;
type CloseModal = () => void;

interface ModalCallbackManager {
  openModalFunc: OpenModal | null;
  closeModalFunc: CloseModal | null;

  setFunctions: (open: OpenModal, close: CloseModal) => void;

  invokeOpen: OpenModal;
  invokeClose: CloseModal;
}

const manager: ModalCallbackManager = {
  openModalFunc: null,
  closeModalFunc: null,
  setFunctions(o, c) {
    this.openModalFunc = o;
    this.closeModalFunc = c;
  },
  invokeOpen(options) {
    if (this.openModalFunc) {
      this.openModalFunc(options);
    }
  },

  invokeClose() {
    if (this.closeModalFunc) {
      this.closeModalFunc();
    }
  },
};

export const setModalFunctions = manager.setFunctions.bind(manager);
export const openModal = manager.invokeOpen.bind(manager);
export const closeModal = manager.invokeClose.bind(manager);
