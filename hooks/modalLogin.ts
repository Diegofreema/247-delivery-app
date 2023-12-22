import { create } from 'zustand';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const useModalLogin = create((set) => ({}));
