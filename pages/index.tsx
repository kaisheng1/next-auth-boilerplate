import { signOut } from "next-auth/client";
import makeAuthentication from "auth/makeAuthentication";

export default function Home() {
  return (
    <div>
      Home <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}

export const getServerSideProps = makeAuthentication();
