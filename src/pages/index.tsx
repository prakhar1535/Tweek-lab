import { Age } from '@/components/Age';
import { BowlingAction } from '@/components/BowlingAction';
import { Gender } from '@/components/Gender';
import { Handedness } from '@/components/Handedness';
import { HeightDistribution } from '@/components/HeightDistribution';
import Layout from '@/components/Layout';
import Leaderboard from '@/components/Leaderboard';
import Statistics from '@/components/Statistics';
import { WeightDistribution } from '@/components/WeightDistribution';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import { HiClipboardList, HiUserGroup } from 'react-icons/hi';
import { IoIosBaseball, IoIosSpeedometer } from 'react-icons/io';

export default function Home() {
  return (
    <Layout heading='Home'>
      <Flex flexDirection='column' pt='6'>
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
          <Statistics
            title='Players'
            amount='4000'
            percentage='10%'
            icon={<HiUserGroup color='white' />}
          />
          <Statistics
            title='Balls Bowled'
            amount='2300'
            percentage='10%'
            icon={<IoIosBaseball color='white' />}
          />
          <Statistics
            title='Sessions'
            amount='2000'
            percentage='10%'
            icon={<HiClipboardList color='white' />}
          />
          <Statistics
            title='Top Bowling Speed'
            amount='161 km/h'
            percentage='10%'
            icon={<IoIosSpeedometer color='white' />}
          />
        </SimpleGrid>
        <SimpleGrid
          marginTop={15}
          columns={{ sm: 1, md: 2, xl: 4 }}
          spacing='24px'
        >
          <Handedness />
          <Gender />
          <Age />
          <BowlingAction />
        </SimpleGrid>
        <SimpleGrid
          marginTop={15}
          columns={{ sm: 1, md: 1, xl: 2 }}
          spacing='24px'
        >
          <HeightDistribution />
          <WeightDistribution />
        </SimpleGrid>
        <Leaderboard />
      </Flex>
    </Layout>
  );
}
