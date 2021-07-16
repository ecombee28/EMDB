import Nav from "./Nav";
import BottomNav from "./BottomNav";

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <div>
        <main>{children}</main>
      </div>
      <BottomNav />
    </div>
  );
};

export default Layout;
