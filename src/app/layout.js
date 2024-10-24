import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { PROJECT } from "@/constants";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: PROJECT.TITLE,
  description: PROJECT.DESCRIPTION,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lato.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
