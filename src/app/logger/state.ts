import { create } from "zustand";

export interface PhysicalActivity {
  type: string;
  duration: number;
}

export interface Log {
  moodRatings?: number;
  anxietyLevels?: number;
  stressLevels?: number;
  sleepHours?: number;
  sleepQuality?: number;
  sleepDisturbances: boolean;
  physicalActivities: PhysicalActivity[];
  socialInteractions: boolean;
  symptoms: string;
}

interface LogState {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  chartDuration: number;
  setChartDuration: (chartDuration: number) => void;
  log: Log;
  setLog: (log: Log) => void;
  clearLog: () => void;
  physicalActivitiesInput: PhysicalActivity;
  setPhysicalActivitiesInput: (
    physicalActivitiesInput: PhysicalActivity,
  ) => void;
  refreshQueryGetLogByDate: (() => void) | null;
  setRefreshQueryGetLogByDate: (refetch: () => void) => void;
}

const initLog = {
  moodRatings: Infinity,
  anxietyLevels: Infinity,
  stressLevels: Infinity,
  sleepHours: Infinity,
  sleepQuality: Infinity,
  sleepDisturbances: false,
  physicalActivities: [],
  socialInteractions: false,
  symptoms: "",
};

export const useLogStore = create<LogState>((set) => ({
  date: new Date(),
  setDate: (date: Date | undefined) => set({ date }),
  chartDuration: 7,
  setChartDuration: (chartDuration: number) => set({ chartDuration }),
  log: initLog,
  setLog: (log: Log) => set({ log }),
  clearLog: () => set({ log: initLog }),
  physicalActivitiesInput: {
    type: "",
    duration: 0,
  },
  setPhysicalActivitiesInput: (physicalActivitiesInput: PhysicalActivity) =>
    set({ physicalActivitiesInput }),
  refreshQueryGetLogByDate: null,
  setRefreshQueryGetLogByDate: (refetch) =>
    set({ refreshQueryGetLogByDate: refetch }),
}));
