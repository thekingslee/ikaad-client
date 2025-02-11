import { create } from 'zustand';

interface LiveCaptureStore {
  userRecording: any;
  setUserRecording: (url: string) => void;
  clearVideos: () => void;
}

export const useLiveCaptureStore = create<LiveCaptureStore>((set) => ({
  userRecording: '',
  setUserRecording: (url: string) => set((state) => ({ userRecording: url })),
  clearVideos: () => set({ userRecording: '' }),
}));

export default useLiveCaptureStore;
