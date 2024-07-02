"use client";

import MyInput from "@/components/general/MyInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { MyForm } from "@/types";
import { EmailSvg } from "@/components/svg/EmailSvg";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import "./ForgotPassword.scss";
import Link from "next/link";

const ForgotPassword = () => {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();

  const [isFormValid, setIsFormValid] = useState(false);

  const handleLinkClick = () => {
      setIsFormValid(false);
    };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm<MyForm>();

  const email = watch("email");

  const onSubmit: SubmitHandler<MyForm> = (data) => {
    console.log("first", data);
    reset();
  };

  return (
    <div className="container">
      <h2 className="title">ЗАБУЛИ ПАРОЛЬ</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}></form>
      <MyInput
        label="Email"
        name="email"
        type="email"
        placeholder="Введіть ваш email"
        register={register}
        validation={{
          required: true,
          minLength: 2,
          maxLength: 30,
          pattern: /^[a-zA-Z0-9._%+-]+@(?!.*\.ru)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        }}
        isValid={!errors.email && email !== ""}
        error={errors.email}
        icon={<EmailSvg className="icon" />}
      />

      <button
        className={`btnSubmit ${isFormValid ? "btn_valid" : ""}`}
        type="submit"
      >
        Продовжити
      </button>
      <Link
            className="btn_link"
            href={`/${locale}/login`}
            onClick={handleLinkClick}
          >
            Повернутися до Sing Up
          </Link>
    </div>
  );
};

export default ForgotPassword;
