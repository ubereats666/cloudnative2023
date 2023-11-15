import Logo from "@/components/logo";
import LoginForm from "./login-form";

const Login = () => {
  return (
    <section className="full-screen-container flex">
      {/* Left: Login Form */}
      <div className="flex flex-col w-full h-full px-28 py-12">
        <Logo />

        <LoginForm />
      </div>

      {/* Right: Cover Image & Slogan */}
      <div className="flex flex-col justify-end py-24 px-12 h-full w-[50vw] min-w-[50vw] bg-login-cover bg-cover bg-no-repeat">
        <h1 className="login-slogan-title">Click & Park</h1>
        <h2 className="login-slogan-subtitle">
          Your Time, Your Space, Your Parkoasis.
        </h2>
      </div>
    </section>
  );
};

export default Login;
