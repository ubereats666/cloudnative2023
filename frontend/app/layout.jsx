import { Inter } from "next/font/google";
import "./globals.css";

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
        <main>{children}</main>
      </body>
    </html>
  );
}