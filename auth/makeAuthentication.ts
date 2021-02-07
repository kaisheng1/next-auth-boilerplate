import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { getSession, Session } from "next-auth/client";
import _ from "lodash";
import config from "./config";

// A higher order function that makes a getServerSideProps function, handling authentication
const makeAuthentication = (getServerSideProps?: GetServerSideProps) => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<{ session?: Session }>> => {
    const serverSideResult = getServerSideProps
      ? await getServerSideProps(context)
      : { props: {} };
    const session = await getSession(context);

    return _.merge(serverSideResult, {
      props: { session },
      redirect: !!session && { destination: config.routes.login, permanent: false },
    });
  };
};

export default makeAuthentication;
