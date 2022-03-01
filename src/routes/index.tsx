import { useRoutes } from 'react-router-dom';

import { Login } from '@/features/auth/routes/Login';
import { Landing } from '@/features/misc';
import { useAuth } from '@/lib/auth';
import { lazyImport } from '@/utils/lazyImport';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const auth = useAuth();

  // const commonRoutes = [{ path: '/', element: <Landing /> }];
  const commonRoutes = [{ path: '/', element: <Login /> }];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
