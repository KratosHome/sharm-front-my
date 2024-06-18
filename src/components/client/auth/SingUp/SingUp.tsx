"use client";

import "./SingUp.scss";
import Link from "next/link";
import FormInput from "../FormInput";
import { IRegisterFormValues, MyForm } from "@/types";
import { EmailSvg } from "@/components/svg/EmailSvg";
import { PadlockSvg } from "@/components/svg/PadlockSvg";
import { NameSvg } from "@/components/svg/NameSvg";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import GoogleBlock from "../GoogleBlock/GoogleBlock";
import { registerAction } from "@/server/auth/register.server";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const SingUp = () => {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<MyForm>({ mode: "onChange" });

  const [passwordMismatchError, setPasswordMismatchError] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  const email = watch("email");
  const password = watch("password");
  const name = watch("name");
  const passwordRepeat = watch("passwordRepeat");

  useEffect(() => {
    if (!initialRender) {
      setIsFormValid(isValid);
    }
  }, [isValid, email, password, passwordRepeat, name, initialRender]);

  useEffect(() => {
    setInitialRender(false);
  }, []);

  const onSubmit: SubmitHandler<MyForm> = async (data) => {
    setLoading(true);
    if (data.password !== data.passwordRepeat) {
      setPasswordMismatchError("Паролі не співпадають");
      setLoading(false);
      return;
    }
    const formData: IRegisterFormValues = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const result = await registerAction(formData);
    console.log("Form data submitted:", formData);
    reset();
    if (result.errorMessage) {
      setPasswordMismatchError(result.errorMessage);
      setLoading(false);
      return;
    }

    setPasswordMismatchError(null);
    setLoading(false);
    if (result?.success) {
      router.refresh();
    }
  };

  const handleLinkClick = () => {
    setIsFormValid(false);
  };

  return (
    <div className="container">
      <h2 className="title">Створити новий акаунт</h2>
      <p className="text">
        Зареєструйтеся на сайті та отримуйте повідомлення про нові надходженя
        першими!
      </p>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputContainer">
          <FormInput
            label="Ім’я"
            name="name"
            type="text"
            placeholder="Введіть ваше Ім’я"
            register={register}
            validation={{
              required: true,
              minLength: 2,
              maxLength: 30,
              pattern: /^[a-zA-Zа-яА-ЯёЁ]+(?:[-\s][a-zA-Zа-яА-ЯёЁ]+)*$/,
            }}
            isValid={!errors.name && name !== ""}
            error={errors.name}
            icon={<NameSvg className="icon" />}
          />
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
            isValid={!errors.email && email !== ""}
            error={errors.email}
            icon={<EmailSvg className="icon" />}
          />
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
            isValid={!errors.password && password !== ""}
            error={errors.password}
            icon={<PadlockSvg className="icon" />}
          />
          <FormInput
            label="Повторити пароль"
            name="passwordRepeat"
            type="password"
            placeholder="Введіть ваш пароль"
            register={register}
            validation={{
              required: true,
              minLength: 5,
              maxLength: 30,
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{5,}$/,
            }}
            isValid={!errors.passwordRepeat && passwordRepeat !== ""}
            error={errors.passwordRepeat}
            icon={<PadlockSvg className="icon" />}
          />
          {passwordMismatchError && (
            <span className="textError">{passwordMismatchError}</span>
          )}
        </div>

        <div className="btnWrapper">
          <button
            className={`btnSubmit ${isFormValid ? "btn_valid" : ""}`}
            type="submit"
          >
            Продовжити
          </button>
          <Link
            className="btn_link desktop-only"
            href={`/${locale}/login`}
            onClick={handleLinkClick}
          >
            Увійти
          </Link>
        </div>
      </form>
      <GoogleBlock />
      <div className="loginBtnWrapper mobile-only">
        <p className="mobile-only">Вже маєте акаунт? </p>
        <Link
          className="btn_link mobile-only"
          href={`/${locale}/login`}
          onClick={handleLinkClick}
        >
          Увійти
        </Link>
      </div>
      <div className="line mobile-only"></div>
    </div>
  );
};

export default SingUp;
