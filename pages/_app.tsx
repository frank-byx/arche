import React from "react"
import { withUrqlClient, NextUrqlAppContext } from "next-urql"
import App, { AppProps, AppContext } from "next/app"
import fetch from "isomorphic-unfetch"
import Head from "next/head"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from "./theme"
import PropTypes from "prop-types"

const API_ENDPOINT = "http://localhost:3000/api/app"

const MyApp = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx)
  return { ...appProps }
}

export default withUrqlClient((_ssrExchange, _ctx) => ({
  url: API_ENDPOINT,
  fetch,
  requestPolicy: "cache-and-network",
}))(MyApp)
