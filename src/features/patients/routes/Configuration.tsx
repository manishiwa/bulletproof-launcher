import { ContentLayout } from '@/components/Layout';
import { Authorization, ROLES } from '@/lib/authorization';

import { PatientConfiguration } from '../components/PatientConfiguration';

export const Configuration = () => {
  return (
    <ContentLayout title="Configuration">
      <div className="mt-4">
        <Authorization
          forbiddenFallback={<div>Only admin can view this.</div>}
          allowedRoles={[ROLES.is_admin, ROLES.is_mod]}
        >
          <PatientConfiguration />
        </Authorization>
      </div>
    </ContentLayout>
  );
};
