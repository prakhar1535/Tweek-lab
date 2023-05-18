import { Image } from '@chakra-ui/react';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href='/'>
      <Image src='/tweek-logo.svg' alt='Tweek Logo' width={150} />
    </Link>
  );
};
