'use client';
import React, { ReactNode } from 'react';
import '@/components/dashboard/styles/App.css';
import '@/components/dashboard/styles/Contact.css';
import '@/components/dashboard/styles/MiniCalendar.css';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';
import theme from '@/components/dashboard/card/theme/theme';

export default function AppWrappers({ children }: { children: ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>{' '}
    </CacheProvider>
  );
}
