"use client";

import Input from "@components/Input";
import useLoginModal from "@hooks/useLoginModal";
import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import useRegisterModal from "@hooks/useRegesterModal";
import axios from "axios";
import { toast } from "react-hot-toast";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/register", {
        email,
        password,
        name,
        username,
      });

      toast.success("Account Created");
      registerModal.onClose();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, email, password, name, username]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        disabled={isLoading}
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        disabled={isLoading}
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        disabled={isLoading}
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );

  const toggleHandler = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4 text-lg">
      <p>
        Already have an account?{" "}
        <span
          onClick={toggleHandler}
          className="text-white cursor-pointer hover:underline"
        >
          Log in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Sign Up"
      actionLable={"Create account"}
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
