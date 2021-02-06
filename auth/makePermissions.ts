import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { getSession, Session } from "next-auth/client";
import _ from "lodash";

export type Permission = (session: Session) => Boolean | Promise<Boolean>;

// A higher order function that makes a getServerSideProps function, handling authorization
const makePermissions = (
  permission: Permission,
  getServerSideProps?: GetServerSideProps
) => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<{ [key: string]: any }>> => {
    const serverSideResult = getServerSideProps
      ? await getServerSideProps(context)
      : { props: {} };
    const session = await getSession(context);

    if (!session) {
      return {
        props: {},
        redirect: { destination: "/login", permanent: false },
      };
    }

    const allowed = await permission(session);
    return allowed
      ? _.merge(serverSideResult, { props: { session } })
      : { props: { session } };
  };
};

export default makePermissions;
