import { create } from 'zustand';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const useDelete = create<ModalProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
