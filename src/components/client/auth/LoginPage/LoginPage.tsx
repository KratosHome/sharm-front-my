"use client";

import "./loginPage.scss";
import Link from "next/link";
import { EmailSvg } from "@/components/svg/EmailSvg";
import { PadlockSvg } from "@/components/svg/PadlockSvg";
import GoogleBlock from "../GoogleBlock/GoogleBlock";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import FormInput from "../FormInput";
import { MyForm } from "@/types";
import { fail } from "assert";

const LoginForm = () => {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
    clearErrors,
  } = useForm<MyForm>({ mode: "onChange" });

  const [isFormValid, setIsFormValid] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [initialRender, setInitialRender] = useState(true); 

  const email = watch("email");
  const password = watch("password");

  const handleLinkClick = () => {
    setIsFormValid(false);    
  }; 

  useEffect(() => {
    if (!initialRender) {
      setIsFormValid(isValid);
    }
  }, [ isValid, email, password, initialRender]);

  useEffect(() => {
    setInitialRender(false); 
  }, []);

  const onSubmit: SubmitHandler<MyForm> = (data) => {   
    reset();
    setRememberMe(false);
  };

  return (
    <div className="container">
      <h2 className="title">Увійти в аккаунт</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputContainer">
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Введіть ваш email"
            register={register}
            validation={{
              required: true,
              minLength: 2,
              maxLength: 30,
              pattern:
                /^[a-zA-Z0-9._%+-]+@(?!.*\.ru)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            }}
            isValid={!errors.email && email !== ''}
            icon={<EmailSvg className="icon" />}/>
          <FormInput
            label="Пароль"
            name="password"
            type="password"
            placeholder="Введіть ваш пароль"
            register={register}
            validation={{
              required: true,
              minLength: 5,
              maxLength: 30,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{5,}$/,
            }}
            isValid={!errors.password && password !== ''}
            icon={<PadlockSvg className="icon" />}
          />
        </div>

        <div className="wrapperBtn">
          <Link className="btn_link" href={`/${locale}/forgot-password`}>
            Забули пароль?
          </Link>
          <div className="radioBtnWrapper">
            <input
              className="radioBtn"
              type="radio"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label>Запам’ятати мене</label>
          </div>
        </div>
        <div className="radioBtnWrapper mobile-only">
          <input className="radioBtn" type="radio" />
          <label>Запам’ятати мене</label>
        </div>
        <button
          className={` btnSubmit btnSubmit_mobile mobile-only ${
            isFormValid ? "btn_valid" : ""
          }`}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Увійти
        </button>
        <div className="wrapperSubmit">
          <button
            className={`btnSubmit btnSubmit_deskTop ${
              isFormValid ? "btn_valid" : ""
            }`}
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Увійти
          </button>
          <Link className="btn_link widthLink" href={`/${locale}/sing-up`} onClick={handleLinkClick}>
            Зареєструватись
          </Link>
        </div>
      </form>
      <GoogleBlock />
      <div className="mobile-only">
        <div className="wrapper_link">
          <Link className="btn_link" href={`/${locale}/forgot-password`}>
            Забули пароль?
          </Link>
          <Link className="btn_link" href={`/${locale}/sing-up`} onClick={handleLinkClick}>
            Реєстрація
          </Link>
        </div>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default LoginForm;
