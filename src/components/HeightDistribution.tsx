import React from 'react';
import { Card, CardHeader } from './Card';
import { Bar } from 'react-chartjs-2';
import { Flex, Text } from '@chakra-ui/react';
import { chartBackground } from '@/styles/chakra-theme';

type Props = {};

export function HeightDistribution({}: Props) {
  const data = {
    labels: [170, 180, 190, 200, 210, 220, 230],
    datasets: [
      {
        label: 'My First Dataset',
        data: [170, 180, 190, 200, 190, 130, 120],
        backgroundColor: chartBackground[0],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Card>
      <CardHeader mb='20px'>
        <Flex direction='column' alignSelf='flex-start'>
          <Text fontSize='lg' color='gray.700' fontWeight='bold' mb='6px'>
            Height Distribution
          </Text>
        </Flex>
      </CardHeader>
      <Bar
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
