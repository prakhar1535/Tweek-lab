import React from 'react';
import { Card, CardHeader } from './Card';
import { Pie } from 'react-chartjs-2';
import { Flex, Text } from '@chakra-ui/react';
import { chartBackground } from '@/styles/chakra-theme';

type Props = {};

export function Age({}: Props) {
  const data = {
    labels: ['0-10', '10-15', '15-20', '20-25', '25-30', '30+'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [10, 20, 30, 40, 50, 60],
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
            Age Group
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
