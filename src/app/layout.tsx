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
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body
        className={`${openSans.variable} antialiased w-[95%] md:w-[90%] flex flex-col md:my-10 py-5 px-2.5 md:px-12 md:py-8 mx-auto md:rounded-lg bg-white overflow-x-hidden min-h-screen md:min-h-[calc(100vh-80px)]`}
      >
        <ChakraProvider>
          <DataProvider>
            <Header />
            <main id='main-content' className='mt-2.5 md:mt-5 flex-grow'>
              {children}
            </main>
            <footer className='mt-2.5 md:mt-5 py-4 text-center'>
              <p>&copy; {new Date().getFullYear()} Innoscripta. All rights reserved.</p>
            </footer>
          </DataProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
