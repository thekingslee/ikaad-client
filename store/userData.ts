import { create } from 'zustand';

interface UserData {
  firstname?: string;
  middlename?: string;
  lastname?: string;
  dob?: string;
  bvn?: string;
}

interface UserDataStore {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  clearUserData: () => void;
}

export const useUserDataStore = create<UserDataStore>((set) => ({
  userData: {},
  setUserData: (data: UserData) => set({ userData: data }),
  clearUserData: () => set({ userData: null }),
}));

export default useUserDataStore;
