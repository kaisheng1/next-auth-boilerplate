import { NextPage } from "next";
import { AppProps } from "next/app";
import Error from "pages/_error";
import { CustomError } from "types";

interface Props extends AppProps {}

const MyApp: NextPage<Props> = ({ Component, pageProps }) => {
  const error = pageProps.error as CustomError;
  if (error) {
    return <Error error={error} />;
  }
  return <Component {...pageProps} />;
};

export default MyApp;
