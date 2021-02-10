import withAuthServerSideProps from "auth/withAuthServerSideProps";
import { signOut } from "next-auth/client";

export default function Home() {
  return (
    <div>
      Home <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}

export const getServerSideProps = withAuthServerSideProps();
