import Navbar from "./navbar";

const Layout = ({ children, header }) => {
  return (
    <section className="flex flex-col gap-12 w-full min-h-screen px-8 lg:px-28 py-12">
      <Navbar header={header} />
      {children}
    </section>
  );
};

export default Layout;
