import { nanoid } from 'nanoid';
import create from 'zustand';

type AppStore = {
  subdomain: string;
  setSubdomain: (s: string) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  subdomain: '',
  setSubdomain: (s: string) =>
    set(() => ({
      subdomain: s,
    })),
}));
