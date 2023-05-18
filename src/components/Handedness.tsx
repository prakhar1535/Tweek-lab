import React from 'react';
import { Card, CardHeader } from './Card';
import { Pie } from 'react-chartjs-2';
import { Flex, Text } from '@chakra-ui/react';
import { chartBackground } from '@/styles/chakra-theme';

type Props = {};

export function Handedness({}: Props) {
  const data = {
    labels: ['Left', 'Right'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [56, 44],
        backgroundColor: chartBackground,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Card>
      <CardHeader mb='20px'>
        <Flex direction='column' alignSelf='flex-start'>
          <Text fontSize='lg' color='gray.700' fontWeight='bold' mb='6px'>
            Handedness
          </Text>
        </Flex>
      </CardHeader>
      <Pie
        data={data}
        options={{
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
              },
            },
          },
        }}
      />
    </Card>
  );
}
