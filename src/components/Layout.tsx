import React from 'react';
import SimpleSidebar from './Sidebar';
import { Box, Heading } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
  heading?: string;
};

function Layout({ children, heading }: Props) {
  return (
    <main>
      <SimpleSidebar>
        <Box ml='4' mt='8'>
          {heading && (
            <Heading fontSize='3xl' fontWeight='black'>
              {heading}
            </Heading>
          )}
          {children}
        </Box>
      </SimpleSidebar>
    </main>
  );
}

export default Layout;
