import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { IconBox } from './Icons';

type Props = {
  icon: React.ReactNode;
  value: any;
  label: string;
};

export default function HeaderStatistics({ icon, value, label }: Props) {
  return (
    <Box>
      <Text
        fontSize='xs'
        color='gray.100'
        fontWeight='bold'
        pb='.1rem'
        textTransform='uppercase'
      >
        {label}
      </Text>
      <Flex
        bg='white'
        borderRadius='10px'
        p='1.5'
        width={200}
        alignItems='center'
        gap={3}
      >
        <IconBox
          as='box'
          h={'40px'}
          w={'40px'}
          bg={'brand.500'}
          borderRadius='8px'
        >
          {icon}
        </IconBox>
        <Text fontWeight='bold' fontSize='lg'>
          {value}
        </Text>
      </Flex>
    </Box>
  );
}
