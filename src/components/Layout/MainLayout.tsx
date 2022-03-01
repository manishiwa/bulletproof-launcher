/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from '@chakra-ui/icons';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  UserIcon,
  FolderIcon,
  HomeIcon,
  MenuAlt2Icon,
  MenuIcon,
  UsersIcon,
  XIcon,
  KeyIcon,
  UserGroupIcon,
} from '@heroicons/react/solid';
// import { MenuIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import * as React from 'react';
// eslint-disable-next-line import/order
import { Box, Text, Button } from '@chakra-ui/react';
import { NavLink, Link } from 'react-router-dom';

import logo from '@/assets/vivid_vision_logo.png';
// eslint-disable-next-line no-restricted-imports
import { PatientsList } from '@/features/patients/components/PatientsListBlue';
import { useAuth } from '@/lib/auth';
import { useAuthorization, ROLES } from '@/lib/authorization';

type SideNavigationItem = {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

const SideNavigation = () => {
  const { checkAccess } = useAuthorization();
  const navigation = [
    { name: 'Home', to: '.', icon: HomeIcon },
    { name: 'Patients', to: './patients', icon: UserGroupIcon },
    checkAccess({ allowedRoles: [ROLES.is_admin, ROLES.is_mod] }) && {
      name: 'Mod',
      to: './mod_tools',
      icon: KeyIcon,
    },
  ].filter(Boolean) as SideNavigationItem[];

  return (
    <>
      {navigation.map((item, index) => (
        <NavLink
          end={index === 0}
          key={item.name}
          to={item.to}
          className={clsx(
            'text-blue-200 active:text-white hover:bg-blue-800 hover:text-white',
            'group flex items-center px-3 py-3 text-base font-normal rounded-md'
          )}
          activeClassName="text-blue-700 bg-white active:text-white hover:text-white hover:bg-blue-700"
        >
          <item.icon className={clsx('', 'flex-shrink-0 h-6 w-6')} aria-hidden="true" />
        </NavLink>
      ))}
    </>
  );
};

type UserNavigationItem = {
  name: string;
  to: string;
  onClick?: () => void;
};

const UserNavigation = () => {
  const { logout } = useAuth();

  const userNavigation = [
    { name: 'Your Profile', to: './profile' },
    {
      name: 'Sign out',
      to: '',
      onClick: () => {
        logout();
      },
    },
  ].filter(Boolean) as UserNavigationItem[];

  return (
    <Menu as="div" className="ml-0 relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="px-4 h-16 border-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-300">
              <span className="sr-only">Open user menu</span>
              <MenuIcon className="h-6 w-6 m-0"></MenuIcon>
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      onClick={item.onClick}
                      to={item.to}
                      className={clsx(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

type MobileSidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileSidebar = ({ sidebarOpen, setSidebarOpen }: MobileSidebarProps) => {
  return (
    <Transition.Root show={sidebarOpen} as={React.Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 flex z-40 lg:hidden "
        open={sidebarOpen}
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={React.Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div
            className="relative flex flex-col w-80 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900"
            css={{ width: '320px !important' }}
          >
            <Transition.Child
              as={React.Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex items-center h-16 flex-shrink-0 m-2  justify-center">
              <Logo />
            </div>
            <Box
              className="flex-1 flex flex-col overflow-y-hidden p-0 w-full"
              // css={{
              //   '&::-webkit-scrollbar': {
              //     width: '4px',
              //   },
              //   '&::-webkit-scrollbar-track': {
              //     width: '6px',
              //   },
              //   '&::-webkit-scrollbar-thumb': {
              //     background: 'white',
              //     borderRadius: '24px',
              //   },
              // }}
            >
              <nav className="flex-1 bg-white space-y-2 w-full h-full">
                <PatientsList />
                {/* <SideNavigation /> */}
              </nav>
            </Box>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
      </Dialog>
    </Transition.Root>
  );
};

const NavigationBar = () => {
  return (
    <Box className="xs:flex xs:flex-shrink-0 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 ">
      <div className="flex flex-col">
        <div className="flex flex-col h-0 flex-1">
          <Box className="flex-1 flex flex-col overflow-y-none p-0 w-full">
            <nav className="flex-1 p-2 space-y-2 w-full mt-24">
              <SideNavigation />
            </nav>
          </Box>
          {/* <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
              <SideNavigation />
            </nav>
          </div> */}
        </div>
      </div>
    </Box>
  );
};

const Sidebar = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-80">
        <div className="flex flex-col h-0 flex-1">
          <Box
            className="flex-1 flex flex-col overflow-y-none p-0 w-full"
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'white',
                borderRadius: '24px',
              },
            }}
          >
            <nav className="flex-1 p-2 bg-white space-y-2 w-full">
              <PatientsList />
            </nav>
          </Box>
        </div>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <Link className="flex items-center text-white" to=".">
      <img className="h-10 w-auto" src={logo} alt="Vivid Vision Web" />
      {/* <span className="text-xl text-white font-semibold">Bulletproof React</span> */}
    </Link>
  );
};

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-200">
      <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <NavigationBar />
      {/* <Sidebar /> */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <button
          className="mx-4 mt-2 mb-0 p-2 font-medium bg-blue-800 rounded-md text-white font-medium focus:outline-none lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          View Patient List
        </button>
        <div className="flex-1 px-0 flex justify-center">
          {/* <Logo /> */}
          <main className="flex-1 relative overflow-y-auto focus:outline-none">{children}</main>
          {/* <div className="relative z-10 flex-shrink-0 flex h-16 bg-gray-100">
            <div className="flex-3 px-0 flex justify-end">
              <div className="ml-4 flex items-center md:ml-6">
                <UserNavigation />
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="xs:flex xs:flex-shrink-0 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
        <div className="flex flex-col">
          <div className="flex flex-col h-0 flex-1">
            <Box className="flex-1 flex flex-col overflow-y-none p-0 w-full">
              <nav className="flex-1 space-y-2 w-full">
                <UserNavigation />
              </nav>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};
