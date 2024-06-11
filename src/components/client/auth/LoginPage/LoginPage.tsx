"use client";

import "./loginPage.scss";
import Link from "next/link";
import { EmailSvg } from "@/components/svg/EmailSvg";
import { PadlockSvg } from "@/components/svg/PadlockSvg";
import GoogleBlock from "../GoogleBlock/GoogleBlock";
import { useForm, SubmitHandler } from "react-hook-form";

interface MyForm {
  email: string;
  password: string;
}

const LoginForm = ({ locale }: { locale: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MyForm>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<MyForm> = (data) => {
    console.log("first", data);
    reset();
  };

  return (
    <div className="container">
      <h2 className="title">Увійти в аккаунт</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputContainer">
          <div className="labelWrapper">
            <label className="label">
              Email <span className="span">*</span>
            </label>
            <div className="inputWrapper">
              <EmailSvg className="icon" />
              <input
                className={`input ${errors.email ? "error" : ""}`}
                type="email"
                placeholder="Введіть ваш email"
                {...register("email", {
                  required: true,
                  minLength: 2,
                  maxLength: 30,
                  pattern:
                    /^[a-zA-Z0-9._%+-]+@(?!.*\.ru)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
              />
            </div>
          </div>
          {errors.email?.type === "required" && <span>Введіть email</span>}
          {errors.email?.type === "minLength" && <span>Min 2 букви</span>}
          {errors.email?.type === "maxLength" && <span>Max 30 букв</span>}
          {errors.email?.type === "pattern" && (
            <span>Невірний формат email</span>
          )}
          <div className="labelWrapper">
            <label className="label">
              Пароль <span className="span">*</span>
            </label>
            <div className="inputWrapper">
              <PadlockSvg className="icon" />
              <input
                className={`input ${errors.password ? "error" : ""}`}
                type="password"
                placeholder="Введіть ваш пароль"
                autoComplete="current-password"
                {...register("password", {
                  required: true,
                  minLength: 2,
                  maxLength: 30,
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/,
                })}
              />
            </div>
            {errors.password?.type === "required" && (
              <span>Введіть password</span>
            )}
          </div>
          {errors.password?.type === "minLength" && <span>Min 2 букви</span>}
          {errors.password?.type === "maxLength" && <span>Max 30 букв</span>}
          {errors.password?.type === "pattern" && (
            <span>Невірний формат password</span>
          )}
        </div>
        <div className="wrapperBtn">
          <Link className="btn_link" href={`/${locale}/forgot-password`}>
            Забули пароль?
          </Link>
          <div className="radioBtn">
            <input type="radio" id="rememberMe" />
            <label>Запам’ятати мене</label>
          </div>
        </div>
        <div className="radioBtn mobile-only">
          <input type="radio" />
          <label>Запам’ятати мене</label>
        </div>
        <button
          className="btn_submit mobile-only"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Увійти
        </button>
        <div className="wrapperSubmit">
          <button
            className="btnSubmit"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Увійти
          </button>
          <Link className="btn_link widthLink" href={`/${locale}/sing-up`}>
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
          <Link className="btn_link" href={`/${locale}/sing-up`}>
            Реєстрація
          </Link>
        </div>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default LoginForm;
