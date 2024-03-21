import React, { FC } from "react";
import "./CreateCategory.scss";
import MyInput from "@/components/general/MyInput/MyInput";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import { Line } from "@/components/UI/Line/Line";
import { postAction } from "@/actions/postAction";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface CreateCategoryProps {
  parentId: string | null;
  setVisible: (visible: boolean) => void;
}

type FormData = {
  [key: string]: string;
};
interface Placeholder {
  ua: string;
  ru: string;
  en: string;
}

interface InputField {
  name: string;
  placeholder: Placeholder;
  languages: string[];
}

const CreateCategory: FC<CreateCategoryProps> = ({ parentId, setVisible }) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const inputFields: InputField[] = [
    {
      name: "name",
      placeholder: { ua: "назва", ru: "название", en: "name" },
      languages: ["ua", "ru", "en"],
    },
    {
      name: "descr",
      placeholder: { ua: "опис", ru: "описание", en: "description" },
      languages: ["ua", "ru", "en"],
    },
    {
      name: "mTitle",
      placeholder: { ua: "заголовок", ru: "заголовок", en: "title" },
      languages: ["ua", "ru", "en"],
    },
    {
      name: "mKey",
      placeholder: { ua: "ключ", ru: "ключ", en: "key" },
      languages: ["ua", "ru", "en"],
    },
    {
      name: "mDescr",
      placeholder: { ua: "опис", ru: "описание", en: "description" },
      languages: ["ua", "ru", "en"],
    },
  ];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const translations = [];
    for (const lang of ["ua", "ru", "en"]) {
      translations.push({
        name: data[`name_${lang}`],
        description: data[`descr_${lang}`],
        metaTitle: data[`mTitle_${lang}`],
        metaKeywords: data[`mKey_${lang}`],
        metaDescription: data[`mDescr_${lang}`],
        lang: lang,
      });
    }
    const requestData = {
      parentId: parentId,
      metaImages: "145",
      translations: translations,
    };
    postAction("categories", requestData)
      .then(() => {
        router.refresh();
        setVisible(false);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div className="container-create-category">
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputFields.map((field, index) => (
          <div key={index}>
            {field.languages.map((lang) => (
              <div key={field.name + "_" + lang}>
                <MyInput
                  {...register(`${field.name}_${lang}`, {
                    required:
                      lang === "ua"
                        ? "Поле обов'язкове до заповнення"
                        : lang === "ru"
                        ? "Поле обязательно для заполнения"
                        : "Field is required",
                  })}
                  type="text"
                  placeholder={`${(field.placeholder as any)[lang]} (${lang})`}
                />
                {errors[`${field.name}_${lang}`] && (
                  <p className="error-message">
                    {errors[`${field.name}_${lang}`]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
        <Line isAbsolute={false} />
        <MyBtn type="submit" text="submit" color="primary" />
      </form>
    </div>
  );
};
export default CreateCategory;