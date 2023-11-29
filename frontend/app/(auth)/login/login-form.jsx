"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-start justify-center flex-grow gap-4 xs:gap-6 sm:gap-8">
      <h1 className="title">
        登入 <span className="logo-text hidden xs:inline">Parkoasis</span>
      </h1>

      <div className="flex flex-col gap-4 w-full">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="密碼" />
      </div>

      <div className="w-full flex-between">
        <div className="flex-start gap-2">
          <Checkbox id="remember-me" />
          <Label htmlFor="remember-me">記住我</Label>
        </div>

        <Button variant="link" size="none">
          忘記密碼 ?
        </Button>
      </div>

      <Button variant="primary" className="w-full">
        登入
      </Button>

      <div className="flex-between w-full gap-2">
        <div className="login-divider bg-gradient-to-l" />
        <p className="text-t-subtitle text-12 whitespace-nowrap">或是</p>
        <div className="login-divider bg-gradient-to-r" />
      </div>

      {/* Third Party SignIn */}
      <div className="flex-between flex-col w-full gap-4 xs:flex-row xs:gap-6">
        <Button variant="white" className="w-full gap-2">
          <Image
            src="./icons/google.svg"
            className="w-4 h-4"
            width={16}
            height={16}
            alt="Google Icon"
          />
          Google
        </Button>
        <Button variant="white" className="w-full gap-2">
          <Image
            src="./icons/facebook.svg"
            className="w-4 h-4"
            width={16}
            height={16}
            alt="Facebook Icon"
          />
          Facebook
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
