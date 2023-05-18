import { BallSpeedTrendsScatter } from '@/components/BallSpeedTrendsScatter';
import Layout from '@/components/Layout';

type Props = {};

function BallSpeedTrends({}: Props) {
  return (
    <Layout heading='Ball Speed Trends'>
      <BallSpeedTrendsScatter
      // data={{ pass data here }}
      />
    </Layout>
  );
}

export default BallSpeedTrends;
