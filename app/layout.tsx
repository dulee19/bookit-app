import type { Metadata } from "next";
import AuthWraper from "@/components/AuthProvider";
import { Inter } from 'next/font/google'
import "@/assets/styles/globals.css";
import { Footer, Header } from "@/components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Bookit App | Book a Room",
  description: "Book a meeting or conference room for your team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWraper>
      <html lang="en">
        <body
          className={`${inter.className} antialiased`}
        >
          <Header />
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />

          <ToastContainer />
        </body>
      </html>
    </AuthWraper>
  );
}
