import { signIn } from "next-auth/client";
import config from "auth/config";

interface Props {}

const LoginPage: React.FC<Props> = () => {
  return (
    <div>
      <button
        onClick={() =>
          signIn("github", {
            callbackUrl: config.routes.REDIRECT_IF_AUTHENTICATED,
          })
        }
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
