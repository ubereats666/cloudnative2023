import Logo from "@/components/shared/logo";
import LoginForm from "./login-form";

// sm: Cover image as background under the form
// md: Cover image on the right side (width 50%)
// lg: Cover image on the right side (width 60%)

const Login = () => {
  return (
    <section className="full-screen-container flex">
      {/* Left: Login Form */}
      <div className="login-form">
        <Logo />

        <LoginForm />
      </div>

      {/* Right: Cover Image & Slogan */}
      <div className="login-cover-image">
        <h1 className="login-slogan-title">Click & Park</h1>
        <h2 className="login-slogan-subtitle">
          Your Time, Your Space, Your Parkoasis.
        </h2>
      </div>
    </section>
  );
};

export default Login;
