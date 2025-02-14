// store/store.ts
import { create } from 'zustand';

export type Pages =
  | 'prestart'
  | 'start'
  | 'camera-permission'
  | 'live-capture'
  | 'confirm-video'
  | 'user-form'
  | 'bvn'
  | 'select-doc'
  | 'upload-doc'
  | 'capture-doc'
  | 'preview-doc'
  | 'finish';

export type VericationStageTypes =
  | 'START'
  | 'LIVELINESS_TEST'
  | 'DOCUMENT_CAPTURE'
  | 'BVN'
  | 'FINISH';

export type VerificationsMap = {
  stage: VericationStageTypes;
  startRoute: string;
  endRoute: string;
};

export const verificationsMap: VerificationsMap[] = [
  {
    stage: 'START' as VericationStageTypes,
    startRoute: '/secure/prestart',
    endRoute: '/secure/start',
  },
  {
    stage: 'LIVELINESS_TEST',
    startRoute: '/secure/camera-permission',
    endRoute: '/secure/confirm-video',
  },
  {
    stage: 'DOCUMENT_CAPTURE',
    startRoute: '/secure/upload-id',
    endRoute: '/secure/preview-id',
  },
  {
    stage: 'BVN',
    startRoute: '/secure/form-data',
    endRoute: '/secure/bvn',
  },
  {
    stage: 'FINISH',
    startRoute: '/secure/finish',
    endRoute: '',
  },
];

// export const sessionKeys = {
//   VERIFICATION_IDENTIFER: '',
//   COUNTRY: 'ng',
//   ALLOWED_IDS: ['START', 'LIVELINESS_TEST', 'BVN'],
//   VERIFICATION_STAGES: ['START', 'LIVELINESS_TEST', 'BVN'],
// };

interface StoreState {
  currentStage: number;
  stageData: VerificationsMap;
  verificationStages: VericationStageTypes[];

  setVerificationStages: (stages: VericationStageTypes[]) => void; // Updated once in a verification live cycle
  updateCurrentStage: (stage: VericationStageTypes) => void;
}

// Retrieve verificationStages from session storage
const storedVerificationStages =
  typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('verificationStages') || '[]')
    : [];

// Retrieve currentStage from session storage
const storedCurrentStage =
  typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('currentStage') || '0')
    : 0;

const useStore = create<StoreState>((set) => ({
  currentStage: storedCurrentStage,
  stageData:
    verificationsMap.find(
      (item) => item.stage === storedVerificationStages[storedCurrentStage]
    ) || ({} as VerificationsMap),
  verificationStages: storedVerificationStages as VericationStageTypes[],

  updateCurrentStage: (stage: VericationStageTypes) =>
    set((state) => {
      let newStage = state.currentStage;
      let stageData = {} as VerificationsMap;
      if (state.verificationStages.length <= state.currentStage) {
        return state;
      }

      newStage = state.verificationStages.indexOf(stage);
      stageData =
        verificationsMap.find((item) => item.stage === stage) ||
        ({} as VerificationsMap);

      // Save the current stage to session storage
      sessionStorage.setItem('currentStage', JSON.stringify(newStage));

      return {
        currentStage: newStage,
        stageData: stageData,
      };
    }),

  setVerificationStages: (stages: VericationStageTypes[]) => {
    // Save verificationStages to session storage
    sessionStorage.setItem('verificationStages', JSON.stringify(stages));

    set(() => ({
      verificationStages: stages,
    }));
  },
}));

export default useStore;
