import Nav from "./Nav";
import BottomNav from "./BottomNav";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div>
        <main>{children}</main>
      </div>
      <BottomNav />
    </>
  );
};

export default Layout;
