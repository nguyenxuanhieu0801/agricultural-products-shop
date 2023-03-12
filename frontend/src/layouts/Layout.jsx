import { Header } from 'components/common';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="min-h-[700px]">{children}</div>
      <>
        <div className="w-full h-[100px] bg-primary mt-4">
          <footer className="flex items-center justify-center h-full">
            <p>2022 Copyright &copy; EZStore</p>
          </footer>
        </div>
      </>
    </>
  );
};

export default Layout;
