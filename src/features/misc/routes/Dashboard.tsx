import { Text, Heading, Box, Flex, VStack, UnorderedList, ListItem } from '@chakra-ui/react';

import { ContentLayout } from '@/components/Layout';
import { useAuth } from '@/lib/auth';
import { useAppStore } from '@/stores/app';
// import { ROLES } from '@/lib/authorization';

export const Dashboard = () => {
  const { user } = useAuth();
  const { subdomain } = useAppStore();
  return (
    <ContentLayout
      title={
        'Vivid Vision ' + (subdomain.charAt(0).toUpperCase() + subdomain.slice(1)) + ' Dashboard'
      }
    >
      <Text fontSize="sm" color="gray.500" mt="1">
        You are currently logged in as <b className="font-semibold">{`${user?.user_name}`}</b>
      </Text>
      <VStack spacing={3} mt="5" align="stretch">
        <Text fontWeight="semibold">This Dashboard allows you to do the following:</Text>
        <Box pl="6">
          <UnorderedList spacing="0.5">
            <ListItem>Create new or modify existing Patients</ListItem>
            <ListItem>Enter in-office Cover Test results for each Patient</ListItem>
            <ListItem>Adjust Notification settings for each Patient</ListItem>
            <ListItem>Enable/Disable each Patient&apos;s access to Smart Assist</ListItem>
            <ListItem>View Data logged for each Patient</ListItem>
          </UnorderedList>
        </Box>
      </VStack>
    </ContentLayout>
  );
};
