import { BaseEntity } from '@/types';

export type PatientCreate = {
  user_name: string;
  dob: string;

  dominant_eye?: 'Right' | 'Left';
  has_amblyopia?: 1 | 0;
  has_strabismus?: 1 | 0;
  gender?: 'Male' | 'Female' | 'Nonbinary';
  ethnicity?:
    | 'White'
    | 'Black or African American'
    | 'American Indian or Alaska Native'
    | 'Asian'
    | 'Native Hawaiian or Other Pacific Islander'
    | 'Other';
  notes?: string;
};

export type Patient = {
  user_id: string;
  user_name: string;
  medical_record_num: string;
  billing_email: string;
  billing_foxycart_id: string;
  is_clinic_billing_email: string;
  is_doctor: string;
  is_active: string;
  is_patient: string;

  dob: string;
  dominant_eye: string;
  has_amblyopia: number;
  has_strabismus: number;
  gender: string;
  ethnicity: string;
  notes: string;

  angle_of_deviation: string;
  last_played: string;
  initial_visual_acuity: string;
  desc_amblyopia: string;
  desc_strabismus: string;
  desc_has_achieved: string;
  mode: string;
  device_serial: string;
  treatment_plan_id: string;
  treatment_plan_value: string;
  settings: Settings | null;
  games_settings: any[] | null;
  saved_game: string;
  show_home_tab: string;
  show_research_tab: string;
  home_activation_code: string;
  home_status: string;
  home_auto_renew: string;
  home_auto_billing: string;
  distributor: string;
  timezone: string;
  sessions: string;
  doctor_id: string;
  first_activation_time: string;
  timestamp: string;
  clinic_user_id: number;
} & BaseEntity;

export interface Prism {
  DominantEye: string;
  AngleOfDeviation: string;
  HorizontalDeviation: number;
  VerticalDeviation: number;
  CycloDeviation: number;
  SplitDeviation: boolean;
}

export interface Suppression {
  ContrastRatio: number;
  Blur: number;
  BlurLeft: number;
  BlurRight: number;
  Occlusion: number;
  OcclusionLeft: number;
  OcclusionRight: number;
  OccluderBrightness: number;
}

export interface Misc {
  Luminance: number;
  UseZeroIPD: boolean;
}

export interface Settings {
  Prism: Prism;
  Suppression: Suppression;
  Misc: Misc;
}

export interface GameSettingsDetails {
  DominantEye: string;
  HorizontalDeviation: string;
  VerticalDeviation: string;
  CycloDeviation: string;
  SplitDeviation: string;
  UseExperimental: string;
  UseZeroIPD: string;
  Luminance: string;
  OccluderBrightness: string;
  OcclusionLeft: string;
  OcclusionRight: string;
  BlurLeft: string;
  BlurRight: string;
  ContrastRatio: string;
  Occlusion: string;
  Blur: string;
  IsLeapEnabled: string;
  SoundFXVolume: string;
  MusicVolume: string;
  GamepadSensitivity: string;
  AntiAliasing: string;
  Language: string;
  AngleOfDeviation: string;
  GameLength: string;
  ControlMode: string;
  Difficulty: string;
  StartingLevel: string;
  UseStartingLevel: string;
  BallSpeed: string;
  MaximumBallCount: string;
  Background: string;
  ShowBackgroundElements: string;
  DichopticMode: string;
  BallSize: string;
  BallContrast: string;
  PowerupOpacity: string;
  TrainingMode: string;
  ScaffoldLevelStart: string;
  ScaffoldLevelEnd: string;
  ShowPlatform: string;
  StartingSpeed: string;
  UseStartingSpeed: string;
  Friction: string;
  AsteroidRate: string;
  PowerupQuality: string;
  PowerupRate: string;
  PowerupIconSize: string;
  StereoShip: string;
}

export type GameSettings = {
  IsCustomized: boolean;
  IsPatientCustomized: boolean;
  Username: string;
  UserID: string;
  Scene: string;
  Settings: GameSettingsDetails;
};
