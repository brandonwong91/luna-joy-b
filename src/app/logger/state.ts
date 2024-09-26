import { create } from "zustand";

export interface Log {
  moodRatings: number;
  anxietyLevels: number;
  sleepHours: number;
  sleepQuality: number;
  sleepDisturbances: boolean;
  physicalActivities: {
    type: string;
    duration: number;
  }[];
  socialInteractions: boolean;
  stressLevels: number;
  symptoms: string;
}

interface LogState {
  log: Log;
  setLog: (log: Log) => void;
}

export const useLogStore = create<LogState>((set) => ({
  log: {
    moodRatings: 0,
    anxietyLevels: 0,
    sleepHours: 0,
    sleepQuality: 0,
    sleepDisturbances: false,
    physicalActivities: [],
    socialInteractions: false,
    stressLevels: 0,
    symptoms: "",
  },
  setLog: (log: Log) => set({ log }),
}));
