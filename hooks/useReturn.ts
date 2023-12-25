import { create } from 'zustand';

type ModalProps = {
  salesId: string | null;
  onGet: (id: string) => void;
  onReset: () => void;
};

export const useReturnStore = create<ModalProps>((set) => ({
  salesId: null,
  onGet: (id: string) => {
    set({ salesId: id });
  },
  onReset: () => {
    set({ salesId: null });
  },
}));
