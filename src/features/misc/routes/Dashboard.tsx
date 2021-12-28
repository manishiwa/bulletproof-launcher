import { ContentLayout } from '@/components/Layout';
import { useAuth } from '@/lib/auth';
// import { ROLES } from '@/lib/authorization';

export const Dashboard = () => {
  const { user } = useAuth();
  return (
    <ContentLayout title="Dashboard">
      <h1 className="text-xl mt-2">
        Welcome <b>{`${user?.user_name}`}</b>
      </h1>
      <h4 className="my-3">
        Your distributor is : <b>{user?.distributor}</b>
      </h4>
      <p className="font-medium">In this application you can:</p>
      {user?.is_clinical && (
        <ul className="my-4 list-inside list-disc">
          <li>Create comments in discussions</li>
          <li>Delete own comments</li>
        </ul>
      )}
      {(user?.is_admin || user?.is_mod) && (
        <ul className="my-4 list-inside list-disc">
          <li>Create discussions</li>
          <li>Edit discussions</li>
          <li>Delete discussions</li>
          <li>Comment on discussions</li>
          <li>Delete all comments</li>
        </ul>
      )}
    </ContentLayout>
  );
};
