import withAuthServerSideProps, {
  AuthPageProps,
} from "auth/withAuthServerSideProps";
import Layout from "components/layouts/Layout";
import { NextPage } from "next";
import { signOut } from "next-auth/client";

interface Props extends AuthPageProps {}

const Home: NextPage<Props> = () => {
  return (
    <Layout>
      Home <button onClick={() => signOut()}>Logout</button>
    </Layout>
  );
};

export const getServerSideProps = withAuthServerSideProps();

export default Home;
