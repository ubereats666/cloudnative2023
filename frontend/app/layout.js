import { Rosario } from "next/font/google";
import "./globals.css";

const rosario = Rosario({
  weight: ["300", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Parkoasis",
  description: "Parkoasis - Where Reservation Meets Acceleration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rosario.className}>{children}</body>
    </html>
  );
}
