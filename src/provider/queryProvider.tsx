"use client"
import { ReactNode } from 'react';
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

  interface QueryProviderProps{
    children: ReactNode
  }
  // Create a client
const queryClient = new QueryClient()
 export default function QueryProvider({children}:QueryProviderProps) {
    return ( 
        <QueryClientProvider client={queryClient}>
             <ReactQueryDevtools initialIsOpen={false} />
           {children}
        </QueryClientProvider>
     );
  }
