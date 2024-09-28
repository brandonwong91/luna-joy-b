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
  log: Log;
  setLog: (log: Log) => void;
  clearLog: () => void;
}

const initLog = {
  moodRatings: undefined,
  anxietyLevels: undefined,
  stressLevels: undefined,
  sleepHours: undefined,
  sleepQuality: undefined,
  sleepDisturbances: false,
  physicalActivities: [],
  socialInteractions: false,
  symptoms: "",
};

export const useLogStore = create<LogState>((set) => ({
  date: new Date(),
  setDate: (date: Date | undefined) => set({ date }),
  log: initLog,
  setLog: (log: Log) => set({ log }),
  clearLog: () => set({ log: initLog }),
}));
