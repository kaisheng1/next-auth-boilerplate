import { signIn } from "next-auth/client";
import config from "auth/config";
import { NextPage } from "next";
import Layout from "components/layouts/Layout";

interface Props {}

const LoginPage: NextPage<Props> = () => {
  return (
    <Layout>
      <button
        onClick={() =>
          signIn("github", {
            callbackUrl: config.routes.REDIRECT_IF_AUTHENTICATED,
          })
        }
      >
        Login
      </button>
    </Layout>
  );
};

export default LoginPage;
