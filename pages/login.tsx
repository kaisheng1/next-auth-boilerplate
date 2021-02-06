import { signIn } from "next-auth/client";

interface Props {}

const LoginPage: React.FC<Props> = () => {
  return (
    <div>
      <button
        onClick={() =>
          signIn("github", {
            callbackUrl: "/",
          })
        }
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
