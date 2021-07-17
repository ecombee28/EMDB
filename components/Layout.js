import Nav from "./Nav";
import BottomNav from "./BottomNav";

const Layout = ({ children }) => {
  return (
    <div>
      <div>
        <Nav />
        <main>{children}</main>
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;
