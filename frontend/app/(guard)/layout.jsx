import "../globals.css";
import Navbar from "@/components/shared/navbar";

export default function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
