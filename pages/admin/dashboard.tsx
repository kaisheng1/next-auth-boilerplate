import { IS_ADMIN } from "auth/permissions";
import withAuthServerSideProps, {
  AuthPageProps,
} from "auth/withAuthServerSideProps";
import Layout from "components/layouts/Layout";
import { GetServerSideProps, NextPage } from "next";

interface Props extends AuthPageProps {}

const Dashboard: NextPage<Props> = () => {
  return <Layout>This is admin dashboard</Layout>;
};

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps(
  undefined,
  {
    permissions: [IS_ADMIN],
  }
);

export default Dashboard;
