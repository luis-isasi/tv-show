import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ContextFavoriteShowProvider } from '@Context/contextFavoriteShow'
import '../styles/globals.css'

//creating a query client
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextFavoriteShowProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ContextFavoriteShowProvider>
  )
}

export default MyApp
