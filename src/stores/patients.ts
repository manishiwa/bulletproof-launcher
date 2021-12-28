import create from 'zustand';

// eslint-disable-next-line no-restricted-imports
import { Patient } from '@/features/patients/types';

type PatientsStore = {
  patients: Patient[];
  setPatients: (p: Patient[]) => void;
  selectedPatient: Patient | null | undefined;
  selectedPatientId: number;
  setSelectedPatientId: (id: number) => void;
  setSelectedPatient: (p: Patient) => void;

  // archivePatient: (id: string) => void;
  // unArchivePatient: (id: string) => void;
};

export const usePatientStore = create<PatientsStore>((set, get) => ({
  patients: [],
  selectedPatient: null,
  setPatients: (ps: Patient[]) => {
    set(() => ({
      patients: ps,
    }));
    console.log('setPatients', get().selectedPatientId);
    if (get().selectedPatientId != 0) {
      get().setSelectedPatientId(get().selectedPatientId);
    }
  },
  selectedPatientId: 0,
  setSelectedPatientId: (id: number) => {
    set((store) => ({
      selectedPatient: store.patients.find((p) => {
        return p.clinic_user_id == id;
      }),
      selectedPatientId: id,
    }));
  },
  setSelectedPatient: (p: Patient) =>
    set(() => ({
      selectedPatient: p,
      selectedPatientId: p.clinic_user_id,
    })),
}));
