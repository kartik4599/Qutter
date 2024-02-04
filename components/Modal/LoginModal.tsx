"use client";

import Input from "@components/Input";
import useLoginModal from "@hooks/useLoginModal";
import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import useRegisterModal from "@hooks/useRegesterModal";
import { signIn } from "next-auth/react";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn("credentials", {
        email,
        password,
      });

      loginModal.onClose();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, email, password, setIsLoading]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        value={email}
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        disabled={isLoading}
        value={password}
        type={"password"}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );

  const toggleHandler = useCallback(() => {
    if (isLoading) {
      return;
    }

    loginModal.onClose();
    registerModal.onOpen();
  }, [registerModal, loginModal]);

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4 text-lg">
      <p>
        Don't have an account?{" "}
        <span
          onClick={toggleHandler}
          className="text-white cursor-pointer hover:underline"
        >
          Sign Up
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLable={"Login"}
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
