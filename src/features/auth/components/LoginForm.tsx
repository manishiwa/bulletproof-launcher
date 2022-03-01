import { Alert, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useAuth } from '@/lib/auth';

const schema = z.object({
  u: z.string().min(1, 'Required'),
  p: z.string().min(1, 'Required'),
});

type LoginValues = {
  u: string;
  p: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoggingIn } = useAuth();
  const [error, setError] = useState(null);

  return (
    <div>
      <Form<LoginValues, typeof schema>
        onSubmit={async (values) => {
          try {
            await login(values);
            onSuccess();
          } catch (err) {
            setError(err);
          }
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            {error && (
              <Alert
                status="error"
                className="text-center"
                rounded="md"
                textAlign="center"
                display="block"
              >
                <AlertTitle mr={2}>Oops!</AlertTitle>
                <AlertDescription>Invalid Username or Password.</AlertDescription>
              </Alert>
            )}
            <InputField
              size="lg"
              type="text"
              label="User Name"
              error={formState.errors['u']}
              registration={register('u')}
            />
            <InputField
              size="lg"
              type="password"
              label="Password"
              error={formState.errors['p']}
              registration={register('p')}
            />
            <div>
              <Button isLoading={isLoggingIn} type="submit" className="w-full mt-3" size="lg">
                Log in
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <a
            href="https://www.seevividly.com/reset_password"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};
