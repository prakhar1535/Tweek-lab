import {
  Box,
  BoxProps,
  Drawer,
  DrawerContent,
  DrawerFooter,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { FiMenu } from 'react-icons/fi';
import { HiHome, HiPresentationChartLine } from 'react-icons/hi';
import { Logo } from './Logo';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href?: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: HiHome, href: '/' },
  {
    name: 'Ball Speed Trends',
    icon: HiPresentationChartLine,
    href: '/ball-speed-trends',
  },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'flex' }}
      />

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
        <DrawerFooter>
          <Text>&copy; Made by Ananya, Raghav, Dev and Mihir</Text>
        </DrawerFooter>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p='4'>
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Flex
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      display={'flex'}
      flexDirection='column'
      justifyContent='space-between'
      {...rest}
    >
      <Box flex={1}>
        <Flex my='6' alignItems='center' mx='6' justifyContent='space-between'>
          <Logo />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            href={link.href}
            my='2'
            fontSize='15'
          >
            {link.name}
          </NavItem>
        ))}
      </Box>
      <Text
        fontSize='xs'
        my='2'
        textAlign='center'
        fontWeight='bold'
        color='gray.500'
      >
        &copy; Tweek Labs
      </Text>
    </Flex>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  href?: string;
  children: React.ReactNode;
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
  return (
    <Link href={href || '/'}>
      <Flex
        align='center'
        p='2'
        mx='4'
        borderRadius='md'
        role='group'
        cursor='pointer'
        fontWeight='medium'
        _hover={{
          bg: '#F04E3E15',
          color: 'brand.900',
        }}
        fontSize='14'
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='20'
            _groupHover={{
              color: 'brand.900',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent='flex-start'
      {...rest}
    >
      <IconButton
        variant='outline'
        onClick={onOpen}
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <Logo />
    </Flex>
  );
};
