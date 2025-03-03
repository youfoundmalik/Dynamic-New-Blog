import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Header from "./header";
import ErrorPage from "./error";
import { useDataContext } from "@/context/data-context";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setError, fetchData } = useDataContext();
  return (
    <div className='internal-body antialiased w-[95%] md:w-[90%] max-w-[1300px] flex flex-col md:my-10 py-5 px-2.5 md:px-12 md:py-8 mx-auto md:rounded-lg bg-white overflow-x-hidden min-h-screen md:min-h-[calc(100vh-80px)]'>
      <Header />
      <main id='main-content' className='mt-2.5 md:mt-5 flex-grow'>
        <ErrorBoundary
          FallbackComponent={ErrorPage}
          onReset={() => {
            setError(null);
            fetchData();
          }}
        >
          {children}
        </ErrorBoundary>
      </main>
      <footer className='mt-2.5 md:mt-5 py-4 text-center'>
        <p>&copy; Innoscripta. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
