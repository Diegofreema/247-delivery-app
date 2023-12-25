import { create } from 'zustand';

type ModalProps = {
  imgUri: string | null;
  salesId: string | null;
  onGet: (value: { imgUri: string | null; salesId: string | null }) => void;
  onReset: () => void;
};

export const useSignature = create<ModalProps>((set) => ({
  imgUri: null,
  salesId: null,
  onGet: (value: { imgUri: string | null; salesId: string | null }) => {
    set({ imgUri: value.imgUri, salesId: value.salesId });
  },
  onReset: () => {
    set({ imgUri: null, salesId: null });
  },
}));
