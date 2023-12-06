import "../globals.css";
import LandingNavbar from "@/components/auth/landing-navbar";

export default function AuthLayout({ children }) {
  return (
    <>
      <LandingNavbar />
      {children}
    </>
  );
}
