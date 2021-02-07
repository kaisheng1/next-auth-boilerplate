import { AppProps } from "next/app";

interface Props extends AppProps {}

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
