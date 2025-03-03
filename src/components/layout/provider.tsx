import { DataProvider } from "@/context/data-context";
import { ChakraProvider } from "@chakra-ui/react";

import Layout from "./layout";

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ChakraProvider>
      <DataProvider>
        <Layout>{children}</Layout>
      </DataProvider>
    </ChakraProvider>
  );
};

export default Provider;
