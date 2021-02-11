import Link from "next/link";

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/admin/dashboard">Admin Dashboard</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
