import "../styles/globals.css";
import type { AppProps } from "next/app";
import Home from "./home";

function MyApp({ Component, pageProps }: AppProps) {
  return <Home/>;
  // return <Component {...pageProps} >

  // </Component>
}
export default MyApp;
