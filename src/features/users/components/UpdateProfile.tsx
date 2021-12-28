import { PencilIcon } from '@heroicons/react/solid';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField } from '@/components/Form';
// import { TextAreaField } from '@/components/Form/TextareaField';
import { useAuth } from '@/lib/auth';

import { UpdateProfileDTO, useUpdateProfile } from '../api/updateProfile';

const schema = z.object({
  user_name: z.string().min(1, 'Required'),
});

export const UpdateProfile = () => {
  const { user } = useAuth();
  const updateProfileMutation = useUpdateProfile();

  return (
    <FormDrawer
      isDone={updateProfileMutation.isSuccess}
      triggerButton={
        <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
          Update Profile
        </Button>
      }
      title="Update Profile"
      submitButton={
        <Button
          form="update-profile"
          type="submit"
          size="sm"
          isLoading={updateProfileMutation.isLoading}
        >
          Submit
        </Button>
      }
    >
      <Form<UpdateProfileDTO['data'], typeof schema>
        id="update-profile"
        onSubmit={async (values) => {
          await updateProfileMutation.mutateAsync({ data: values });
        }}
        options={{
          defaultValues: {
            user_name: user?.user_name,
          },
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              label="User Name"
              error={formState.errors['user_name']}
              registration={register('user_name')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
