import '../styles/globals.css'
import React from "react"
import { withUrqlClient, NextUrqlAppContext} from "next-urql"
import App, { AppProps, AppContext } from "next/app"
import fetch from "isomorphic-unfetch"

const API_ENDPOINT = "http://localhost:3000/api/app"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx)
  return { ...appProps }
}

export default withUrqlClient((_ssrExchange, _ctx) => ({
  url: API_ENDPOINT,
  fetch
}))(
  MyApp
)