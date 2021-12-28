import * as React from 'react';

import { UserInfo } from '@/features/auth';
// import { Comment } from '@/features/comments';
// import { User } from '@/features/users';

import { useAuth } from './auth';

export enum ROLES {
  is_admin = 'is_admin',
  is_mod = 'is_mod',
  is_patient = 'is_patient',
}

type RoleTypes = keyof typeof ROLES;

export const POLICIES = {
  'comment:delete': (user: UserInfo) => {
    if (user.is_admin === '1') {
      return true;
    }

    if (user.is_mod === '1') {
      return true;
    }

    return false;
  },
};

export const useAuthorization = () => {
  const { user } = useAuth();

  if (!user) {
    throw Error('User does not exist!');
  }

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0) {
        let canAccess = false;
        allowedRoles?.forEach((role: RoleTypes) => {
          console.log('user[' + role + ']', user[role]);
          if (user && user[role] === '1') canAccess = true;
        });
        return canAccess;
      }
      return true;
    },
    [user]
  );

  return { checkAccess, role: user };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
