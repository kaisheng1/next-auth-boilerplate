import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { getSession, Session } from "next-auth/client";
import _ from "lodash";
import config from "./config";

export type PermissionResult = {
  allowed: Boolean | Promise<Boolean>;
  errorMessage?: string;
};
export type Permission = (
  session: Session
) => PermissionResult | Promise<PermissionResult>;

// A higher order function that makes a getServerSideProps function, handling authorization
const makePermissions = (
  permissions: Permission[],
  getServerSideProps?: GetServerSideProps
) => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<{ [key: string]: any }>> => {
    const serverSideResult = getServerSideProps
      ? await getServerSideProps(context)
      : { props: {} };
    const session = await getSession(context);

    // If the user is not authenticated, redirects to the login page
    if (!session) {
      return {
        props: {},
        redirect: { destination: config.routes.login, permanent: false },
      };
    }

    try {
      // Check all the permissions
      for (const permission of permissions) {
        const { allowed, errorMessage } = await permission(session);
        if (!allowed) throw new Error(errorMessage || "Not authorized!");
      }

      return _.merge(serverSideResult, { props: { session } });
    } catch (e) {
      return {
        props: {
          session,
          errorMessage: e.message,
        },
      };
    }
  };
};

export default makePermissions;
