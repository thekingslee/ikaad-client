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

export type VerificationsStage = {
  stage: VericationStageTypes;
  route: string;
  nextStageRoute: string;
  completed: boolean;
};

export const allVerificationsStageData: any[] = [
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

// Retrieve generatedVerificationMap from session storage
const storedGeneratedVerificationMap =
  typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('generatedVerificationMap') || '[]')
    : [];

// Retrieve currentStage from session storage
const storedCurrentStage =
  typeof window !== 'undefined'
    ? JSON.parse(sessionStorage.getItem('currentStage') || '0')
    : 0;

// ################################################
// ##########     HOW TO USE THE STORE   ##########
// ################################################

// When you are on the last route of a stage:
// 1. Navigate to the next stage route using: stageData.nextStageRoute
// 2. Mark the current stage as completed by updating: generatedVerificationMap[currentStage].completed to true

// When on the first stage:
// 1. updateCurrentStage()

interface StoreState {
  currentStage: number;
  stageData: VerificationsStage;
  generatedVerificationMap: VerificationsStage[];

  setVerificationStages: (stages: VericationStageTypes[]) => void; // Updated once in a verification live cycle
  updateCurrentStage: (stage?: VericationStageTypes) => void;
}

// Current Stage and Stage data are set at a StageMap start-route
const useStore = create<StoreState>((set) => ({
  currentStage: storedCurrentStage,
  stageData: storedGeneratedVerificationMap[
    storedCurrentStage
  ] as VerificationsStage,
  generatedVerificationMap:
    storedGeneratedVerificationMap as VerificationsStage[],

  updateCurrentStage: (stage?: VericationStageTypes) =>
    set((state) => {
      let newStage = state.currentStage; // Default stage to what is on state
      let stageData = {} as VerificationsStage;
      if (state.generatedVerificationMap.length <= state.currentStage) {
        return state;
      }

      // Find new stage based in stage passed as a parameter
      newStage = state.generatedVerificationMap.findIndex(
        (item) => item.stage === stage
      );

      // Update the stageData based on the new stage
      stageData = state.generatedVerificationMap[newStage];

      // Save the current stage to session storage
      sessionStorage.setItem('currentStage', JSON.stringify(newStage));

      return {
        currentStage: newStage,
        stageData: stageData,
      };
    }),

  setVerificationStages: (stages: VericationStageTypes[]) => {
    // Using the parameter stages, generate a verification Map
    const generatedVerificationMap = stages?.map(
      (stage: VericationStageTypes, index: number) => {
        const stageIndex = allVerificationsStageData.findIndex(
          (item) => item.stage === stage
        );
        const nextStageIndex = allVerificationsStageData.findIndex(
          (item) => item.stage === stages[index + 1]
        );

        return {
          stage: stage,
          route: allVerificationsStageData[stageIndex]?.startRoute || '',
          nextStageRoute:
            allVerificationsStageData[nextStageIndex]?.startRoute || '',
          completed: false,
        };
      }
    );

    // Save verificationStages to session storage
    sessionStorage.setItem(
      'generatedVerificationMap',
      JSON.stringify(generatedVerificationMap)
    );

    set(() => ({
      generatedVerificationMap,
    }));
  },
}));

export default useStore;
