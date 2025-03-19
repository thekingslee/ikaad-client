import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { create } from 'zustand';

interface UploadIdStore {
  uploadId: string | StaticImport;
  setUploadId: (id: string) => void;
}

const useUploadIdStore = create<UploadIdStore>((set) => ({
  uploadId: '',
  setUploadId: (id: string) => set({ uploadId: id }),
}));

export default useUploadIdStore;
