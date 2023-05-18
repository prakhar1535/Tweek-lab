import { extendTheme } from '@chakra-ui/react';
import { Fira_Code, Inter } from 'next/font/google';
import cardComponents from './card';

const inter = Inter({ subsets: ['latin'] });
const firaCode = Fira_Code({ subsets: ['latin'] });

const colors = {
  brand: {
    500: '#FF7955',
    900: '#F04E3E',
  },
};

export const chakraTheme = extendTheme(
  {
    colors,
    fonts: {
      inter: inter.style.fontFamily,
      heading: `'inter', sans-serif`,
      body: `'inter', sans-serif`,
      firaCode: firaCode.style.fontFamily,
      code: `'firaCode', monospace`,
    },
  },
  {
    components: {
      ...cardComponents,
    },
  }
);

export const chartBackground = [
  '#FF7955',
  '#06A77D',
  '#31AFD4',
  '#F04E3E',
  '#DF2935',
  '#1E3888',
];
