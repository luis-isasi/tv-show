import type { AppProps } from 'next/app'

import '../styles/globals.css'

import { QueryClient, QueryClientProvider } from 'react-query'

//creating a query client
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
