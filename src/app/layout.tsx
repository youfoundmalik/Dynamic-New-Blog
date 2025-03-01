import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";

import "./globals.css";
import Header from "../components/layout/header";
import { DataProvider } from "@/context/data-context";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Innoscripta News",
  description: "Personalize your news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${openSans.variable} antialiased w-[95%] md:w-[90%] flex flex-col gap-2.5 md:gap-5 md:my-10 py-5 px-2.5 md:px-12 md:py-8 mx-auto md:rounded-lg bg-white overflow-x-hidden min-h-screen md:min-h-[calc(100vh-80px)]`}
      >
        <ChakraProvider>
          <DataProvider>
            <Header />
            <main>{children}</main>
            <footer></footer>
          </DataProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
