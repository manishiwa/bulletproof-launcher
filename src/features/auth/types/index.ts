// export type AuthUser = {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   bio: string;
//   role: 'ADMIN' | 'USER';
// };

// export type UserResponse = {
//   jwt: string;
//   user: AuthUser;
// };

export type LoginAPIResponse = {
  success: string;
  error: string;
  user_info: UserInfo;
};

export type UserInfo = {
  user_id: string;
  user_name: string;
  email: string;
  billing_email: string;
  distributor: string;
  is_mod: string;
  is_admin: string;
  is_clinical: string;
  distributor_name: string;
  distributor_name_id: string;
  distributor_name_parent_id: string;
  distributor_id: string;
  parent_distributor_id: string;
  enable_shop: string;
  locale: string;
  foxycart_id: string;
  pass_hash: string;
  is_patient: string;
  is_active: string;
  clinic_user_name: string;
  home_status: string;
  doctor_id: string;
  show_research_tab: string;
  show_home_tab: string;
  last_played: string;
  dominant_eye: string;
  clinic_user_id: string;
  is_vvp_user: number;
  visual_fields: number;
};
