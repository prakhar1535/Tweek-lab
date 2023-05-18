import BallsSessionLineChart from '@/components/BallsSessionLineChart';
import PlayerLayout from '@/components/PlayerLayout';
import ScoreChart from '@/components/ScoreChart';
import { Player } from '@/types';
import { GridItem, Heading, SimpleGrid } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import BallSpeedTrends from '../ball-speed-trends';
import { BallSpeedTrendsLine } from '@/components/BallSpeedTrendsLine';
import SessionLeaderboard from '@/components/SessionsTable';
import SessionsTable from '@/components/SessionsTable';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as any;
  // const { data } = await  fetch(<api url>)

  const player: Player = {
    id,
    name: 'Esthera Jackson',
    ballSpeed: 100,
    runUp: 54,
    jump: 67,
    bfc: 98,
    ffc: 78,
    release: 52,
    dob: '1990-01-01',
    height: 175,
    weight: 75,
    handedness: 'right',
    bowlingAction: 'hipDominant',
    topSpeed: 100,
    sessions: 200,
    ballsBowled: 500,
    image: '/sample-bowler.png',
  };

  return {
    props: {
      player,
    },
  };
};

type Props = {
  player: Player;
};

export default function PlayerPage({ player }: Props) {
  const totalScore =
    (player.runUp + player.jump + player.bfc + player.ffc + player.release) / 5;
  return (
    <PlayerLayout player={player}>
      <SimpleGrid columns={3} spacing={10} p={10}>
        <GridItem colSpan={1}>
          <ScoreChart
            data={[
              totalScore,
              player.runUp,
              player.jump,
              player.bfc,
              player.ffc,
              player.release,
            ]}
            label={player.name}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <BallsSessionLineChart player={player} />
        </GridItem>
      </SimpleGrid>
      <BallSpeedTrendsLine />
      <SessionsTable />
    </PlayerLayout>
  );
}
