"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-start justify-center flex-grow gap-8">
      <h1 className="title">
        登入 <span className="logo-text">Parkoasis</span>
      </h1>

      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="密碼" />

      <div className="w-full flex-between">
        <p>記住我</p>
        <p>忘記密碼 ?</p>
      </div>

      <Button variant="primary" text="default" className="w-full">
        登入
      </Button>
    </div>
  );
};

export default LoginForm;
