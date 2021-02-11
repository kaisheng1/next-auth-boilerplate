import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { getSession, Session } from "next-auth/client";
import merge from "lodash/merge";
import { Permission } from "./permissions";
import { AuthError, getAuthError } from "./error";

export interface WithAuthServerSidePropsOptions {
  permissions?: Permission[];
}

export interface AuthPageProps {
  error?: AuthError;
  session?: Session;
}

const withAuthServerSideProps = (
  getServerSideProps?: GetServerSideProps,
  options?: WithAuthServerSidePropsOptions
) => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<AuthPageProps>> => {
    const session = await getSession(context);

    // If the user is not authenticated, redirects to the login page
    if (!session) {
      return {
        props: {
          error: getAuthError("authentication"),
        },
      };
    }

    // Check all the permissions
    const permissions = (options?.permissions || []) as Permission[];
    for (const permission of permissions) {
      const { allowed, errorMessage } = await permission(session);
      if (!allowed) {
        return {
          props: {
            error: getAuthError("authorization", { message: errorMessage }),
          },
        };
      }
    }

    // If getServerSideProps function exists, then merge with the results
    if (getServerSideProps) {
      const serverSidePropsResult = await getServerSideProps(context);
      return merge(serverSidePropsResult, { props: { session } });
    }

    return { props: { session } };
  };
};

export default withAuthServerSideProps;
