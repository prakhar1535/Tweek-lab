// Chakra imports
import { Flex, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
// Custom components
import { Card, CardBody } from '@/components/Card';
import { IconBox } from '@/components/Icons';
import React from 'react';

interface StatisticsProps {
  title: string;
  amount: string;
  percentage?: string;
  icon: React.ReactNode;
}

const Statistics = ({ title, amount, percentage, icon }: StatisticsProps) => {
  return (
    <Card minH='83px' variant='panel'>
      <CardBody>
        <Flex flexDirection='row' align='center' justify='center' w='100%'>
          <Stat me='auto'>
            <StatLabel
              fontSize='sm'
              color='gray.500'
              fontWeight='bold'
              pb='.1rem'
            >
              {title}
            </StatLabel>
            <Flex>
              <StatNumber fontSize='lg' color={'gray.700'} fontWeight={'black'}>
                {amount}
              </StatNumber>
            </Flex>
          </Stat>
          <IconBox as='box' h={'45px'} w={'45px'} bg={'brand.500'}>
            {icon}
          </IconBox>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Statistics;
