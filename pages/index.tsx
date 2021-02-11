import withAuthServerSideProps from "auth/withAuthServerSideProps";
import Layout from "components/layouts/Layout";
import { signOut } from "next-auth/client";

export default function Home() {
  return (
    <Layout>
      Home <button onClick={() => signOut()}>Logout</button>
    </Layout>
  );
}

export const getServerSideProps = withAuthServerSideProps();
