import config from "auth/config";
import Layout from "components/layouts/Layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CustomError } from "types";

interface Props {
  error: CustomError;
}

const Error: NextPage<Props> = ({ error }) => {
  const router = useRouter();

  useEffect(() => {
    if (error.type === "authentication") {
      router.push(config.routes.REDIRECT_IF_NOT_AUTHENTICATED);
    }
  }, []);

  return <Layout>{error.message}</Layout>;
};

export default Error;
