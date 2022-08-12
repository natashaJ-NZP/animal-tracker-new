/* This is basically the same as 'app.js' in React. 
This page exists to solely make sure the website 
itself "appears" in the browser. */ 

import '../styles/globals.css'
import { SessionProvider } from "next-auth/react" 
import type { AppProps } from 'next/app'
import '../styles/tailwind.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}