// import { useState } from 'react';
import { initReactQueryAuth } from 'react-query-auth';

import { Spinner } from '@/components/Elements';
import {
  logout,
  loginWithUsernameAndPassword,
  getUser,
  registerWithEmailAndPassword,
  // UserResponse,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  // AuthUser,
  UserInfo,
  LoginAPIResponse,
} from '@/features/auth';

// import storage from '@/utils/storage';

// const [user, setUser] = useState<null | UserInfo>(null);

async function handleUserResponse(data: LoginAPIResponse) {
  // const { jwt, user } = data.user_info;
  // storage.setToken(jwt);
  console.log('handleUserResponse::data', data);
  return data.user_info;
}

async function loadUser() {
  const data = await getUser();
  return data;
  // return null;
}

async function loginFn(data: LoginCredentialsDTO) {
  console.log('loginFn::data', data);
  const response = await loginWithUsernameAndPassword(data);
  console.log('loginFn::response', response);
  const user = await handleUserResponse(response);
  console.log('loginFn::user', user);
  return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  // storage.clearToken();
  const response = await logout();
  console.log(response);
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  UserInfo | null,
  unknown,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);
