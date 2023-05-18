import { Player } from '@/types';
import { Box, Select } from '@chakra-ui/react';
import { BubbleDataPoint, ChartData, ChartDataset, Point } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

type Props = {
  player: Player;
};

const ballSpeeds = [113, 100, 123, 98, 87, 76, 65, 54, 78, 156];
const ballsBowled = [23, 12, 34, 56, 78, 90, 12, 34, 13, 24];

export default function BallsSessionLineChart({ player }: Props) {
  const [dataset, setDataset] = useState<
    ChartDataset<
      'line',
      (number | [number, number] | Point | BubbleDataPoint | null)[]
    >
  >({
    label: 'Ball Speed',
    data: ballSpeeds,
  });

  const [chartType, setChartType] = useState<'ball-speed' | 'balls-bowled'>(
    'ball-speed'
  );

  

  useEffect(() => {
    if (chartType === 'ball-speed') {
      setDataset({
        label: 'Ball Speed',
        data: ballSpeeds,
      });
    } else {
      setDataset({
        label: 'Balls Bowled per Session',
        data: ballsBowled,
      });
    }
  }, [chartType]);

  return (
    <Box
      bg='white'
      position='relative'
      borderRadius='2xl'
      p={4}
      height={400}
      // boxShadow='lg'
    >
      {/* <Select
        onChange={(e) => setChartType(e.target.value as any)}
        w='xs'
        float='right'
        mr={9}
        size='sm'
        zIndex={10}
      >
        <option value='ball-speed' defaultChecked>
          Ball Speed
        </option>
        <option value='balls-bowled'>Balls Bowled per Session</option>
      </Select> */}
      <Box position='absolute' inset={5} top={12}>
        <Line
          style={{
            position: 'relative',
          }}
          data={{
            labels: Array.from({ length: 10 }, (_, i) => i + 1).map(
              (i) => `Session ${i}`
            ),
            datasets: [
              {
                ...dataset,
                fill: true,
                backgroundColor: '#F04E3E20',
                borderColor: '#F04E3E',
                tension: 0.2,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
                position: 'bottom',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  font: {
                    size: 14,
                  },
                  text: 'Session',
                },
              },
              y: {
                title: {
                  display: true,
                  font: {
                    size: 14,
                  },
                  text: dataset.label,
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
