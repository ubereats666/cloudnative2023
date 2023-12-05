import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

const inter = Inter({
  weight: ["300", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Parkoasis",
  description: "Parkoasis - Where Reservation Meets Acceleration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar /> */}
        <main>{children}</main>
      </body>
    </html>
  );
}
