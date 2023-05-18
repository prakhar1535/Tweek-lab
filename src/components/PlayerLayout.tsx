import { Player } from '@/types';
import { Box, Flex, Heading, Image, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { FaWeight } from 'react-icons/fa';
import { GiBodyHeight } from 'react-icons/gi';
import { HiClipboardList } from 'react-icons/hi';
import { HiCalendarDays } from 'react-icons/hi2';
import { IoIosBaseball, IoIosSpeedometer } from 'react-icons/io';
import { IoHandLeft } from 'react-icons/io5';
import HeaderStatistics from './HeaderStatistics';
import SimpleSidebar from './Sidebar';
import capitalize from 'capitalize';

type Props = {
  children: React.ReactNode;
  player: Player;
};

function PlayerLayout({ children, player }: Props) {
  const formattedBowlingAction = capitalize(
    player.bowlingAction.split(/(?=[A-Z])/).join(' ')
  );
  const formattedBowlingHandedness = capitalize(player.handedness);

  return (
    <main>
      <SimpleSidebar>
        <Box>
          <Flex
            py={25}
            px={100}
            bgGradient='linear(to-r, brand.500, brand.900, #df2935)'
            ml={-4}
            mt={-4}
            mr={-4}
          >
            <Flex width='100%' height='100%' alignItems='center' gap={100}>
              <Flex direction='column' alignItems='center' gap={5}>
                <Image
                  src={player.image}
                  alt={player.name}
                  borderRadius={9999}
                  height={250}
                  border={'8px solid white'}
                />
                <Heading
                  color='white'
                  fontWeight='black'
                  mb={5}
                  fontSize={'2xl'}
                  textAlign='center'
                >
                  {player.name},{' '}
                  {new Date().getFullYear() -
                    new Date(player.dob).getFullYear()}
                </Heading>
              </Flex>
              <Box mt="-20px">
                <SimpleGrid gap={'12'} columns={4}>
                  <HeaderStatistics
                    icon={<HiCalendarDays size={20} color='white' />}
                    value={`${player.dob}`}
                    label='Date of Birth'
                  />
                  <HeaderStatistics
                    value={`${player.weight} kg`}
                    label='Weight'
                    icon={<FaWeight size={15} color='white' />}
                  />
                  <HeaderStatistics
                    value={`${player.height} cm`}
                    label='Height'
                    icon={<GiBodyHeight size={18} color='white' />}
                  />
                  <HeaderStatistics
                    value={`${formattedBowlingHandedness}`}
                    label='Bowling Handedness'
                    icon={<IoHandLeft size={18} color='white' />}
                  />
                  <HeaderStatistics
                    value={`${formattedBowlingAction}`}
                    label='Bowling Action'
                    icon={<IoIosBaseball size={18} color='white' />}
                  />
                  <HeaderStatistics
                    value={`${player.topSpeed} km/h`}
                    label='Top Speed'
                    icon={<IoIosSpeedometer size={18} color='white' />}
                  />
                  <HeaderStatistics
                    value={`${player.topSpeed}`}
                    label='Sessions'
                    icon={<HiClipboardList size={18} color='white' />}
                  />
                  <HeaderStatistics
                    value={`${player.ballsBowled}`}
                    label='Balls Bowled'
                    icon={<IoIosBaseball size={18} color='white' />}
                  />
                </SimpleGrid>
              </Box>
            </Flex>
          </Flex>
          {children}
        </Box>
      </SimpleSidebar>
    </main>
  );
}

export default PlayerLayout;
