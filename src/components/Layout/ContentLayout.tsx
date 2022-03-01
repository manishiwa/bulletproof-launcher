import { Box, Heading } from '@chakra-ui/react';
import * as React from 'react';

import { Head } from '../Head';

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      <Box p={4}>
        <Box background="white" width="full" rounded="md">
          <Head title={title} />
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Heading fontSize={['sm', '2xl', '4xl']} color="gray.900">
                {title}
              </Heading>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </Box>
      </Box>
    </>
  );
};
