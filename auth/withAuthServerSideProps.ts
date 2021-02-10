import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { getSession } from "next-auth/client";
import merge from "lodash/merge";
import config from "./config";
import { Permission } from "./permissions";

export interface withAuthServerSidePropsOptions {
  permissions?: Permission[];
}

const withAuthServerSideProps = (
  getServerSideProps?: GetServerSideProps,
  options?: withAuthServerSidePropsOptions
) => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<{ [key: string]: any }>> => {
    const session = await getSession(context);

    // If the user is not authenticated, redirects to the login page
    if (!session) {
      return {
        props: {},
        redirect: {
          destination: config.routes.REDIRECT_IF_NOT_AUTHENTICATED,
          permanent: false,
        },
      };
    }

    try {
      // Check all the permissions
      const permissions = (options?.permissions || []) as Permission[];
      for (const permission of permissions) {
        const { allowed, errorMessage } = await permission(session);
        if (!allowed) throw new Error(errorMessage || "Not authorized!");
      }

      // If getServerSideProps function exists, then merge with the results
      if (getServerSideProps) {
        const serverSideResult = await getServerSideProps(context);
        return merge(serverSideResult, { props: { session } });
      }

      return { props: { session } };
    } catch (e) {
      // When catch an error (access denied), return a error message
      return {
        props: {
          session,
          errorMessage: e.message,
        },
      };
    }
  };
};

export default withAuthServerSideProps;
