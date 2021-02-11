import { IS_ADMIN } from "auth/permissions";
import withAuthServerSideProps from "auth/withAuthServerSideProps";
import Layout from "components/layouts/Layout";
import { GetServerSideProps } from "next";

const Dashboard = () => {
  return <Layout>This is admin dashboard</Layout>;
};

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps(
  undefined,
  {
    permissions: [IS_ADMIN],
  }
);

export default Dashboard;
