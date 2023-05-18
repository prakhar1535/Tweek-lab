import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Radar } from 'react-chartjs-2';

type Props = {
  label: string;
  data: number[];
};

export default function ScoreChart({ label, data }: Props) {
  return (
    <Flex
      bg='white'
      position='relative'
      // width='lg'
      borderRadius='2xl'
      p={4}
      height={400}
      alignItems='center'
      justifyContent='center'
      // boxShadow='lg'
    >
      <Radar
        data={{
          labels: ['My Score', 'Run up', 'Jump', 'BFC', 'FFC', 'Release'],
          datasets: [
            {
              fill: true,
              backgroundColor: '#F04E3E20',
              borderColor: '#F04E3E',
              pointBackgroundColor: '#F04E3E',
              pointHoverBorderColor: '#F04E3E',
              label,
              data,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 100,
              pointLabels: {
                color: '#5a5a5a',
                font: {
                  size: 14,
                  weight: 'bold',
                },
              },
            },
          },
        }}
      />
    </Flex>
  );
}
